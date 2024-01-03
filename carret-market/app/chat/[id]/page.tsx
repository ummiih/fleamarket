"use client"

import React, {useCallback, useEffect, useRef, useState} from "react";
import {useParams} from "next/navigation";
import { useRouter } from 'next/navigation'
import SockJS from "sockjs-client";
import {CompatClient, Stomp} from "@stomp/stompjs";
import {useRecoilState} from "recoil";
import {chattingMessage, userInfo, message} from "@/app/recoil/atom";
import {sendRequest} from "@/hooks/funcs";
import ChatUi from "@/app/chat/components/ChatUi";


const Chat = () => {
    const roomId = useParams();
    const token = localStorage.getItem("accessToken");
    //userId
    const [user, setUser] = useRecoilState(userInfo)
    const userId = localStorage.getItem("userId")
    //채팅 메시지 저장코드
    const [chatMessages, setChatMessages] = useRecoilState(chattingMessage)
    const [getChatMessages, setGetChatMessages] = useState()
    const [oneChatMessage, setOneChatMessage] = useRecoilState(message)
    //연결 되어있는지 확인하는 state
    const [connect, setConnect] = useState(true)
    // 현재 날짜 가져오는 코드
    const before = {d: new Date}
    const json = JSON.stringify(before);
    const after = JSON.parse(json);
    const [data, setData] = useState({messageType:'MESSAGE', unreadCount:1})

    const router = useRouter()
    const client = useRef<CompatClient>();

    //textarea 크기
    const textRef = useRef();

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
                    setOneChatMessage(datas)
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

    //textarea태그 자동 높이 조절
    const handleResizeHeight = useCallback(() => {
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    }, []);


    return (
        <>
            <div className={"relative bg-white w-[790px] h-[650px]"}>

                {/* 채팅 내용*/}
                <div>
                    {(!userId || !getChatMessages || !getChatMessages.result || getChatMessages.result.length === 0) ?
                        (<div className={"text-xl font-semibold text-neutral-400 px-[320px] py-[150px]"}>채팅글이
                            없습니다.</div>) :
                        (<ChatUi firstResult={getChatMessages.result} user={user}></ChatUi>)
                    }
                </div>
                {/* 내용 입력창 - footer */}
                <form
                    onSubmit={(e: any) => {
                        e.preventDefault()
                        if (e.target.client.value.length == 0) {
                            e.preventDefault();
                            alert("전송실패 1글자 이상 입력하셈")
                        } else {
                            const data = {
                                "roomId": parseInt(roomId.id),
                                "message": e.target.client.value,
                                "createdAt": after.d,
                            }
                            // console.log(data)
                            sendHandler(JSON.stringify(data))
                        }

                    }}
                >
                        <textarea className="
                            border
                            border-black
                            border-1
                            rounded
                            p-2
                            h-36
                            w-[740px]
                            absolute
                            bottom-2
                            left-6
                            right-0
                        "
                                  ref={textRef}
                                  id="client"
                                  name="client"
                                  placeholder="메시지를 입력하세요"
                                  onInput={handleResizeHeight}

                        >

                        </textarea>
                    <button type={"submit"} className="
                    absolute
                    right-9
                    bottom-4
                    bg-neutral-200
                    text-white
                    font-bold
                    p-2
                    px-6
                    rounded-xl
                    hover:bg-neutral-300
                    transition
                    "
                    >
                        전송
                    </button>
                </form>
        </div>
</>
)
}
export default Chat
