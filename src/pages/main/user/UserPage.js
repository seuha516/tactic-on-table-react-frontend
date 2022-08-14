import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';

import { GAME_LIST } from 'lib/data/gameData';
import {
  EDIT_PROFILE_INPUT_LIST,
  USER_PAGE_STATUS,
  getEditProfileInitialState,
  accountReducer,
  checkEditProfileCondition,
  checkSignOutCondition,
} from 'lib/data/accountData';
import { changeUserField, readUser, updateUser, removeUser, logout } from 'modules/users';
import { changeChatField } from 'modules/chats';

import NotFound from 'components/common/NotFound';
import Error from 'components/common/Error';
import { Loading, LoadingBox } from 'components/common/Loading';
import { SmallMatchRecordTitle, EditProfileTitle, SignOutTitle } from 'components/common/Title';
import MatchRecordItem from 'components/user/MatchRecordItem';
import PageControl from 'components/common/PageControl';

const UserPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, userData, userError, updateValue, removeValue, editLoading, signOutLoading } =
    useSelector(({ users, loading }) => ({
      user: users.user,
      userData: users.read.data,
      userError: users.read.error,
      updateValue: users.update,
      removeValue: users.remove,
      editLoading: loading['users/UPDATE'],
      signOutLoading: loading['users/REMOVE'],
    }));
  const { username } = useParams();
  const [recordPage, setRecordPage] = useState(1);
  const [userPage, setUserPage] = useState(USER_PAGE_STATUS.PROFILE);
  const [state, stateDispatch] = useReducer(accountReducer, getEditProfileInitialState(user));

  useEffect(() => {
    window.scrollTo(0, 0);
    setRecordPage(1);
    stateDispatch({
      name: 'init',
      state: getEditProfileInitialState({ ...user, email: userData ? userData.email : '' }),
    });
    if ((!user || user.username !== username) && userPage !== USER_PAGE_STATUS.PROFILE) {
      setUserPage(USER_PAGE_STATUS.PROFILE);
    }
  }, [user, username, userPage, userData]);
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = `Tactic On Table - ${username}`;
    dispatch(readUser(username));
    return () => {
      htmlTitle.innerHTML = 'Tactic On Table';
      dispatch(changeUserField({ key: 'read', value: { data: null, error: null } }));
      dispatch(changeUserField({ key: 'update', value: false }));
      dispatch(changeUserField({ key: 'remove', value: false }));
    };
  }, [dispatch, username]);
  useEffect(() => {
    if (updateValue) {
      dispatch(readUser(username));
      dispatch(changeChatField({ key: 'me', value: user }));
      setUserPage(USER_PAGE_STATUS.PROFILE);
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
      dispatch(changeUserField({ key: 'update', value: false }));
    }
    if (removeValue) {
      navigate('/');
      dispatch(logout());
      dispatch(changeUserField({ key: 'remove', value: false }));
    }
  }, [dispatch, navigate, updateValue, removeValue, user, username]);

  const onChange = e => stateDispatch(e.target);
  const onChangeProfileImage = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const result = await axios.post(process.env.REACT_APP_API_IMAGE, formData, {
        withCredentials: true,
      });
      stateDispatch({ name: 'image', image: result.data.id });
    } catch (error) {
      alert('이미지 업로드 오류');
    }
  };
  const onEditProfile = () => {
    if (!checkEditProfileCondition(state)) return;
    const { originalPassword, password, email, nickname, image } = state;
    dispatch(updateUser({ username, originalPassword, password, email, nickname, image }));
  };
  const onSignOut = () => {
    if (window.confirm('정말 회원탈퇴 하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      if (!checkSignOutCondition(state)) return;
      dispatch(removeUser({ username, originalPassword: state.originalPassword }));
    }
  };

  if (userError) {
    if (userError.response.status === 404) return <NotFound />;
    else return <Error />;
  } else if (!userData) {
    return <Loading />;
  } else {
    if (userPage === USER_PAGE_STATUS.PROFILE) {
      return (
        <Wrapper>
          <ContentWrapper>
            <UserWrapper>
              <UserInfoImage
                src={process.env.REACT_APP_API_IMAGE + userData.image}
                alt="profileImage"
              />
              <UserInfoNickname>{userData.nickname}</UserInfoNickname>
              <UserInfoEmail>{userData.email}</UserInfoEmail>
              <UserTotalScore>
                <UserTotalScoreText>Total Wins</UserTotalScoreText>
                <UserTotalScoreValue>{userData.totalScore}</UserTotalScoreValue>
              </UserTotalScore>
              <UserScoreWrapper>
                {userData.score.slice(0, 4).map((x, idx) => (
                  <UserScoreItem key={idx}>
                    <CategoryGameIcon src={GAME_LIST[idx].icon} key={GAME_LIST[idx].name} />
                    <UserScore>{x}</UserScore>
                  </UserScoreItem>
                ))}
              </UserScoreWrapper>
            </UserWrapper>
            {user && user.username === username && (
              <EditButton onClick={() => setUserPage(USER_PAGE_STATUS.EDIT_PROFILE)}>
                Edit Profile
              </EditButton>
            )}
            <SmallMatchRecordTitle />
            <MatchRecordWrapper>
              {userData.userRecord
                .slice(recordPage * 10 - 10, Math.min(recordPage * 10, userData.userRecord.length))
                .map(recordItem => (
                  <MatchRecordItem key={recordItem.num} record={recordItem} />
                ))}
              {userData.userRecord.length === 0 && <NoDataText>No Data</NoDataText>}
            </MatchRecordWrapper>
            <PageControl
              nowPage={recordPage}
              objCount={userData.userRecord.length}
              pageSize={10}
              url={null}
              setPage={setRecordPage}
            />
          </ContentWrapper>
        </Wrapper>
      );
    } else if (userPage === USER_PAGE_STATUS.EDIT_PROFILE) {
      if (!user || user.username !== username) return <Loading />;
      return (
        <Wrapper>
          <ContentWrapper>
            <BackText onClick={() => setUserPage(USER_PAGE_STATUS.PROFILE)}>
              <BiArrowBack />
              Back
            </BackText>
            <EditProfileTitle />
            <ProfileImage
              src={process.env.REACT_APP_API_IMAGE + state.image}
              alt="profile"
              onClick={() => {
                document.getElementById('FileInput_EditProfile')?.click();
              }}
            />
            <FileInput type="file" id="FileInput_EditProfile" onChange={onChangeProfileImage} />
            <InputWrapper>
              {EDIT_PROFILE_INPUT_LIST.map((INPUT_ITEM, idx) => (
                <InputItemWrapper key={INPUT_ITEM.name}>
                  <InputItemText>{INPUT_ITEM.text}</InputItemText>
                  <input
                    name={INPUT_ITEM.name}
                    value={state[INPUT_ITEM.name]}
                    onChange={onChange}
                    type={INPUT_ITEM.type}
                  />
                  {idx > 0 && (
                    <InputItemWarning color={state[`${INPUT_ITEM.name}Warning`].color}>
                      {state[`${INPUT_ITEM.name}Warning`].content}
                    </InputItemWarning>
                  )}
                </InputItemWrapper>
              ))}
            </InputWrapper>
            {editLoading ? (
              <LoadingButton>
                <LoadingBox r="40px" />
              </LoadingButton>
            ) : (
              <ConfirmButton onClick={onEditProfile}>OK!</ConfirmButton>
            )}
            <SignOut onClick={() => setUserPage(USER_PAGE_STATUS.SIGN_OUT)}>Sign Out</SignOut>
          </ContentWrapper>
        </Wrapper>
      );
    } else if (userPage === USER_PAGE_STATUS.SIGN_OUT) {
      if (!user || user.username !== username) return <Loading />;
      return (
        <Wrapper>
          <ContentWrapper>
            <BackText onClick={() => setUserPage(USER_PAGE_STATUS.EDIT_PROFILE)}>
              <BiArrowBack />
              Back
            </BackText>
            <div style={{ height: '70px' }} />
            <SignOutTitle />
            <div style={{ height: '65px' }} />
            <InputWrapper>
              <InputItemWrapper>
                <InputItemText>Password</InputItemText>
                <input
                  name="originalPassword"
                  value={state.originalPassword}
                  onChange={onChange}
                  type="password"
                />
              </InputItemWrapper>
            </InputWrapper>
            <div style={{ height: '60px' }} />
            {signOutLoading ? (
              <LoadingButton>
                <LoadingBox r="40px" />
              </LoadingButton>
            ) : (
              <ConfirmButton onClick={onSignOut}>Leave</ConfirmButton>
            )}
          </ContentWrapper>
        </Wrapper>
      );
    } else {
      return <Error />;
    }
  }
};

