"use client"
import {twMerge} from "tailwind-merge";
import {useRouter} from "next/navigation";
interface NavigationItemProps {
    label: string;
    href: string;
    active: boolean;
}
const NavigationItem:React.FC<NavigationItemProps> = ({label, href, active}) => {
    const router = useRouter();
    const onClick = () => {
        router.push(href)
    }

    return (
        <div className="">
            <div
                className={twMerge(`text-lg font-semibold text-[#4D5159] hover:text-[#868B94] transition cursor-pointer`, active && "text-[#FE6F0F]")}
                onClick={onClick}>
                {label}
            </div>
        </div>
    )
}
export default NavigationItem;