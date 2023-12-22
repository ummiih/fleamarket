"use client"
import {useEffect} from "react";
import {sendRequest} from "@/hooks/funcs";

const getSearchData = (params) => {
    let data;
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 액세스 토큰을 헤더에 담아 요청 보내기
                const response = await sendRequest({
                    method: 'GET',
                    params: { keyword : params },
                    url: '/api/v1/trade-posts',
                });
                data = response.data
                // 성공적인 응답 처리
                console.log('데이터:', response.data);
            } catch (error) {
                // 에러 처리
                console.error('에러 발생:', error);
            }
        };
        fetchData().then(r => console.log(r));
    }, [params]);

    return data
}
export default getSearchData;