export default UserPage;

const Wrapper = styled.div`
  background-color: whitesmoke;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  padding: 70px 40px 100px 40px;
  @media all and (max-width: 1200px) {
    padding: 70px 30px 100px 30px;
  }
  @media all and (max-width: 900px) {
    padding: 70px 20px 100px 20px;
  }
  @media all and (max-width: 600px) {
    padding: 70px 15px 100px 15px;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  min-height: 700px;
  animation: appear 0.5s ease-out;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const UserInfoImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 100px;
  margin-bottom: 15px;
  background-color: #ffffff;
`;
const UserInfoNickname = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-family: NanumSquareR;
  margin-bottom: 8px;
`;
const UserInfoEmail = styled.div`
  font-size: 18px;
  font-family: NanumSquareR;
  margin-bottom: 40px;
`;
const UserTotalScore = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;
const UserTotalScoreText = styled.div`
  font-size: 27px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  color: #008f12;
  margin-right: 10px;
`;
const UserTotalScoreValue = styled.div`
  font-size: 25px;
  font-family: 'Lexend', sans-serif;
  margin-bottom: 1.5px;
`;
const UserScoreWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 45px;
`;
const UserScoreItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px 15px 10px;
`;
const CategoryGameIcon = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 8px;
`;
const UserScore = styled.div`
  font-size: 23px;
  font-family: 'Lexend', sans-serif;
  color: #454545;
`;
const EditButton = styled.div`
  width: 160px;
  height: 50px;
  text-align: center;
  font-size: 21px;
  font-family: 'Lexend', sans-serif;
  margin: -10px 0 25px 0;
  padding-top: 14.5px;
  background-color: #e8e8e8;
  box-shadow: 2px 2px black;
  transition: background-color 0.2s linear;
  cursor: pointer;
  &:hover {
    background-color: #d1d1d1;
  }
`;
const MatchRecordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 168px;
  margin: 25px 0 20px 0;
