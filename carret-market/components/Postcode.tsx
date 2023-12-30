"use client"
import React, {useEffect} from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import {useState} from "react";
import {useRecoilState} from "recoil";
import {userAddress, lng, lat} from "@/app/recoil/atom";
import Script from "next/script";
import axios from "axios";
import * as querystring from "querystring";

const Postcode = () => {
    const [value, setValue] = useRecoilState(userAddress)
    const [latitude, setLatitude] = useRecoilState(lat)
    const [longitude, setLongitude] = useRecoilState(lng)

    const scriptUrl =
        'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(scriptUrl);

    const handleComplete = async (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }


        const res = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json`,
            {
                headers: {
                    Authorization: "KakaoAK "
                },
                params: {query: fullAddress}
            }
        )
        setValue(fullAddress) // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        setLatitude(res.data.documents[0].address.x)
        setLongitude(res.data.documents[0].address.y)
    };

    const handleClick = () => {
        open({onComplete: handleComplete});
    };

    //kakao 경도랑 위도 가져오기


    return (
            <button type='button' onClick={handleClick}>
                주소 찾기
            </button>
    );
};
export default Postcode;