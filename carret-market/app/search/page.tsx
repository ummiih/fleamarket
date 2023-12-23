"use client"

import SearchInput from "@/components/SearchInput";
import SearchContent from "@/app/search/components/SearchContent";
import {useSearchParams} from "next/navigation";
import React, {useEffect, useRef, useState} from "react";
import {sendRequest} from "@/hooks/funcs";
import getSearchData from "@/actions/getSearchData";

const Search = () => {
    const parameter = useSearchParams()
    const [data, setData] = useState({ "content": [] });
    const prevData = useRef(data)// useRef로 이전 상태 값 보존

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 액세스 토큰을 헤더에 담아 요청 보내기
                const response = await sendRequest({
                    headers: {
                        'Access-Token': localStorage.getItem('accessToken')
                    },
                    method: 'GET',
                    params: { keyword : parameter.get("keyword") },
                    url: '/api/v1/trade-posts',
                });

                if (JSON.stringify(prevData.current) !== JSON.stringify(response)){
                    setData(response.data.result)
                    prevData.current = response.data.result;
                    // 성공적인 응답 처리
                    console.log('데이터:', response.data.result);
                }
            } catch (error) {
                // 에러 처리
                console.error('에러 발생:', error);
            }
        };
        fetchData().then(r => console.log(r));

    }, [parameter]);

    return (
        <div>
            <h1>검색하기</h1>
            <SearchInput></SearchInput>
            {(!data || !data.content || data.content.length === 0) ? (<div>검색결과 없음</div>):(<SearchContent data={data}></SearchContent>)}
        </div>
    )

}
export default Search