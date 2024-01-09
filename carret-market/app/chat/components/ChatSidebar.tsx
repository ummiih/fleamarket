"use client"
import ChatProfileBox from "@/app/chat/components/ChatProfileBox";
import Image from "next/image";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {sendRequest} from "@/hooks/funcs";
import {useRecoilState} from "recoil";
import {chatHistoryResult, userInfo} from "@/app/recoil/atom";

import ArticleContent from "@/components/ArticleContent";
import Article from "@/components/Article";
import DotBadge from "@/components/DotBadge";

const ChatSidebar = () => {
    const router = useRouter()
    const [chatHistories, setChatHistories] = useRecoilState(chatHistoryResult)
    const [user, setUser] = useRecoilState(userInfo)
    //안읽은 전체 수
    const [unReadCount, setUnReadCount] = useState<number>(0);

    const unReadData = async () => {
        try {
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                headers: {
                    'Access-Token': localStorage.getItem('accessToken')
                },
                method: 'GET',
                url: '/api/v1/chat-rooms/unread',
            });
            // 성공적인 응답 처리
            setUnReadCount(response.data)

            console.log('안읽은 수', response.data);
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
    };

    const getChatData = async () => {
        try {
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                headers: {
                    'Access-Token': localStorage.getItem('accessToken')
                },
                method: 'GET',
                url: '/api/v1/chat-rooms',
            });
            setChatHistories(response.data.result)
            // 성공적인 응답 처리
            console.log('데이터:', response.data.result);
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
    };

    useEffect(() => {
        getChatData().then(r => console.log(r));
        unReadData()
    }, []);

    const profileOnClick = () => {
        router.push('/chat')
    }

    return (
        <div className="
            w-[400px]
            h-[650px]
            border
            boder-x-[1px]
            bg-white
            flex
            overflow-y-scroll
        "
        >
            <div className="
            w-[70px]
            h-[60px]
            bg-neutral-200
            p-2
            cursor-pointer
            relative
            "
                 onClick={() => profileOnClick()}
            >
                <DotBadge count={unReadCount.result} className={"right-2 top-2 w-4 h-4 text-[8px] text-center p-[2px]"}/>
                <div className="w-[50px] h-[50px] rounded-full border border-[#FE6F0F] border-2 justify-center items-center">
                    <Image width={45} height={45} src={"/profile_default.png"} className={"rounded-full"}/>
                </div>

            </div>
            <div>
                {
                    Object.keys(user).length > 0 ? (<div className="
                    border-b-[1px]
                    border-l-[1px]
                    w-[330px]
                    h-[60px]
                    p-5
                    font-semibold
                    "
                    >
                        {user.name}
                    </div>):(null)
                }

                <div>
                {(!chatHistories || !chatHistories.length === 0) ?
                    (<div></div>)
                    : <div>{
                        Object.entries(chatHistories).map(([index, chatHistory]) => (
                            <ChatProfileBox chatHistory={chatHistory}/>
                        ))}
                </div>}
                </div>
            </div>
        </div>
    )
}
export default ChatSidebar;
