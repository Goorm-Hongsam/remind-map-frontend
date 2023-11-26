import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';

window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
window.Kakao.isInitialized();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
