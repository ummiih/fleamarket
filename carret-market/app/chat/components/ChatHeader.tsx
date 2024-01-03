"use client"
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {sendRequest} from "@/hooks/funcs";
import {useParams, useRouter} from "next/navigation";

const ChatHeader = () => {
    const router = useRouter()
    const roomId = useParams();
    const [posts, setPosts] = useState({})
    // post 객체가 비어있는지 여부를 나타내는 상태 추가
    const [isPostEmpty, setIsPostEmpty] = useState(true);


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
            // 비동기로 데이터를 받아온 후, roomId와 일치하는 데이터를 찾아서 업데이트
            setPosts(response.data.result)
            console.log('데이터:', response.data.result);

        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
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
            console.log('데이터:', response.data);
            router.back()
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
    }
    useEffect(() => {
        getChatData()
        return () => {
            disConnectChannel(roomId)
        }
    }, []);


    return(
        <div>
            {/* 프로필 */}
            <div className="
                    border-y
                    h-[61px]
                    p-2
                    px-4
                    flex
                    justify-between

                "
            >
                <div className="flex items-center gap-x-2">
                    <Image src={"/profile_default.png"} width={40} height={40}
                           className={"rounded-full border "}></Image>
                    {/* post가 비어있지 않을 때에만 정보 보여주도록 수정 */}
                    {(!posts || posts.length !== 0) ?(
                        <div>

                            {Object.entries(posts).map(([index, post]) => (
                                <div>
                                    {(post.roomId == parseInt(roomId.id))?(
                                    <div className={"flex items-center gap-x-1"}>
                                        <div className="">{post.chatPartner.name}</div>
                                        <div className="text-[#FE6F0F] text-[11px] px-1 border border-[#FE6F0F] rounded-full">
                                            {post.chatPartner.temperature}°C
                                        </div>
                                    </div>
                                ):(null)}
                                </div>
                            ))}
                        </div>
                        )
                        :(null)}
                </div>
                <button className="rounded-full border px-3 text-[14px] text-neutral-600 hover:shadow transition"
                        onClick={() => disConnectChannel(roomId)}>채팅방 나가기
                </button>
            </div>
            {/*거래글 요약*/}
            <div className="
                    border-b
                    p-4
                    px-4
                    flex
                    justify-between
                    hover:bg-neutral-200/60
                    transition
                    cursor-pointer
                    "
            >
                <div className="flex items-center gap-x-2">
                    <Image src={"/IMG_9021.jpg"} width={40} height={40} className={"rounded-xl"}></Image>
                    <div>
                        <div className="text-[14px]">애플 매직 키보드 12.9인치용</div>
                        <div className="text-[14px] font-bold">270,000원</div>
                    </div>
                </div>
                <button className="
                    text-[14px]
                    font-bold
                    border
                    border-1
                    px-3
                    py-0
                    rounded-full
                    border-neutral-700
                    "
                >
                    거래완료
                </button>
            </div>

        </div>
    )
}
export default ChatHeader
