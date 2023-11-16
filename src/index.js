import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { worker } from './mooks/worker';
import { RecoilRoot } from 'recoil';

if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass', // 미처리된 요청에 대한 경고를 무시하고 진행합니다.
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RecoilRoot>,
);
