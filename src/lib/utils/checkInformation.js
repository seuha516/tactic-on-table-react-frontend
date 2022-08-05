const testUsername = /^[0-9a-zA-Z]+$/;
const testPassword = /^[0-9a-zA-Z!@#$%^&*()_+|<>?:{}]+$/;

export const checkUsername = (form) => {
  const validText = testUsername.test(form.username);
  const validLength = form.username.length >= 6 && form.username.length <= 12;
  let buttonStatus, warnColor, warnMessage;
  if (form.username.length === 0) {
    buttonStatus = 'disable';
    warnColor = 'none';
    warnMessage = 'none';
  } else if (!validText) {
    buttonStatus = 'disable';
    warnColor = 'red';
    warnMessage = '* 영문과 숫자만 사용해야 합니다.';
  } else if (!validLength) {
    buttonStatus = 'disable';
    warnColor = 'red';
    warnMessage = '* 6~12 글자여야 합니다.';
  } else if (!form.validUsername) {
    buttonStatus = 'able';
    warnColor = 'orange';
    warnMessage = 'ID 중복 체크가 필요합니다.';
  } else {
    buttonStatus = 'valid';
    warnColor = 'green';
    warnMessage = 'OK';
  }
  return {
    buttonStatus,
    warnColor,
    warnMessage,
  };
};
export const checkPassword = (form) => {
  const validText = testPassword.test(form.password);
  const validLength = form.password.length >= 8 && form.password.length <= 20;
  let warnColor, warnMessage;
  if (form.password.length === 0) {
    warnColor = 'none';
    warnMessage = 'none';
  } else if (!validText) {
    warnColor = 'red';
    warnMessage = '* 영문, 숫자, 기호만 사용해야 합니다.';
  } else if (!validLength) {
    warnColor = 'red';
    warnMessage = '* 8~20 글자여야 합니다.';
  } else {
    warnColor = 'green';
    warnMessage = 'OK';
  }
  return {
    warnColor,
    warnMessage,
  };
};
export const checkPasswordConfirm = (form) => {
  const validConfirm = form.password === form.passwordConfirm;
  let warnColor, warnMessage;
  if (form.passwordConfirm.length === 0) {
    warnColor = 'none';
    warnMessage = 'none';
  } else if (!validConfirm) {
    warnColor = 'red';
    warnMessage = '* 비밀번호가 일치하지 않습니다.';
  } else {
    warnColor = 'green';
    warnMessage = 'OK';
  }
  return {
    warnColor,
    warnMessage,
  };
};
export const canRegister = (form) => {
  const validText_username = testUsername.test(form.username);
  const validLength_username =
    form.username.length >= 6 && form.username.length <= 12;
  const validUsername_username = form.validUsername;
  const validText_password = testPassword.test(form.password);
  const validLength_password =
    form.password.length >= 8 && form.password.length <= 20;
  const validConfirm = form.password === form.passwordConfirm;
  return (
    validText_username &&
    validLength_username &&
    validUsername_username &&
    validText_password &&
    validLength_password &&
    validConfirm
  );
};
