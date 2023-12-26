"use client"

import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {sendRequest} from "@/hooks/funcs";
import {useRecoilState} from "recoil";
import {userInfo} from "./recoil/atom"

const Home = () => {
  const serchParams = useSearchParams();
  //유저 정보
  const [user, setUser] = useRecoilState(userInfo)

  const accessToken = serchParams.get("accessToken")
  const refreshToken = serchParams.get("refreshToken")

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
    getUserData()
  }, []);

  const getUserData = async () => {
    try {
      // console.log('Post' + localStorage.getItem('accessToken'));
      // 액세스 토큰을 헤더에 담아 요청 보내기
      const response = await sendRequest({
        headers: {
          'Access-Token': localStorage.getItem('accessToken')
        },
        method: 'GET',
        url: '/api/v1/users',
      });
      // 성공적인 응답 처리
      setUser(response.data.result)
      localStorage.setItem("userId",response.data.result.userId)
      console.log('데이터:', localStorage.getItem("userId"));
    } catch (error) {
      // 에러 처리
      console.error('에러 발생:', error);
    }
  };

  return (
    <div>홈페이지임</div>
  )
}
export default Home