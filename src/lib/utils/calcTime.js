export const calcTime = x => {
  let delta = new Date() - new Date(x);
  delta = parseInt((delta + 999) / 1000);

  if (delta < 60) {
    return `${delta}초 전`;
  } else if (delta < 60 * 60) {
    return `${parseInt(delta / 60)}분 전`;
  } else if (delta < 60 * 60 * 24) {
    return `${parseInt(delta / (60 * 60))}시간 전`;
  } else {
    return `${parseInt(delta / (60 * 60 * 24))}일 전`;
  }
};
