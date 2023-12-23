"use client"

import SearchInput from "@/components/SearchInput";
import SearchContent from "@/app/search/components/SearchContent";
import {useSearchParams} from "next/navigation";
import React, {useEffect, useRef, useState} from "react";
import {sendRequest} from "@/hooks/funcs";
import getSearchData from "@/actions/getSearchData";
import {IoSearch} from "react-icons/io5";

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
        <div className={""}>
            <div className={"h-14"}/>
            <div className={"flex justify-center"}>
                <div className={"text-3xl font-bold items-center"}>검색</div>

            </div>
            <div className={"mx-80"}>
                <div className={"h-5"}/>
                <SearchInput></SearchInput>
            </div>
            <div className={"mx-64"}>

                <div className={"h-10"}/>
                <div className={"flex justify-center items-center"}>
                    {(!data || !data.content || data.content.length === 0) ? (
                        <div className={"grid items-center justify-center gap-y-2"}>
                            <IoSearch className="mt-24 text-neutral-400 ml-14" size={70}/>
                            <div className={"text-2xl font-semibold text-neutral-400"}>
                                검색결과가 없습니다.
                            </div>
                        </div>

                    ) : (
                        <SearchContent data={data}></SearchContent>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Search