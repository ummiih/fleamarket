"use client"

import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

const Home = () => {
  const serchParams = useSearchParams();

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