`;
const NoDataText = styled.div`
  width: 100%;
  min-height: 168px;
  text-align: center;
  font-size: 36px;
  font-family: 'Raleway', sans-serif;
  color: #646464;
  padding-top: 66px;
`;
const BackText = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: -10px 0 20px 0;
  font-size: 18px;
  font-family: 'Press Start 2P', cursive;
  color: #9b9b9b;
  svg {
    width: 20px;
    height: 20px;
    margin: 0 10px 1.5px 0;
  }
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    color: black;
  }
`;
const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  cursor: pointer;
  background-color: white;
  border: 3px solid #464646;
  &:hover {
    filter: contrast(30%);
  }
  margin: 45px 0 15px 0;
`;
const FileInput = styled.input`
  display: none;
`;
const InputWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
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
  color: #000000;
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
  color: ${props =>
    props.color === '#adadad'
      ? '#363636'
      : props.color === '#97ffa4'
      ? '#008304'
      : props.color === '#ff7171'
      ? '#c70000'
      : '#000000'};
`;
const ConfirmButton = styled.div`
  margin: 36px 0 30px 0;
  width: 100%;
  max-width: 400px;
  height: 65px;
  border-radius: 12px;
  font-size: 30px;
  text-align: center;
  letter-spacing: 2px;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  background-color: #dbdbdb;
  border-right: 3px solid #989898;
  border-bottom: 3px solid #989898;
  padding-top: 18px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.25s linear;
  &:hover {
    background-color: #b1b1b1;
  }
`;
const LoadingButton = styled.div`
  margin: 36px 0 30px 0;
  width: 100%;
  max-width: 400px;
  height: 65px;
  border-radius: 12px;
  background-color: #dbdbdb;
  border-right: 3px solid #989898;
  border-bottom: 3px solid #989898;
  outline: none;
`;
const SignOut = styled.div`
  margin: 15px 0 15px 0;
  font-size: 27px;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  color: #d12727;
  cursor: pointer;
`;
