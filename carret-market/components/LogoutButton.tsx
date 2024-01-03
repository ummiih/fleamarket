import {sendRequest} from "@/hooks/funcs";

const LogoutButton = () => {

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

            // 성공적인 응답 처리
            console.log('로그아웃 데이터:', response.data);

        } catch (error) {
            // 에러 처리
            console.error('에러 발생:', error);
            alert("오류")
        }
    };

    return(
        <button
            className={"rounded-full px-3 py-2 bg-white border border-[#FE6F0F] border-2 text-[#FE6F0F] font-bold hover:opacity-75 transition text-center"}
            onClick={logOut}
        >
            로그아웃
        </button>
    )
}
export default LogoutButton;
