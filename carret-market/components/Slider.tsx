'use client'

import {useEffect, useState} from "react";

const Slider = () => {
    const [onClick, setOnClick] = useState(0)

    useEffect(() => {

    }, [onClick]);
    console.log(onClick)
    return (
        <div className="relative border h-4 p-1">
            <div className="w-48 h-2 bg-neutral-200 rounded-full">
                <input type="range" step={20} min={0} max={40} className={"bg-black"} onChange={(e)=> {
                    console.log(e.target.value)
                }}></input>
            </div>

        </div>
    )
}
export default Slider;
