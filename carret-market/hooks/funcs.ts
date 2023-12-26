import axios from "axios";

const api = axios.create({
    baseURL: `http://112.186.245.109:8080/`
});

// 토큰 관리를 위한 함수
const setAuthHeader = (token) => {
    if (token) {
        api.defaults.headers['access-token'] = `${token}`;
        localStorage.removeItem("accessToken")
    } else {
        delete api.defaults.headers['access-token'];
    }
};

// 액세스 토큰 및 리프레시 토큰을 저장하고 가져오는 함수
const saveTokensToLocalStorage = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    console.log("새로운 리프토큰",localStorage.getItem("refreshToken"))
};

const getTokensFromLocalStorage = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
};

// API 요청을 보내는 함수
const sendRequest = async (config) => {
    try {
        console.log('In send Request' + localStorage.getItem('accessToken'))
        return await api(config);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // 만료된 액세스 토큰일 경우 리프레시 토큰으로 갱신
            const { refreshToken } = getTokensFromLocalStorage();
            if (refreshToken) {
                try {
                    const response = await api.post(
                        config.url,
                        {}, // 여기에 요청 바디 데이터를 넣어줘야 함
                        {
                            headers: {
                                'Refresh-Token': refreshToken
                            }
                        }
                    );
                    const newAccessToken = response.headers.get("access-token")
                    const newRefreshToken = response.headers.get("refresh-token")


                    localStorage.removeItem("refreshToken")
                    localStorage.removeItem("accessToken")
                    // 갱신된 액세스 토큰을 헤더에 설정
                    setAuthHeader(newAccessToken);

                    // 갱신된 토큰을 로컬 스토리지에 저장
                    saveTokensToLocalStorage(newAccessToken, newRefreshToken);



                    // 이전 요청 재시도
                    return await api({
                        headers: {
                            'Access-Token': newAccessToken
                        },
                        method: config.method,
                        data: config.data,
                        url: config.url
                    });
                } catch (refreshError) {
                    // 리프레시 토큰으로의 갱신에 실패하면 로그인 페이지로 리다이렉트 또는 다른 처리 수행
                    console.error('토큰 갱신에 실패했습니다..', refreshError);
                    console.log(localStorage.getItem("accessToken"))
                    console.log(localStorage.getItem("refreshToken"))
                    // 예: 로그인 페이지로 리다이렉트
                }
            }
        }

        // 401 에러가 아니거나 리프레시 토큰이 없는 경우 또는 갱신에 실패한 경우
        throw error;
    }
};

export { setAuthHeader, saveTokensToLocalStorage, getTokensFromLocalStorage, sendRequest };