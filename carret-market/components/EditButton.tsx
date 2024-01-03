"use client"

import React from "react";

interface EditButtonProps {
    onChange?: () => void;
    children: React.ReactNode;
}
const EditButton:React.FC<EditButtonProps> = ({onChange, children}) => {

    return (
        <div className="flex justify-center py-6 ">
            <button className="
                                    border-[1px]
                                    border-neutral-400
                                    rounded-full
                                    text-neutral-500
                                    text-[16px]
                                    p-1
                                    px-2
                                    hover:shadow-md
                                    transition
                                "
                    onClick={onChange}
            >
                {children}
            </button>
        </div>
    )
}

export default EditButton;
