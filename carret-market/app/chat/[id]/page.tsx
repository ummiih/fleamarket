"use client"
import React, {useEffect, useRef, useState} from "react";
import getChattingData from "@/actions/getChattingData";
import {useParams} from "next/navigation";
import { useRouter } from 'next/navigation'
import SockJS from "sockjs-client";
import {Client, CompatClient, Stomp} from "@stomp/stompjs";
import {useRecoilState} from "recoil";
import {chattingMessage, userInfo} from "@/app/recoil/atom";
import {sendRequest} from "@/hooks/funcs";
import Article from "@/components/Article";
import ChatUi from "@/app/chat/components/ChatUi";
import {Noticia_Text} from "next/dist/compiled/@next/font/dist/google";

const Chat = () => {
    const roomId = useParams();
    const token = localStorage.getItem("accessToken");
    //userId
    const [user, setUser] = useRecoilState(userInfo)
    const userId = localStorage.getItem("userId")
    //채팅 메시지 저장코드
    const [chatMessages, setChatMessages] = useRecoilState(chattingMessage)
    const [getChatMessages, setGetChatMessages] = useState({})
    //연결 되어있는지 확인하는 state
    const [connect, setConnect] = useState(true)
    // 현재 날짜 가져오는 코드
    const before = {d: new Date}
    const json = JSON.stringify(before);
    const after = JSON.parse(json);
    const [data, setData] = useState({messageType:'MESSAGE', unreadCount:1})

    const router = useRouter()
    const client = useRef<CompatClient>();

    const listener = (event) => {
        event.preventDefault();
        event.returnValue = "";
    };


    //소켓 통신
    const connectHaner = (roomId) => {
        //TODO: 한번만 클릭되게
        client.current = Stomp.over(() => {
            const sock = new SockJS("http://112.186.245.109:8080/ws-market")
            return sock;
        });
        client.current.connect(
            { token : token, 'roomId' : roomId.id },
            () => {
                // callback 함수 설정, 대부분 여기에 sub 함수 씀
                client.current.subscribe("/sub/chat/room/" + `${roomId.id}`, message => { //구독하는 채널
                    const datas = JSON.parse(message.body);
                    setChatMessages((chatMessages) => [...chatMessages, datas]);
                    console.log(datas)
                    setData(datas)
                })
            }
        );

        //에러 감지
        client.onStompError = function (frame) {
            console.log(`Broker reported error:`, frame.headers.message);
            console.log(`Additional details:${frame.body}`);
        };
    }


    console.log(roomId.id)

    //채팅 데이터 전체 가져오기
    const fetchData = async () => {
        try {
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                headers: {
                    'Access-Token': localStorage.getItem('accessToken')
                },
                method: 'GET',
                url: '/api/v1/chat-rooms/'+roomId.id,
            });
            // 성공적인 응답 처리
            setGetChatMessages(response.data)
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
    };

    //채팅방 기록 가져오기
    useEffect(() => {
        connectHaner(roomId)
        fetchData().then((r) => console.log(r));
        console.log('chatMessage:',chatMessages)
        console.log('getChatMessage:',getChatMessages)
        return () => {
            disConnectChannel(roomId)
        }

    }, [user]);

    useEffect(() => {
        fetchData().then((r)=> console.log(r))
        setChatMessages([]);
        console.log("Notice로 바뀐 getChatMessages",getChatMessages)
    }, [data.messageType === "NOTICE", data.unreadCount]);


    //전송 코드
    const sendHandler = (data) => {
        client.current.send(
            "/pub/chat/message",
            { token : token },
            data
        );
    };

    const disConnectChannel = async (roomId) => {
        try {
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                headers: {
                    'Access-Token': localStorage.getItem('accessToken')
                },
                method: 'PATCH',
                url: '/api/v1/chat-rooms/'+roomId.id,
            });
            // 성공적인 응답 처리
            // console.log('채팅 데이터:', response.data);
            setGetChatMessages(response.data)
            router.back()
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
    }

    return (
        <>
            <div>
                    <div>
                        {(!userId || !getChatMessages || !getChatMessages.result || getChatMessages.result.length === 0) ?
                            (<div className={"text-xl font-semibold text-neutral-400"}>채팅글이 없습니다.</div>) :
                            (<ChatUi firstResult={getChatMessages.result} user={user}></ChatUi>)
                        }

                    </div>
                    <form
                        onSubmit={(e: any) => {
                            e.preventDefault()

                            const data = {
                                "roomId": parseInt(roomId.id),
                                "message": e.target.client.value,
                                "createdAt": after.d,
                            }
                            // console.log(data)
                            sendHandler(JSON.stringify(data))
                        }}
                    >
                        <input
                            placeholder="메시지를 입력하세요"
                            id="client"
                            name="client"
                        >

                        </input>
                        <button type={"submit"}>전송</button>
                    </form>
                    <button className="rounded-full border p-2" onClick={()=>disConnectChannel(roomId)}>채팅방 나가기</button>
                </div>
        </>
    )
}
export default Chat