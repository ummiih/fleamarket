// Fleamarket.js
"use client"
import React, { useEffect, useState } from "react";
import Article from "@/components/Article";
import Header from "@/components/Header";
import WriteButton from "@/components/WriteButton";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import {sendRequest} from "@/hooks/funcs";

const Fleamarket = () => {
    const [posts, setPosts] = useState<object>({ "result": { "content": [] } });
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();


    useEffect(() => {
        const fetchData = async () => {
            try {
                // 액세스 토큰을 헤더에 담아 요청 보내기
                const response = await sendRequest({
                    method: 'GET',
                    url: '/api/v1/trade-posts',
                });
                setPosts(response.data)

                // 성공적인 응답 처리
                console.log('데이터:', response.data);
            } catch (error) {
                // 에러 처리
                console.error('에러 발생:', error);
            }
        };
        fetchData().then(r => console.log(r));
    }, []);

    return (
        <div className={"relative"}>
            {open ? <Modal isShowing={open}></Modal> : <div></div>}
            <Header></Header>
            <div className={"h-14"} />
            {/*아이템 list*/}
            <div className={"flex justify-center"}>
                <div className={"text-[32px] font-semibold"}>중고거래 인기매물</div>
            </div>
            <div className={"h-10"} />
            <div className={"flex justify-center "}>
                <div className={"grid grid-cols-3 gap-12"}>
                    {Object.entries(posts.result.content).map(([index, post]) => (
                        <React.Fragment key={index}>
                            <Article {...post}></Article>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            {/*글쓰기*/}
            <div className={"relative"}>
                <div className={"fixed bottom-0 right-0 m-10 hover:scale-110 transition"}>
                    <WriteButton isShowing={open} onChange={() => setOpen(!open)} />
                </div>
            </div>
        </div>
    );
};

export default Fleamarket;
