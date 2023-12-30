"use client"
import {sendRequest} from "@/hooks/funcs";
import {useEffect, useState} from "react";
import { IoChatbubblesSharp } from "react-icons/io5";

const Chat = () => {

    return(
        <div className="
        bg-white
        h-[650px]
        w-[790px]
        px-[300px]
        py-[300px]
        "
        >
            <IoChatbubblesSharp size={80} className={"text-neutral-300"}/>
            <div className={"text-sm text-neutral-600 "}>채팅할 대상을 선택해주세요</div>
        </div>
    )
}
export default Chat;