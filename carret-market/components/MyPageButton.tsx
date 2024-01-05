'use client'

import { FaUser } from "react-icons/fa6";
import React, {useState} from "react";

interface MyPageButtonProps {
    onClick: () => void;
}
const MyPageButton: React.FC<MyPageButtonProps> = ({onClick}) => {
    return (
        <button
            className={`border-[2px] rounded-full border-[#FE6F0F] p-2 hover:`}
            onClick={onClick}
        >
            <FaUser size={20} className={"text-[#FE6F0F]"}/>
        </button>

    )
}
export default MyPageButton;
