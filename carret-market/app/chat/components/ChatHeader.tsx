"use client"
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {sendRequest} from "@/hooks/funcs";
import {useParams, useRouter} from "next/navigation";
import {createBrowserHistory} from "@remix-run/router";

const ChatHeader = () => {
    const router = useRouter()
    const roomId = useParams();
    const [posts, setPosts] = useState({})
    // post 객체가 비어있는지 여부를 나타내는 상태 추가
    const [isPostEmpty, setIsPostEmpty] = useState(true);
    // 뒤로가기 버튼을 눌렀는지 앞으로 가기 버튼을 눌렀는지 확인하는 상태
    const history = createBrowserHistory();


    // 로그인된 유저가 채팅한 채팅방을 전부 불러옵니다.
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

    //채팅방을 나갈 때 사용하는 코드입니다.
    const disConnectChannel = async (roomId) => {
        try {
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                headers: {
                    'Access-Token': localStorage.getItem('accessToken')
                },
                method: 'PATCH',
                url: '/api/v1/chat-rooms/' + roomId.id,
            });
            // 성공적인 응답 처리
            console.log('연결 끊겼는데 성공한 데이터:', response.data);
            router.back()
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
    }

    const disconnectChat = () => {
        // 2. custom hook에서 실행될 함수를 생성하고, 함수명을 preventGoBack으로 설정한다.
        history.push(history.location.href, null);
        // 2-1. 현재 상태를 세션 히스토리 스택에 추가(push)한다.
        disConnectChannel(roomId.id).then(r => console.log('r',r))
        // 2-2. 토스트 메세지를 출력한다.
    };

    // 브라우저에 렌더링 시 한 번만 실행하는 코드
    useEffect(() => {
        (() => {
            history.push(history.location.href, null);
            // 3. 렌더링 완료 시 현재 상태를 세션 히스토리 스택에 추가(push)한다.
            window.addEventListener('popstate', disconnectChat);
            // 3-1. addEventListener를 이용해 "popstate"라는 이벤트를 감지하게 한다.
            // 3-2. popstate 이벤트를 감지했을 때 preventGoBack 함수가 실행된다.
        })();

        return () => {
            window.removeEventListener('popstate', disconnectChat);
            // 3-3. 렌더링이 끝난 이후엔 eventListner을 제거한다.
        };
    }, []);

    useEffect(() => {
        history.push(history.location.href, null);
        // 4-1. 현재 상태를 세션 히스토리 스택에 추가(push)한다.
    }, [history.location]);



    useEffect(() => {
        getChatData()
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
