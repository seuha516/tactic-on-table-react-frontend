import React, { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  SIGNUP_INPUT_LIST,
  SIGNUP_INITIAL_STATE,
  accountReducer,
  checkSignUpCondition,
  makeChatMe,
} from 'lib/data/accountData';
import { signup } from 'modules/users';
import { changeField as changeChatField } from 'modules/chats';

import { LoadingBox } from 'components/common/Loading';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector(({ users, loading }) => ({
    user: users.user,
    loading: loading['users/SIGNUP'],
  }));
  const [state, stateDispatch] = useReducer(accountReducer, SIGNUP_INITIAL_STATE);

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Tactic On Table - Signup';
    if (user) {
      navigate('/');
      dispatch(changeChatField({ key: 'me', value: makeChatMe(user) }));
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
    return () => {
      htmlTitle.innerHTML = 'Tactic On Table';
    };
  }, [dispatch, navigate, user]);

  const onChange = e => stateDispatch(e.target);
  const onSubmit = () => {
    if (!checkSignUpCondition(state)) return;
    const { username, password, nickname, email } = state;
    dispatch(signup({ username, password, nickname, email }));
  };

  return (
    <Wrapper>
      <Icon src={require('assets/images/home/header/tot_white_icon.png')} alt="Icon" />
      <TitleText>Tactic On Table</TitleText>
      <InputWrapper>
        {SIGNUP_INPUT_LIST.map(INPUT_ITEM => (
          <InputItemWrapper key={INPUT_ITEM.name}>
            <InputItemText>{INPUT_ITEM.text}</InputItemText>
            <input
              name={INPUT_ITEM.name}
              value={state[INPUT_ITEM.name]}
              onChange={onChange}
              type={INPUT_ITEM.type}
            />
            <InputItemWarning color={state[`${INPUT_ITEM.name}Warning`].color}>
              {state[`${INPUT_ITEM.name}Warning`].content}
            </InputItemWarning>
          </InputItemWrapper>
        ))}
      </InputWrapper>
      {loading ? (
        <LoadingButton>
          <LoadingBox r="40px" />
        </LoadingButton>
      ) : (
        <SignupButton onClick={onSubmit}>Sign Up</SignupButton>
      )}
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 70px);
  padding: 30px 0 40px 0;
  background: linear-gradient(137deg, #0e1238, #2a5160, #100c2e, #253f40);
  background-size: 400% 400%;
  animation: moving 10s ease infinite;
  @keyframes moving {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const Icon = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: -10px;
`;
const TitleText = styled.div`
  font-family: 'Righteous', cursive;
  font-size: 25px;
  color: white;
`;
const InputWrapper = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 0 15px;
  font-family: 'Nanum Gothic', sans-serif;
  input {
    outline: none;
    width: 100%;
    height: 48px;
    font-size: 20px;
    border-radius: 10px;
    padding: 0 12px;
    &::placeholder {
      font-size: 18px;
    }
  }
`;
const InputItemWrapper = styled.div`
  width: 100%;
  height: 90px;
`;
const InputItemText = styled.div`
  font-size: 20px;
  font-family: 'PT Sans', sans-serif;
  color: #ffffff;
  margin-left: 3px;
`;
const InputItemWarning = styled.div`
  font-size: 15px;
  font-family: 'PT Sans', sans-serif;
  color: #ffffff;
  text-align: end;
  margin: 2px 0 5px 0;
  margin-left: 3px;
  margin-bottom: 5px;
  color: ${props => props.color};
`;
const SignupButton = styled.div`
  margin: 36px 0 30px 0;
  width: calc(100% - 30px);
  max-width: 370px;
  height: 65px;
  border-radius: 12px;
  font-size: 30px;
  text-align: center;
  letter-spacing: 2px;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  background-color: #ffffff;
  border-right: 3px solid #989898;
  border-bottom: 3px solid #989898;
  padding-top: 18px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.25s linear;
  &:hover {
    background-color: #cbcbcb;
  }
`;
const LoadingButton = styled.div`
  margin: 36px 0 30px 0;
  width: calc(100% - 30px);
  max-width: 370px;
  height: 65px;
  border-radius: 12px;
  background-color: #ffffff;
  border-right: 3px solid #989898;
  border-bottom: 3px solid #989898;
  outline: none;
`;
