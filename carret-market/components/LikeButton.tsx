
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io"; // TODO: 까맣게 하트 칠하기
import {sendRequest} from "@/hooks/funcs";
import {useParams} from "next/navigation";
import {useEffect} from "react";

interface LikeButtonProps {
    param : string
}
const LikeButton:React.FC<LikeButtonProps> = ({param}) => {

    const fetchData = async () => {
        try {
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                method: 'POST',
                url: '/api/v1/like-posts/'+param,
            });

            // 성공적인 응답 처리
            console.log('데이터:', response.data);
            alert("성공")

        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
            alert("오류")
        }
    };

    return (
        <div>
            <form onSubmit={(e)=> {
                e.preventDefault()
                fetchData()
            }
            }>
                <div className={"cursor-pointer hover:opacity-40 transition"}>
                    <IoIosHeartEmpty size={30} className={"text-[#FE6F0F]"}/>
                </div>
            </form>
        </div>
        )


}
export default LikeButton
