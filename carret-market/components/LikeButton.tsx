
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io"; // TODO: 까맣게 하트 칠하기
import {sendRequest} from "@/hooks/funcs";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";

interface LikeButtonProps {
    param: string;
    author: number;
}
const LikeButton:React.FC<LikeButtonProps> = ({param, author}) => {
    //하트가 눌렸는지 판단하는 state //TODO: 백엔드에서 GET을 줘야할 것 같은데, 아니면 저거 다 해야함.
    const [isClick, setIsClick] = useState<number>(0)
    //로그인한 유저 고유 아이디
    const userId = localStorage.getItem("userId")

    console.log(typeof userId)
    const isMyArticle = () => {
        if (author == parseInt(userId)) {
            alert("자신의 글에 좋아요를 누를 수 없습니다.")
        }
        else {
            fetchData()
        }
    }

    // 하트 눌르면 POST되도록 하는 함수
    const fetchData = async () => {
        try {
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                headers: {
                    'Access-Token': localStorage.getItem('accessToken')
                },
                method: 'POST',
                url: '/api/v1/like-posts/' + param,
            });
            setIsClick(response.data.result)
            // 성공적인 응답 처리
            console.log('데이터:', response.data);
        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
            alert("오류")
        }
    };

    // 하트가 눌리면 재렌더링 되도록 함.
    useEffect(() => {

    }, [isClick]);

    return (
        <div>
            <button
                onClick={isMyArticle}
                className={"cursor-pointer hover:opacity-40 transition"}>
                {
                    isClick === 0
                        ? <IoIosHeartEmpty size={30} className={"text-[#FE6F0F]"}/>
                        : <IoIosHeart size={30} className={"text-[#FE6F0F]"} />
                }
            </button>
        </div>
        )


}
export default LikeButton
