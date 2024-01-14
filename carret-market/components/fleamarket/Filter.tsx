import FilterButton from "@/components/fleamarket/FilterButton";
import {useMemo, useState} from "react";
import {useRecoilState} from "recoil";
import {isTradingState} from "@/app/recoil/atom";

const Filter = () => {
    const [isTrading, setIsTrading] = useRecoilState<boolean>(isTradingState);

    const state = useMemo(
        () => [
            {
                label: "거래중",
                state: isTrading
            },
            {
                label: "거래완료",
                state: !isTrading
            }
        ], [isTrading]
    )
    return (
        <div className="flex gap-x-2">
            {state.map((value)=>{
                return(
                    <FilterButton
                        state={value.state}
                        className={"p-2 text-white bg-neutral-600 rounded-full px-4"}
                    >
                        {value.label}
                    </FilterButton>
                )
            })}
        </div>
    )
}
export default Filter;
