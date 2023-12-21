"use client"

import React, {useEffect, useState} from "react";

import axios, {AxiosInstance} from "axios";

import Article from "@/components/Article";
import Header from "@/components/Header";
import WriteButton from "@/components/WriteButton";
import Modal from "@/components/Modal";
import {useRouter} from "next/navigation";


const Fleamarket = () => {
    const [posts, setPosts] = useState<object>({"result":{"content":[]}});
    const [open, setOpen] = useState<boolean>(false)
    const globalURL = "http://112.186.245.109:8080/api/v1/trade-posts"
    const router = useRouter()

    useEffect(() => {
        const refreshAPI = axios.create({
            baseURL: globalURL,
            headers: {"Content-type": "application/json"},
        });
        const interceptor = axios.interceptors.response.use(
            function (response) {
                return response;
            },
            async function (error) {
                const originalConfig = error.config;
                const msg = error.response.data.message;
                const status = error.response.status;

                if (status == 401) {
                    if (msg == "access token expired") {
                        await axios({
                            url: globalURL,
                            method: "GET",
                            headers: {
                                'access-token': localStorage.getItem("accessToken"),
                                'refresh-token': localStorage.getItem("refreshToken")
                            },
                        })
                            .then((res) => {
                                localStorage.setItem("accessToken", res.headers.get("Access-Token"));
                                originalConfig.headers["Authorization"] = localStorage.getItem("accessToken")
                                return refreshAPI(originalConfig);
                            })
                            .then((res) => {
                                window.location.reload()
                            });
                    } else if (msg == "refresh token expired") {
                        localStorage.clear();
                        router.push("/sign-up")
                        window.alert("토큰이 만료되어 자동으로 로그아웃 되었습니다.")
                    }
                } else if (status == 400 || status == 404 || status == 409) {
                    window.alert(msg);
                }
                return Promise.reject(error)
            }
        );
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    return (
        <div className={"relative"}>
            {
                open ? (<Modal isShowing={open}></Modal>) : (<div></div>)
            }
            <Header></Header>
            <div className={"h-14"}/>
            {/*아이템 list*/}
            <div className={"flex justify-center"}>
                <div className={"text-[32px] font-semibold"}>중고거래 인기매물</div>
            </div>
            <div className={"h-10"}/>
            <div className={"flex justify-center "}>
                <div className={"grid grid-cols-3 gap-12"}>
                    {/*{console.log(posts.result.content)}*/}

                    {
                        Object
                            .entries(posts.result.content)
                            .map(([index, post]) => (<React.Fragment key={index}><Article {...post}></Article></React.Fragment>))
                    }
                </div>
            </div>
            {/*글쓰기*/}
            <div className={"relative"}>
                <div className={"fixed bottom-0 right-0 m-10 hover:scale-110 transition"}>
                    <WriteButton isShowing={open} onChange={() => setOpen(!open)}/>
                </div>
            </div>

        </div>

    )
}
export default Fleamarket