function mediaStyle() {
  let screenWidth = document.documentElement.clientWidth;

  let fontSize = (100 * screenWidth) / 375;
  document.documentElement.style.fontSize = fontSize + 'px';

  let testEle = document.createElement('div');
  testEle.style.width = '3.75rem';
  document.body.appendChild(testEle);

  if (testEle.clientWidth === screenWidth) {
    document.body.removeChild(testEle);
  }

  // 重新计算fontSize
  else {
    fontSize = fontSize * (screenWidth / testEle.clientWidth);
    document.documentElement.style.fontSize = fontSize + 'px';
    document.body.removeChild(testEle);
  }
}

export default mediaStyle;
