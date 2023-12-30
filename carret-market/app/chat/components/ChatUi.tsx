"use client"

import React, {useEffect,useRef} from "react";
import Receive from "@/app/chat/components/Receive";
import Send from "@/app/chat/components/Send";
import {useRecoilState} from "recoil";
import {chattingMessage, userInfo} from "@/app/recoil/atom";
import ChatHeader from "@/app/chat/components/ChatHeader";
interface ChatUiProps {
    firstResult : [];
    user: any;
}
const ChatUi:React.FC<ChatUiProps> = ({firstResult, user}) => {
    const [chatMessages, setChatMessages] = useRecoilState(chattingMessage)
    const userId = localStorage.getItem("userId")
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    return(
        <div >
            {/* 헤더*/}
            <ChatHeader ></ChatHeader>
            <div className={"h-[350px] overflow-y-scroll"}>
                <div className={"grid"}>
                    {
                        Object.entries(firstResult).map(([index, chat]) => (
                            <React.Fragment key={index}>
                                {chat.senderId == userId ? (
                                        <div>
                                            <Send chatHistory={firstResult} chat={chat} index={index}/>
                                        </div>
                                    ) :
                                    (<div>
                                        <Receive chat={chat}/>
                                    </div>)}
                            </React.Fragment>
                        ))

                    }
                </div>
                {
                    Object.entries(chatMessages).map(([index, chat]) => (
                        <React.Fragment key={index}>
                            {chat.senderId == userId ? (
                                <Send chatHistory={chatMessages} chat={chat} index={index}/>) : (
                                <Receive chat={chat}/>)}
                        </React.Fragment>
                    ))
                }
                <div ref={messageEndRef}></div>
            </div>
        </div>
    )
}
export default ChatUi;