'use client'
import {twMerge} from "tailwind-merge";
import {className} from "postcss-selector-parser";

interface DotBageProps {
    count: number;
    className?: string
}

const DotBadge: React.FC<DotBageProps> = ({count, className}) => {
    if (count == 0){
        return
    }
    return (
        <div className={twMerge(`
        absolute right-5 h-5 w-5 text-center p-[2px] bg-[#FE6F0F] rounded-full text-[11px] text-white font-semibold
        `, className)}>
            {count}
        </div>
    )
}
export default DotBadge;
