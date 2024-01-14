// Fleamarket.js
"use client"
import React, { useEffect, useState } from "react";
import Article from "@/components/Article";
import Header from "@/components/Header";
import WriteButton from "@/components/WriteButton";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import {sendRequest} from "@/hooks/funcs";
import {useRecoilState} from "recoil";
import {allFleaMarketData, isTradingState, modalState} from "@/app/recoil/atom";
import ArticleContent from "@/components/ArticleContent";
import SearchContent from "@/app/search/components/SearchContent";
import ChattingButton from "@/components/ChattingButton";
import Filter from "@/components/fleamarket/Filter";

const Fleamarket = () => {
    const [posts, setPosts] = useState( { "content": [] })
    const [open, setOpen] = useRecoilState(modalState)
    const [isTrading, setIsTrading] = useState<boolean>(true)

    const determineIsTrading = () => {
        if (isTrading){
            isTradingFetchData().then(r=> console.log('is',r));
        } else {
            isNotTradingFetchData().then(r=> console.log('is not',r));
        }
    }
    const isTradingFetchData = async () => {
        try {
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                headers: {
                    'Access-Token': localStorage.getItem('accessToken')
                },
                method: 'GET',
                params: isTrading && { isTrading : true },
                url: '/api/v1/trade-posts',
            });
            setPosts(response.data.result)
            // 성공적인 응답 처리
            console.log('거래중인 데이터:', response.data);
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
    };

    const isNotTradingFetchData = async () => {
        try {
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                headers: {
                    'Access-Token': localStorage.getItem('accessToken')
                },
                method: 'GET',
                url: '/api/v1/trade-posts',
            });
            setPosts(response.data.result)
            // 성공적인 응답 처리
            console.log('상과없는 데이터', response.data);
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
    };

    useEffect(() => {
        determineIsTrading();
    }, [isTrading]);

    return (
        <div className={""}>
            <Header></Header>
            <div className={"h-14"}/>
            {/*아이템 list*/}
            <div className={"flex flex-col justify-center items-center gap-y-[10px]"}>
                <div className={"text-[32px] font-semibold"}>중고거래 인기매물</div>
                <div onClick={()=>setIsTrading(!isTrading)}>버튼</div>
            </div>
            <div className={"h-10"}/>
            <div className={"flex justify-center"}>
                {(!posts || !posts.content || posts.content.length === 0) ?
                    (<div className={"text-xl font-semibold text-neutral-400"}>게시글이 없습니다.</div>)
                    : (
                    <ArticleContent posts={posts}></ArticleContent>)}

            </div>
            {/*글쓰기*/}
            <div className={"relative"}>
                <div className={"grid fixed bottom-0 right-0 m-10 gap-y-3"}>
                    <WriteButton isShowing={open} onChange={() => setOpen(!open)}/>
                </div>
            </div>
        </div>
    );
};

export default Fleamarket;
