"use client"
import Image from 'next/image'
import Header from "@/components/Header";
import {useSearchParams} from "next/navigation";
import {useRecoilState} from "recoil";
import {kakaoAccessToken, kakaoRefreshToken} from "@/app/recoil/atom";
import {useEffect} from "react";

const Home = () => {
  const serchParams = useSearchParams();
  const [accessTokenRecoil, setAccessTokenRecoil] = useRecoilState(kakaoAccessToken)
  const [refreshTokenRecoil, setRefreshTokenRecoil] = useRecoilState(kakaoRefreshToken)

  const accessToken = serchParams.get("accessToken")
  const refreshToken = serchParams.get("refreshToken")

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
  }, []);

  return (
    <div>홈페이지임</div>
  )
}
export default Home