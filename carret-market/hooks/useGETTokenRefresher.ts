import axios from "axios";

const useGETTokenRefresher = (globalURL) => {

    const refreshAPI = axios.create({
        baseURL: globalURL,
        headers: {
            "Content-type": "application/json",
            "Access-Token": `${localStorage.getItem('accessToken')}`}
    });

    const publicAPI = axios.create({
        baseURL: globalURL,
        headers: {
            "Refresh-Token": `${localStorage.getItem('refreshToken')}`
    }});

    async function postRefreshToken() {
        const response = await publicAPI.get('/api/v1/trade-posts');
        return response;
    }

    axios.interceptors.response.use(
        // 200번대 응답이 올때 처리
        (response) => {
            return response;
        },
        // 200번대 응답이 아닐 경우 처리
        async (error) => {
            const {
                config,
                response: { status },
            } = error;

            //토큰이 만료되을 때
            if (status === 401) {
                if (error.response.data.message === 'Unauthorized') {
                    console.log("sadlkasdhfkljdshfkjahsdjkflhasdkjfhskj")
                    const originRequest = config;
                    //리프레시 토큰 api
                    const response = await postRefreshToken();
                    //리프레시 토큰 요청이 성공할 때
                    if (response.status === 200) {
                        const newAccessToken = response.data.token;
                        localStorage.setItem('accessToken', response.headers.get("Access-Token"));
                        localStorage.setItem('refreshToken', response.headers.get("Refresh-Token"));
                        axios.defaults.headers["Access-Token"] = localStorage.getItem('accessToken');
                        //진행중이던 요청 이어서하기
                        originRequest.headers["Access-Token"] = localStorage.getItem('accessToken');
                        return axios(originRequest);
                        //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
                    } else if (response.status === 404) {
                        window.location.replace('/sign-in');
                    }
                }
            }
            return Promise.reject(error);
        },
    );
};

export default useGETTokenRefresher;
