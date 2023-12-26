"use client"
import React, {useEffect, useState} from "react";
import getChattingData from "@/actions/getChattingData";
import {useParams} from "next/navigation";
import SockJS from "sockjs-client";
import {Client, Stomp} from "@stomp/stompjs";
import {useRecoilState} from "recoil";
import {chattingMessage, userInfo} from "@/app/recoil/atom";
import {sendRequest} from "@/hooks/funcs";
import Article from "@/components/Article";
import ChatUi from "@/app/chat/components/ChatUi";

const Chat = () => {
    const roomId = useParams();
    const token = localStorage.getItem("accessToken");
    //userId
    const [user, setUser] = useRecoilState(userInfo)
    const userId = localStorage.getItem("userId")
    //채팅 메시지 저장코드
    const [chatMessages, setChatMessages] = useRecoilState(chattingMessage)
    const [getChatMessages, setGetChatMessages] = useState({})
    // 현재 날짜 가져오는 코드
    const before = {d: new Date}
    const json = JSON.stringify(before);
    const after = JSON.parse(json);
    //소켓 통신
    const sock = new SockJS("http://112.186.245.109:8080/ws-market");
    const client = Stomp.over(sock)

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
            // console.log('채팅 데이터:', response.data);
            setGetChatMessages(response.data)
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
    };

    //렌더링될 때 연결
    useEffect(() => {
        // 채팅방 구독 및 연결
        client.connect({ token : token, 'roomId' : roomId.id }, function (frame) {
            console.log('WebSocket 연결이 열렸습니다.', frame)
            client.subscribe("/sub/chat/room/" + `${roomId.id}`, message => { //구독하는 채널
                const datas = JSON.parse(message.body);
                setChatMessages((chatMessages) => [...chatMessages, datas]);
            });
        })

        //에러 감지
        client.onStompError = function (frame) {
            console.log(`Broker reported error:`, frame.headers.message);
            console.log(`Additional details:${frame.body}`);
        };

        //언마운트 될 때, 연결 제거 -> 중복 제거
        return () => {
            // Clean-up function to unsubscribe and disconnect when component unmounts
            if (client && client.connected) {
                client.disconnect();
            }
        };


    }, [client]); // chatMessages의 내용이 바뀔 떄 마다 재렌더링 되도록해서 화면 그려줌

    //채팅방 기록 가져오기
    useEffect(() => {
        fetchData().then((r) => console.log(r));
        console.log('chatMessage:',chatMessages)
        console.log('getChatMessage:',getChatMessages)
    }, [user]);

    //전송 코드
    const publishChannel = (data) => {
        //ToDo: 거르자 널
        client.publish({
            destination: "/pub/chat/message",
            body: data,
            headers: { token : token },
        });
    }

    return (
        <div>
            {/*채팅 UI*/}
            <div>
                {(!userId || !getChatMessages || !getChatMessages.result || getChatMessages.result.length === 0) ?
                    (<div className={"text-xl font-semibold text-neutral-400"}>채팅글이 없습니다.</div>):
                    (<ChatUi firstResult={getChatMessages.result} user={user}></ChatUi>)
                    }

            </div>
            <form
                onSubmit={(e: any)=>{
                    e.preventDefault()

                    const data = {
                        "roomId": parseInt(roomId.id),
                        "message": e.target.client.value,
                        "createdAt": after.d,
                    }
                    // console.log(data)
                    publishChannel(JSON.stringify(data))
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
        </div>
    )
}
export default Chat