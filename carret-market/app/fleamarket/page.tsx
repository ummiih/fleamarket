"use client"

import {useEffect, useState} from "react";

import axios from "axios";

import Article from "@/components/Article";
import Header from "@/components/Header";



const Fleamarket = () => {
    const [posts, setPosts] = useState<object[]>([]);

    const getPost = async () => {
        const res = await axios.get("/api/post");
        setPosts(res.data);
    }

    useEffect(()=>{
        getPost();
    },[])

    return (
        <div>
            <Header></Header>
            <div className={"h-14"}/>
            <div className={"flex justify-center"}>
                <div className={"text-[32px] font-semibold "}>중고거래 인기매물</div>
                <div className={"h-30"}/>


            </div>
            <div className={"flex justify-center "}>
            <div className={"grid grid-cols-3 gap-x-12"}>
                {
                    posts.map((post: object) => (<Article {...post}></Article>))
                }
            </div>
            </div>
        </div>

    )
}
export default Fleamarket