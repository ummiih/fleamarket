import React, {Dispatch, SetStateAction} from "react";
import {twMerge} from "tailwind-merge";
import {useRecoilState} from "recoil";
import {isTradingState} from "@/app/recoil/atom";

interface Props {
    state: boolean
    children: React.ReactNode;
    className: string;
}
const FilterButton = (props:Props) => {
    const {state, children, className} = props
    const [isTrading, setIsTrading] = useRecoilState<boolean>(isTradingState);

    return (
        <button
            onClick={()=> {
                setIsTrading(!isTrading)
            }}
            className={ twMerge(
            "p-2 border border-neutral-200 rounded-full px-4", state && className
        )
        }>
            {children}
        </button>
    )
}
export default FilterButton;
