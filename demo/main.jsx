import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import mediaStyle from './utils/mediaStyle';
import Index from './pages/index.jsx';

// 配置rem
mediaStyle();
window.addEventListener('resize', () => {
  mediaStyle();
});

ReactDOM.render(<Index />, document.getElementById('root'));
