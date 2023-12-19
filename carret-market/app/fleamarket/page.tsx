"use client"

import React, {useEffect, useState} from "react";

import axios from "axios";

import Article from "@/components/Article";
import Header from "@/components/Header";
import {readAllFleamarket} from "@/app/api/fleamarket";
import WriteButton from "@/components/WriteButton";
import Modal from "@/components/Modal";


const Fleamarket = () => {
    const [posts, setPosts] = useState<object>({"result":{"content":[]}});
    const [open, setOpen] = useState<boolean>(false)
    const getFleamarketData = async () => {
        const res = await axios.get("http://112.186.245.109:8080/api/v1/trade-posts")
        setPosts(res.data)
    }

    useEffect(()=>{
        getFleamarketData();
    },[])

    useEffect(() => {
        // console.log(posts)
    },[])

    return (
        <div className={"relative"}>
            {
                open ? (<Modal isShowing={open}></Modal>) : (<div></div>)
            }
            <Header></Header>
            <div className={"h-14"}/>
            {/*아이템 list*/}
            <div className={"flex justify-center"}>
                <div className={"text-[32px] font-semibold"}>중고거래 인기매물</div>
            </div>
            <div className={"h-10"}/>
            <div className={"flex justify-center "}>
                <div className={"grid grid-cols-3 gap-12"}>
                    {/*{console.log(posts.result.content)}*/}

                    {
                        Object
                            .entries(posts.result.content)
                            .map(([index, post]) => (<Article {...post}></Article>))
                    }
                </div>
            </div>
            {/*글쓰기*/}
            <div className={"relative"}>
                <div className={"fixed bottom-0 right-0 m-10 hover:scale-110 transition"}>
                    <WriteButton isShowing={open} onChange={() => setOpen(!open)}/>
                </div>
            </div>

        </div>

    )
}
export default Fleamarket