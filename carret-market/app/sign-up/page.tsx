"use client"
import axios from "axios";
import {URLSearchParams} from "node:url";
import {useParams, useSearchParams} from "next/navigation";
import { useLocation } from "react-router-dom"
import {useRecoilState} from "recoil";
import {kakaoAccessToken , kakaoRefreshToken} from "@/app/recoil/atom";
import {useEffect} from "react";


const SignUp = () => {
    const serchParams = useSearchParams();

    const accessToken = serchParams.get("accessToken")
    const refreshToken = serchParams.get("refreshToken")

    useEffect(() => {
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)
    }, []);

    return(
        <div>
            <form
                onSubmit={(e)=>{
                    e.preventDefault()
                    axios.post("")
                }}
            >
                <input placeholder={"도 ex)경기도"} id={"province"}></input>
                <input placeholder={"시 ex)이천시"} id={"city"}></input>
                <input placeholder={"도로 ex)애련정로"} id={"district"}></input>
                <input placeholder={"경도"} id={"lat"}></input>
                <input placeholder={"위도"} id={"lng"}></input>
            </form>
        </div>
    )
}
export default SignUp