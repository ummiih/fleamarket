import {sendRequest} from "@/hooks/funcs";
import {useRouter} from "next/navigation";

const ProfileModal = () => {
    const router = useRouter();
    const logOut = async () => {
        try {
            // 액세스 토큰을 헤더에 담아 요청 보내기
            const response = await sendRequest({
                headers: {
                    'Access-Token': localStorage.getItem('accessToken')
                },
                method: 'DELETE',
                url: '/api/v1/user/logout',
            });
            localStorage.removeItem("userId")

            // 성공적인 응답 처리
            console.log('로그아웃 데이터:', response.data);

        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
            localStorage.removeItem("userId")
            alert("오류")
        }
    };

    const moveProfileModal = () => {
        router.push('/mypage')
    }

    return (
        <div className="absolute flex flex-col right-10 w-[10%] rounded-xl bg-white shadow-md text-center px-4 py-2 gap-y-2">
            <button
                className="text-neutral-500 border-b-[1px] p-2"
                onClick={logOut}
            >
                로그아웃
            </button>
            <button
                className="text-neutral-500 p-1"
                onClick={moveProfileModal}
            >
                프로필
            </button>
        </div>
    )
}
export default ProfileModal;
