"use client"

import {useRouter} from "next/navigation";
import {chatRoomId} from "@/app/recoil/atom";
import {chattingMessage} from "@/app/recoil/atom";
import { IoChatbubble } from "react-icons/io5";
import {sendRequest} from "@/hooks/funcs";
import {useState} from "react";
import {useRecoilState} from "recoil";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

interface ChattingButtonProps {
    parameter: any;
}

const ChattingButton:React.FC<ChattingButtonProps> = ({parameter}) => {
    const router = useRouter()
    const token = localStorage.getItem("accessToken");
    const [roomId, setRoomId] = useRecoilState(chatRoomId);


    const fetchData = async () => {
        try {
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                headers: {
                    'Access-Token': localStorage.getItem('accessToken')
                },
                method: 'POST',
                url: '/api/v1/chat-rooms/' + parameter.id,
            });
            router.push("/chat/" + response.data.result)
            // 성공적인 응답 처리
            console.log('roomId type:', typeof `${response.data.result}`);
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
    };

    const onClick = () => {
        fetchData()
    }

    return(
        <button className={"bg-[#FE6F0F] p-5 rounded-full hover:scale-110 transition"} onClick={onClick}>
            <IoChatbubble size={30} className={"text-white"}/>
        </button>
    )
}

export default ChattingButton;