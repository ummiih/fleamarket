"use client"

import React, {useState} from "react";
import ChatSidebar from "@/app/chat/components/ChatSidebar";
import ChatHeader from "@/app/chat/components/ChatHeader";


export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <>
            <div className="bg-neutral-100 w-full h-full bg-white">
                <div className="
                mx-10
                flex
                "
                >
                    {/* 사이드 바 */}
                    <ChatSidebar>
                    </ChatSidebar>
                    {/* 메인페이지 */}
                    <div>
                    {children}
                    </div>
                </div>
            </div>
        </>
    );
}