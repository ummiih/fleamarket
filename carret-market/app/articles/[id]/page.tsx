"use client"
import axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from 'next/navigation';
import Image from "next/image";
import {Separator} from "@/components/ui/separator";

interface ArticleDetailProps {
    id?: number;
    title?: string;
    userName?: string;
    userAddress?: string;
    userTemperature?: number;
    ImageUrl?: string;
    content?: string;
    price?: number;
    createdAt?: string;
    interest?: number;
    views?: number;
    category?: string;
}
const ArticleDetail:React.FC<ArticleDetailProps> = ({id, title, userName,userTemperature,userAddress,ImageUrl,
    content,price,createdAt,interest,views,category


                                                    }) => {
    const [posts, setPosts] = useState<Object[]>([]);
    const params = useParams();
    console.log(params.id)
    const getPost = async() => {
        const res = await axios.get("/api/post?id=" + params.id)
        setPosts(res.data)
    }

    useEffect(()=>{
        getPost();
    })

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