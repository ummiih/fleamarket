"use client"
import axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from 'next/navigation';
import Image from "next/image";
import {Separator} from "@/components/ui/separator";

const ArticleDetail = () => {
    const [posts, setPosts] = useState<Object[]>([]);
    const params = useParams();
    console.log(params.id)

    /*
    GET "http://192.168.1.2/api/v1/trade-posts"
    POST "http://192.168.1.2/api/v1/trade-posts"
    GET "http://192.168.1.2/api/v1/trade-posts/1"
    */

    const getPost = async() => {
        const res = await axios.get("http://192.168.1.2:8080/api/v1/trade-posts/" + params.id)
        setPosts(res.data)
        console.log(res.data)
    }

    useEffect(()=>{
        getPost();

    },[])

    return (
        <div>
            <div className={"h-[30px]"}/>
            <div className={"flex justify-center"}>
                <div className={"relative w-[700px] h-[500px] rounded-lg"}>
                    <Image src={posts.ImageUrl} fill className={"object-cover"}></Image>
                </div>
            </div>
            <Separator/>
            <div className={"px-72"}>
                <div>{posts.userName}</div>
                <div>{posts.userAddress}</div>
                <div>{posts.category}</div>

                <div>{posts.title}</div>
                <div>{posts.content}</div>
                <div>관심 {posts.interest}</div>
                <div>조회수 {posts.views}</div>
            </div>
            <Separator/>
        </div>
    )
}
export default ArticleDetail;