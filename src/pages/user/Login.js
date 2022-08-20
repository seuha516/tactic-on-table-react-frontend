import React, { useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { loginReducer, checkLoginCondition } from 'lib/data/accountData';
import { login } from 'modules/users';
import { changeChatField } from 'modules/chats';

import { LoadingBox } from 'components/common/Loading';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector(({ users, loading }) => ({
    user: users.user,
    loading: loading['users/LOGIN'],
  }));
  const [state, stateDispatch] = useReducer(loginReducer, {
    username: '',
    password: '',
  });

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Tactic On Table - Login';
    if (user) {
      navigate('/');
      dispatch(changeChatField({ key: 'me', value: user }));
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
    if (!checkLoginCondition(state)) return;
    dispatch(login(state));
  };

  return (
    <Wrapper>
      <Icon src={require('assets/images/home/header/tot_white_icon.png')} alt="Icon" />
      <TitleText>Tactic On Table</TitleText>
      <InputWrapper onSubmit={onSubmit}>
        <input name="username" placeholder="ID" onChange={onChange} value={state.username} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={onChange}
          onKeyPress={e => {
            if (e.key === 'Enter') onSubmit();
          }}
          value={state.password}
        />
        {loading ? (
          <LoadingButton>
            <LoadingBox r="40px" />
          </LoadingButton>
        ) : (
          <LoginButton onClick={onSubmit}>Log In</LoginButton>
        )}
      </InputWrapper>
      <Signup to="/signup">Sign Up</Signup>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 70px);
  padding: 40px 0;
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
    margin-bottom: 5px;
    outline: none;
    width: 100%;
    height: 48px;
    font-size: 20px;
    border-radius: 10px;
    padding: 0 12px;
  }
`;
const LoginButton = styled.div`
  margin-top: 36px;
  width: 100%;
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
  margin-top: 36px;
  width: 100%;
  height: 65px;
  border-radius: 12px;
  background-color: #ffffff;
  border-right: 3px solid #989898;
  border-bottom: 3px solid #989898;
  outline: none;
`;
const Signup = styled(Link)`
  margin: 27px 0 15px 0;
  font-size: 27px;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  color: #a8bbff;
`;
