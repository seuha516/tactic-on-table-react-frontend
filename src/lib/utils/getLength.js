// 문자열의 대략적인 길이 구하기

export const getLength = (str, fontSize, fontFamily) => {
  let myId = 'strObjectForGetLengthFunction';

  let invisibleSpan = document.getElementById(myId);
  if (!invisibleSpan) invisibleSpan = document.createElement('span');
  invisibleSpan.id = myId;

  invisibleSpan.setAttribute('style', 'visibility:hidden; white-space:nowrap; position:absolute; left:-9999px; top: -9999px;');
  document.body.appendChild(invisibleSpan);
  invisibleSpan.innerText = str;
  invisibleSpan.style.fontSize = fontSize;
  invisibleSpan.style.fontFamily = fontFamily;

  const ret = invisibleSpan.offsetWidth;
  invisibleSpan.remove();

  return ret;
};
