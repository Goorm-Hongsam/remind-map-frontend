import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
});

let isRetrying = false;

instance.interceptors.request.use(
  config => {
    const JWTtoken = localStorage.getItem('Authorization');
    if (JWTtoken) {
      config.headers.Authorization = `Bearer ${JWTtoken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !isRetrying) {
      isRetrying = true;

      return getNewToken()
        .then(newToken => {
          isRetrying = false;

          instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return instance(originalRequest);
        })
        .catch(refreshError => {
          isRetrying = false;
          localStorage.removeItem('Authorization');
          console.log('리프레시 토큰 갱신 오류:', refreshError);

          return Promise.reject(refreshError);
        });
    }
    return Promise.reject(error);
  },
);

function getNewToken() {
  return instance
    .post('/login-check/refresh-token', { withCredentials: true })
    .then(response => {
      if (response.status === 200) {
        localStorage.setItem('Authorization', response.headers.authorization);
        return response.data;
      } else {
        console.log('엑세스 토큰 갱신에 실패했습니다.');
        return Promise.reject('엑세스 토큰 갱신 실패');
      }
    })
    .catch(error => {
      alert('로그인을 다시 해주세요.');
      return Promise.reject(error);
    });
}
