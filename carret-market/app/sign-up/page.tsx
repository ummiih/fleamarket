"use client"
import axios from "axios";
import {useSearchParams} from "next/navigation";

import {useEffect} from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import Postcode from "@/components/Postcode";
import {sendRequest} from "@/hooks/funcs";
import {useRecoilState} from "recoil";
import {lat, lng, userAddress} from "@/app/recoil/atom";
import AddressMap from "@/components/AddressMap";



const SignUp = () => {
    const serchParams = useSearchParams();
    const [address, setAddress] = useRecoilState(userAddress)
    const [latitude, setLatitude] = useRecoilState(lat)
    const [longitude, setLongitude] = useRecoilState(lng)

    const accessToken = serchParams.get("accessToken")
    const refreshToken = serchParams.get("refreshToken")

    useEffect(() => {
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)
        console.log("처음 발급받은 액세스토큰",localStorage.getItem("accessToken"))
        console.log("처음 발급받은 리프레시토큰",localStorage.getItem("refreshToken"))
    }, []);

    useEffect(() => {
        console.log(address)
        console.log(latitude)
        console.log(longitude)
    }, [address,latitude,longitude]);

    const postData = async (json3) => {
        try {
            // console.log('Post' + localStorage.getItem('accessToken'));
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                headers: {
                    'Access-Token': localStorage.getItem('accessToken')
                },
                method: 'POST',
                data: json3,
                url: '/api/v1/users',
            });
            // 성공적인 응답 처리
            console.log('데이터:', response.data);
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
        }
    };
    // console.log(address.split(" "))

    return(
        <div>
            <Postcode></Postcode>
            <form
                onSubmit={(e)=>{
                    e.preventDefault()
                    const formData = new FormData();

                    const json1 = {
                        province: address.split(" ")[0],
                        city: address.split(" ")[1],
                        district: address.split(" ")[2],
                    }
                    console.log(JSON.stringify(json1))
                    const json2 = {
                        lat: Number(latitude),
                        lng: Number(longitude)
                    }
                    console.log(JSON.stringify(json2))
                    const json3 = {
                        address: json1,
                        coordinate: json2
                    }
                    console.log(JSON.stringify(json3))
                    // formData.append("address", new Blob([JSON.stringify(json1)], {
                    //     type: "application/json"
                    // }))

                    // formData.append("coordinate", new Blob([JSON.stringify(json2)], {
                    //     type: "application/json"
                    // }))

                    postData(JSON.stringify(json3))
                }}
            >
                <button type={"submit"}>전송</button>
            </form>
        </div>
    )
}
export default SignUp