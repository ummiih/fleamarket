'use client'

import React, {useEffect, useState} from "react";
import {sendRequest} from "@/hooks/funcs";
import ArticleContent from "@/components/ArticleContent";
import {userInfo} from "@/types/global";
import {userInfoInitialData} from "@/utils/initialData";
import Image from "next/image";
import {useRouter} from "next/navigation";

const MyPage = () => {
    // 사용자 정보
    const [userInfo, setUserInfo] = useState<userInfo>({
        userId:0, name:'', address:'', temperture:0 });
    // 좋아요 누른 거래글
    const [interestArticles, setInterestArticles] = useState();
    // 프로필 수정 라우터
    const router = useRouter();

    const editProfile = () => {
        router.push("/sign-up")
    }


    useEffect(() => {
        //회원 정보 가져오기
        const getUserInfo = async () => {
            try {
                // 액세스 토큰을 헤더에 담아 요청 보내기
                const response = await sendRequest({
                    headers: {
                        'Access-Token': localStorage.getItem('accessToken')
                    },
                    method: 'GET',
                    url: '/api/v1/users',
                });
                setUserInfo(response.data.result)
                // 성공적인 응답 처리
                console.log('데이터:', response.data.result);
            } catch (error) {
                // 에러 처리
                console.error('에러 발생:', error);
            }
        };
        getUserInfo().then(r => console.log(r));


        //관심 거래글 가져오기
        const getInterestArticles = async () => {
            try {
                // 액세스 토큰을 헤더에 담아 요청 보내기
                const response = await sendRequest({
                    headers: {
                        'Access-Token': localStorage.getItem('accessToken')
                    },
                    method: 'GET',
                    url: '/api/v1/like-posts',
                });
                setInterestArticles(response.data.result)
                // 성공적인 응답 처리
                console.log('데이터:', response.data.result);
            } catch (error) {
                // 에러 처리
                console.error('에러 발생:', error);
            }
        };
        getInterestArticles().then(r => console.log(r));
    }, []);

    return (
        <div className="mt-8 flex justify-center items-center flex-col gap-y-16">
            {/* 프로필 */}
            <div className="flex flex-col gap-y-6">
                <div className="text-2xl font-bold text-center w-full">프로필</div>
                <div className="flex flex-col justify-center items-center gap-y-2">
                    <Image src={"/profile_default.png"} width={80} height={80} className="rounded-full"></Image>
                    <div>{userInfo.name}</div>
                    <div>{userInfo.address}</div>
                    <div>{userInfo.temperature}</div>
                </div>
                <button
                    className="p-2 border rounded-full hover:shadow-md transition"
                    onClick={ editProfile }
                >수정하기</button>
            </div>

            {/*관심 거래글*/}
            <div className="flex flex-col gap-y-6">
                <div className="text-2xl font-bold text-center">관심 거래글</div>
                <div className={"flex justify-center"}>
                    {(!interestArticles || !interestArticles.content || interestArticles.content.length === 0) ?
                        (<div className={"text-xl font-semibold text-neutral-400"}>게시글이 없습니다.</div>)
                        : (
                            <ArticleContent posts={interestArticles}></ArticleContent>)}
                </div>
            </div>
        </div>
    )
}
export default MyPage;
