"use client"
import Image from "next/image";
import { useParams } from 'next/navigation';
import React, {useEffect, useState} from "react";
import {useRecoilState} from "recoil";


import {modalState, oneFleaMarketData} from "@/app/recoil/atom";
import {sendRequest} from "@/hooks/funcs";

import {Separator} from "@/components/ui/separator";

import LikeButton from "@/components/LikeButton";
import ChattingButton from "@/components/ChattingButton";
import EditButton from "@/components/EditButton";
import Modal from "@/components/Modal";
import EditModal from "@/components/EditModal";

const ArticleDetail = () => {
    const params = useParams();
    const [post, setPost] = useRecoilState(oneFleaMarketData)
    let [count, setCount] = useState(0)
    //모달창 열렸는지 확인하는 state
    const [open, setOpen] = useState(false);
    const userName = localStorage.getItem("userName")

    console.log("유저 이름",userName)
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

    const DeleteData = async () => {
        try {
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                headers: {
                    'Access-Token': localStorage.getItem('accessToken')
                },
                method: 'DELETE',
                url: '/api/v1/trade-posts/'+params.id,
            });
            setPost(response.data)
            // 성공적인 응답 처리
            console.log('삭제할 데이터:', post);
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


    // post가 아직 업데이트되지 않았다면 로딩 상태 또는 데이터 존재 여부 확인
    if (!post || !post.result || Object.keys(post.result).length === 0) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className={"relative"}>
            {open ? ( <EditModal isShowing={open} parameter={params.id} />) : <div></div>}
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

            <div className={"px-72"}>
                {/* 프로필 코드 */}
                <div className="py-6 flex justify-between items-center border-b">
                    <div className="flex gap-x-2 items-center">
                        <div>
                            <Image
                                src={"/profile_default.png"}
                                width={40}
                                height={40}
                                className="rounded-full"></Image>
                        </div>
                        <div>
                            <div className="font-semibold">{post.result.seller.name}</div>
                            <div className="text-[12px] text-neutral-700">{post.result.seller.address}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        {/* 사용자 온도 나타내는 컴포넌트 => TODO: 컴포넌트 쓰일 일 있으면 컴포넌트로 빼기 */}
                        <div className="grid gap-y-1 float-right">
                            <div className="font-semibold text-[#DE5D07]">{post.result.seller.temperature} °C</div>
                            <div className="w-24 h-1 bg-neutral-200 rounded-full">
                                <div className="w-12 h-1 bg-[#DE5D07] rounded-full"></div>
                            </div>
                        </div>
                        <LikeButton param={params.id} author={post.result.seller.userId}></LikeButton>
                    </div>
                </div>
                {/* 본문 */}
                <div className="py-6 flex flex-col gap-y-2 border-b">
                    <div className={"flex flex-col gap-y-1"}>
                        <div className="text-xl font-semibold">{post.result.title}</div>
                        <div className="text-[12px] text-neutral-400 flex">
                            <span>가구/인테리어 ∙ <span> 1일전</span></span>
                        </div>
                    </div>

                    <div className="font-bold">{post.result.price}원</div>

                    <div className="my-4 text-xl font-light">{post.result.content}</div>

                    <div className="text-[13px] text-neutral-400 flex">
                        <span>관심 {post.result.likeCount} ∙<span> 조회수 {post.result.views}</span>
                        </span>
                    </div>
                </div>
                {
                    userName == post.result.seller.name
                        ? <div className={"flex justify-center gap-x-2"}>
                            <EditButton onChange={() => setOpen(!open)}>
                                수정
                            </EditButton>
                            <EditButton onChange={DeleteData}>
                                삭제
                            </EditButton>
                          </div>
                        : (null)
                }
            </div>
            <ChattingButton parameter={params}></ChattingButton>
        </div>
    )
}
export default ArticleDetail;
