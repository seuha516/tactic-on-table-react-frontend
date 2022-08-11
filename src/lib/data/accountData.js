export const SIGNUP_INPUT_LIST = [
  {
    text: 'ID',
    name: 'username',
    type: 'text',
  },
  {
    text: 'Password',
    name: 'password',
    type: 'password',
  },
  {
    text: 'Password Confirm',
    name: 'passwordConfirm',
    type: 'password',
  },
  {
    text: 'Nickname',
    name: 'nickname',
    type: 'text',
  },
  {
    text: 'Email',
    name: 'email',
    type: 'text',
  },
];
export const EDIT_PROFILE_INPUT_LIST = [
  {
    text: 'Password (Required)',
    name: 'originalPassword',
    type: 'password',
  },
  {
    text: 'New Password (Optional)',
    name: 'password',
    type: 'password',
  },
  {
    text: 'New Password Confirm',
    name: 'passwordConfirm',
    type: 'password',
  },
  {
    text: 'Nickname',
    name: 'nickname',
    type: 'text',
  },
  {
    text: 'Email',
    name: 'email',
    type: 'text',
  },
];
export const USER_PAGE_STATUS = {
  PROFILE: 0,
  EDIT_PROFILE: 1,
  SIGN_OUT: 2,
};
export const SIGNUP_INITIAL_STATE = {
  username: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  email: '',
  usernameWarning: {
    content: '* 6 ~ 16자 영어 소문자, 숫자',
    color: '#adadad',
  },
  passwordWarning: {
    content: '* 8 ~ 16자 영문 + 숫자 + 기호',
    color: '#adadad',
  },
  passwordConfirmWarning: {
    content: '* 비밀번호 확인',
    color: '#adadad',
  },
  nicknameWarning: {
    content: '* 3자 이상 12자 이하',
    color: '#adadad',
  },
  emailWarning: {
    content: '* 이메일',
    color: '#adadad',
  },
};
export const getEditProfileInitialState = user => {
  return {
    image: user ? user.image : 'profile_default.png',
    originalPassword: '',
    password: '',
    passwordConfirm: '',
    nickname: user ? user.nickname : '',
    email: user ? user.email : '',
    passwordWarning: {
      content: '* 8 ~ 16자 영문 + 숫자 + 기호',
      color: '#adadad',
    },
    passwordConfirmWarning: {
      content: '* 비밀번호 확인',
      color: '#adadad',
    },
    nicknameWarning: {
      content: '* 3자 이상 12자 이하',
      color: '#97ffa4',
    },
    emailWarning: {
      content: '* 이메일',
      color: '#97ffa4',
    },
  };
};
export const accountReducer = (state, action) => {
  const actionName = action.name;
  let newValue = action.value ? action.value.replace(/ /g, '') : '';
  const newWarning = {
    content: '',
    color: '',
  };
  switch (actionName) {
    case 'username': {
      const usernamePattern = /[A-Zㄱ-ㅎㅏ-ㅣ가-힣]/g;
      if (usernamePattern.test(newValue)) {
        newWarning.content = '* 영어 소문자와 숫자만 입력할 수 있습니다.';
        newValue = newValue.replace(usernamePattern, '');
      } else {
        newWarning.content = '* 6 ~ 16자 영어 소문자, 숫자';
      }
      newValue = newValue.substring(0, 16);

      if (newValue.length >= 6 && newValue.length <= 16) {
        newWarning.color = '#97ffa4';
      } else if (newValue.length === 0) {
        newWarning.color = '#adadad';
      } else {
        newWarning.color = '#ff7171';
      }

      return {
        ...state,
        [actionName]: newValue,
        [actionName + 'Warning']: newWarning,
      };
    }
    case 'password': {
      const passwordPattern = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
      if (passwordPattern.test(newValue)) {
        newWarning.content = '* 한글을 입력할 수 없습니다.';
        newValue = newValue.replace(passwordPattern, '');
      } else {
        newWarning.content = '* 8 ~ 16자 영문 + 숫자 + 기호';
      }
      newValue = newValue.substring(0, 16);

      if (newValue.length >= 8 && newValue.length <= 16) {
        newWarning.color = '#97ffa4';
      } else if (newValue.length === 0) {
        newWarning.color = '#adadad';
      } else {
        newWarning.color = '#ff7171';
      }

      if (newValue === state.passwordConfirm && state.passwordConfirm.length > 0) {
        return {
          ...state,
          [actionName]: newValue,
          [actionName + 'Warning']: newWarning,
          passwordConfirmWarning: {
            content: '* 비밀번호가 일치합니다.',
            color: '#97ffa4',
          },
        };
      } else if (state.passwordConfirm.length > 0) {
        return {
          ...state,
          [actionName]: newValue,
          [actionName + 'Warning']: newWarning,
          passwordConfirmWarning: {
            content: '* 비밀번호가 일치하지 않습니다.',
            color: '#ff7171',
          },
        };
      } else {
        return {
          ...state,
          [actionName]: newValue,
          [actionName + 'Warning']: newWarning,
        };
      }
    }
    case 'passwordConfirm': {
      const passwordPattern = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
      newValue = newValue.replace(passwordPattern, '');
      newValue = newValue.substring(0, 16);

      if (newValue.length === 0) {
        newWarning.content = '* 비밀번호 확인';
        newWarning.color = '#adadad';
      } else if (newValue === state.password) {
        newWarning.content = '* 비밀번호가 일치합니다.';
        newWarning.color = '#97ffa4';
      } else {
        newWarning.content = '* 비밀번호가 일치하지 않습니다.';
        newWarning.color = '#ff7171';
      }
      return {
        ...state,
        [actionName]: newValue,
        [actionName + 'Warning']: newWarning,
      };
    }
    case 'nickname': {
      newWarning.content = '* 3자 이상 12자 이하';
      newValue = newValue.substring(0, 12);
      if (newValue.length >= 3 && newValue.length <= 12) {
        newWarning.color = '#97ffa4';
      } else if (newValue.length === 0) {
        newWarning.color = '#adadad';
      } else {
        newWarning.color = '#ff7171';
      }
      return {
        ...state,
        [actionName]: newValue,
        [actionName + 'Warning']: newWarning,
      };
    }
    case 'email': {
      newValue = newValue.substring(0, 50);
      const emailRegex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      if (newValue.length === 0) {
        newWarning.content = '* 이메일';
        newWarning.color = '#adadad';
      } else if (emailRegex.test(newValue)) {
        newWarning.content = '* 올바른 이메일 형식입니다.';
        newWarning.color = '#97ffa4';
      } else {
        newWarning.content = '* 올바른 이메일 형식이 아닙니다.';
        newWarning.color = '#ff7171';
      }
      return {
        ...state,
        [actionName]: newValue,
        [actionName + 'Warning']: newWarning,
      };
    }
    case 'originalPassword': {
      return { ...state, originalPassword: newValue };
    }
    case 'image': {
      return { ...state, image: action.image };
    }
    case 'init': {
      return action.state;
    }
    default:
      return state;
  }
};
export const checkLoginCondition = state => {
  if (state.username === '' || state.password === '') {
    alert('빈 칸이 있습니다.');
    return false;
  }
  return true;
};
export const checkSignUpCondition = state => {
  if (state.usernameWarning.color !== '#97ffa4') {
    alert('ID를 확인해 주세요.');
    return false;
  } else if (
    state.passwordWarning.color !== '#97ffa4' ||
    state.passwordConfirmWarning.color !== '#97ffa4'
  ) {
    alert('비밀번호를 확인해 주세요.');
    return false;
  } else if (state.nicknameWarning.color !== '#97ffa4') {
    alert('닉네임을 확인해 주세요.');
    return false;
  } else if (state.emailWarning.color !== '#97ffa4') {
    alert('이메일을 확인해 주세요.');
    return false;
  }
  return true;
};
export const checkEditProfileCondition = state => {
  const isNewPassword = !(state.password === '' && state.passwordConfirm === '');
  if (state.originalPassword === '') {
    alert('기존 비밀번호를 입력해 주세요.');
    return false;
  } else if (
    isNewPassword &&
    (state.passwordWarning.color !== '#97ffa4' || state.passwordConfirmWarning.color !== '#97ffa4')
  ) {
    alert('새 비밀번호를 확인해 주세요.');
    return false;
  } else if (state.nicknameWarning.color !== '#97ffa4') {
    alert('닉네임을 확인해 주세요.');
    return false;
  } else if (state.emailWarning.color !== '#97ffa4') {
    alert('이메일을 확인해 주세요.');
    return false;
  }
  return true;
};
export const checkSignOutCondition = state => {
  if (state.originalPassword === '') {
    alert('비밀번호를 입력해 주세요.');
    return false;
  }
  return true;
};
export const makeChatMe = user => {
  const { username, nickname, image } = user;
  return { username, nickname, image };
};
