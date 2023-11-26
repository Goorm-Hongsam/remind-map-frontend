import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import { worker } from './mooks/worker';

if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass', // 미처리된 요청에 대한 경고를 무시하고 진행합니다.
  });
}
window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
window.Kakao.isInitialized();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
