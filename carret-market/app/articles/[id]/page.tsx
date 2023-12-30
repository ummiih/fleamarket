"use client"
import Image from "next/image";
import { useParams } from 'next/navigation';
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";


import {oneFleaMarketData} from "@/app/recoil/atom";
import {sendRequest} from "@/hooks/funcs";

import {Separator} from "@/components/ui/separator";

import LikeButton from "@/components/LikeButton";
import ChattingButton from "@/components/ChattingButton";

const ArticleDetail = () => {
    const params = useParams();
    const [post, setPost] = useRecoilState(oneFleaMarketData)
    let [count, setCount] = useState(0)

    console.log(typeof params.id)
    const fetchData = async () => {
        try {
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                headers: {
                    'Access-Token': localStorage.getItem('accessToken')
                },
                method: 'GET',
                url: '/api/v1/trade-posts/'+params.id,
            });
            setPost(response.data)
            // 성공적인 응답 처리
            console.log('데이터:', post);
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
    };

    const onClickPlusCarousal = () => {
        if (count < post.result.imageUrls.length-1){
            setCount(count +1)
        }
    }
    const onClickSubCarousal = () => {
        if (count >0){
            setCount(count -1)
        }
    }

    useEffect(() => {
        fetchData().then((r) => console.log(r));

    }, [params.id, setPost]);

    // useEffect(() => {
    //     // console.log(count)
    // }, [count]);

    // post가 아직 업데이트되지 않았다면 로딩 상태 또는 데이터 존재 여부 확인
    if (!post || !post.result || Object.keys(post.result).length === 0) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <div className={"h-[30px]"}/>
            <div className={"flex justify-center"}>
                <div className={"w-[700px] h-[500px] border object-cover overflow-hidden"}>
                    <div className={"flex transition -translate-x-["+ count +"00%] "}>
                    {
                        Object.entries(post.result.imageUrls).map(([index, img]) => {
                                return (
                                        <Image src={`${img}`} width={500} height={384} className={""}
                                               alt={index}></Image>
                                )
                            }
                        )
                    }
                    </div>
                </div>
                <button onClick={onClickPlusCarousal}>+</button>
                <button onClick={onClickSubCarousal}>-</button>
            </div>
            <Separator/>

            <div className={"px-72"}>
                <LikeButton param={params.id} ></LikeButton>
                <div>이름 : {post.result.seller.name}</div>
                <div>주소 : {post.result.seller.address}</div>
                <div>온도: {post.result.seller.temperature}</div>

                <div>제목: {post.result.title}</div>
                <div>내용: {post.result.content}</div>
                <div>가격: {post.result.price} </div>
                <div>관심: {post.result.likeCount}</div>
                <div>조회수: {post.result.views}</div>
            </div>
            <ChattingButton parameter={params}></ChattingButton>
        </div>
    )
}
export default ArticleDetail;