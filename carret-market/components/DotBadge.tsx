'use client'

import {sendRequest} from "@/hooks/funcs";
import {useEffect, useState} from "react";

const DotBadge = () => {
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

    useEffect(() => {
        unReadData()
    }, []);

    return (
        <div className="
        fixed z-10 absolute right-1 border border-neutral-200 border-1 bg-[#FE6F0F] p-[2px] rounded-full text-[8px] text-white font-semibold">
            {unReadCount.result}
        </div>
    )
}
export default DotBadge;
