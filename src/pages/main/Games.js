import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineReload, AiOutlineCloseCircle, AiOutlineWarning } from 'react-icons/ai';
import { BiFileFind, BiLogIn } from 'react-icons/bi';
import { FiUserPlus } from 'react-icons/fi';
import styled, { css } from 'styled-components';

import { GAME_LIST } from 'lib/data/gameData';

import { LobbyTitle } from 'components/common/Title';
import Chatting from 'components/chat/Chatting';

const POPUP_STATUS = {
  NONE: 0,
  QUICK_START: 1,
  CREATE_ROOM: 2,
};
const DEFAULT_ROOM_INFO = {
  name: '',
  password: '',
  game: -1,
  maxPeople: 2,
};

const Games = () => {
  const { user, me } = useSelector(({ users, chats }) => ({ user: users.user, me: chats.me }));
  const [popUp, setPopUp] = useState(POPUP_STATUS.NONE);
  const [roomInfo, setRoomInfo] = useState(DEFAULT_ROOM_INFO);
  const popUpRef1 = useRef(null);
  const popUpRef2 = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        popUpRef1.current &&
        popUpRef2.current &&
        !popUpRef1.current.contains(e.target) &&
        !popUpRef2.current.contains(e.target)
      ) {
        setPopUp(POPUP_STATUS.NONE);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onQuickMatch = game => {
    alert(`${game}를 선택했습니다.`);
  };
  const onCreateRoom = () => {
    alert(JSON.stringify(roomInfo));
  };

  return (
    <Wrapper>
      <LobbyTitle />
      {!user && (
        <WarningMessageWrapper>
          <AiOutlineWarning />
          <WarningMessage color="#a56523">로그인 상태가 아닙니다.</WarningMessage>
          <WarningMessage color="#a56523">{me.nickname}</WarningMessage>
          <WarningMessage color="#a56523">으로 게임을 진행하게 됩니다.</WarningMessage>
          <WarningLoginWrapper to="/login">
            <WarningMessage color="#2d2df3">로그인</WarningMessage>
            <BiLogIn />
          </WarningLoginWrapper>
        </WarningMessageWrapper>
      )}
      <ContentWrapper>
        <LobbyWrapper>
          <LobbyButtonWrapper>
            <FastMatchButton onClick={() => setPopUp(POPUP_STATUS.QUICK_START)}>
              <div>빠른 입장</div>
              <BiFileFind />
            </FastMatchButton>
            <CreateRoomButton
              onClick={() => {
                setPopUp(POPUP_STATUS.CREATE_ROOM);
                setRoomInfo(DEFAULT_ROOM_INFO);
              }}
            >
              <div>방 만들기</div>
              <FiUserPlus />
            </CreateRoomButton>
            <AiOutlineReload />
          </LobbyButtonWrapper>
          <LobbyRoomWrapper>
            <Link to={`/games/${'124'}`}>dsd</Link>
          </LobbyRoomWrapper>
        </LobbyWrapper>

        <ChattingWrapper>
          <Chatting />
        </ChattingWrapper>

        <QuickStartPopUp open={popUp === POPUP_STATUS.QUICK_START} ref={popUpRef1}>
          <CloseCreateRoomPopUp>
            <CloseCreateRoomPopUpTitle>Choose a Game</CloseCreateRoomPopUpTitle>
            <AiOutlineCloseCircle onClick={() => setPopUp(POPUP_STATUS.NONE)} />
          </CloseCreateRoomPopUp>
          <QuickStartWrapper>
            <QuickStartGameWrapper all={true} onClick={() => onQuickMatch('ALL')}>
              <CreateRoomGameImage
                src={require('assets/images/game_image/all.jpg')}
                alt="gameImage"
              />
              <QuickStartGameText>ALL</QuickStartGameText>
            </QuickStartGameWrapper>
            {GAME_LIST.map((x, idx) => (
              <QuickStartGameWrapper key={idx} onClick={() => onQuickMatch(x.name)}>
                <CreateRoomGameImage src={x.image} alt="gameImage" />
                <QuickStartGameText>{x.name}</QuickStartGameText>
              </QuickStartGameWrapper>
            ))}
          </QuickStartWrapper>
        </QuickStartPopUp>

        <CreateRoomPopUp open={popUp === POPUP_STATUS.CREATE_ROOM} ref={popUpRef2}>
          <CloseCreateRoomPopUp>
            <CloseCreateRoomPopUpTitle>Create Room</CloseCreateRoomPopUpTitle>
            <AiOutlineCloseCircle onClick={() => setPopUp(POPUP_STATUS.NONE)} />
          </CloseCreateRoomPopUp>
          <CreateRoomWrapper>
            <CreateRoomInputText>Room Name</CreateRoomInputText>
            <CreateRoomInput
              value={roomInfo.name}
              onChange={e => setRoomInfo({ ...roomInfo, name: e.target.value })}
              placeholder="16자 이하"
            />
            <CreateRoomInputText>Password</CreateRoomInputText>
            <CreateRoomInput
              value={roomInfo.password}
              onChange={e => setRoomInfo({ ...roomInfo, password: e.target.value })}
              placeholder="암호를 설정하려면 입력"
            />
            <CreateRoomInputText>Game</CreateRoomInputText>
            <CreateRoomGameList>
              {GAME_LIST.map((x, idx) => (
                <CreateRoomGameWrapper
                  key={idx}
                  onClick={() => {
                    if (roomInfo.game === idx) return;
                    setRoomInfo({ ...roomInfo, game: idx, maxPeople: x.defaultPlayer });
                  }}
                >
                  <CreateRoomGameImage src={x.image} alt="gameImage" />
                  <CreateRoomGameText selected={roomInfo.game === idx}>{x.name}</CreateRoomGameText>
                </CreateRoomGameWrapper>
              ))}
            </CreateRoomGameList>
            {roomInfo.game >= 0 && (
              <>
                <CreateRoomInputText>Max People</CreateRoomInputText>
                <SelectPeople>
                  {GAME_LIST[roomInfo.game].player.map(x => (
                    <Number
                      key={x}
                      selected={x === roomInfo.maxPeople}
                      onClick={() => setRoomInfo({ ...roomInfo, maxPeople: x })}
                    >
                      {x}
                    </Number>
                  ))}
                </SelectPeople>
              </>
            )}
            <CreateButton selected={roomInfo.game >= 0} onClick={onCreateRoom}>
              Create
            </CreateButton>
          </CreateRoomWrapper>
        </CreateRoomPopUp>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Games;

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
  padding: 40px 40px 50px 40px;
  @media all and (max-width: 1400px) {
    padding: 40px 30px 50px 30px;
  }
  @media all and (max-width: 1200px) {
    padding: 40px 20px 50px 20px;
  }
  @media all and (max-width: 1150px) {
    padding: 40px 40px 50px 40px;
  }
  @media all and (max-width: 1050px) {
    padding: 40px 30px 50px 30px;
  }
  @media all and (max-width: 950px) {
    padding: 40px 20px 50px 20px;
  }
  @media all and (max-width: 420px) {
    padding: 40px 15px 50px 15px;
  }
  @media all and (max-width: 400px) {
    padding: 40px 10px 50px 10px;
  }
`;
const WarningMessageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: -15px;
  div:nth-child(3) {
    font-weight: 600;
  }
  svg {
    width: 20px;
    height: 20px;
    margin: 0 5px 1px 0;
    color: #a56523;
  }
`;
const WarningMessage = styled.div`
  color: #535353;
  font-size: 20px;
  font-family: NanumSquareR;
  color: ${props => props.color};
  margin: 5px 2px;
`;
const WarningLoginWrapper = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 5px;
  &:hover {
    font-weight: 600;
  }
  svg {
    color: #2d2df3;
    margin: 0;
  }
`;
const ContentWrapper = styled.div`
  margin-top: 55px;
  width: 100%;
  max-width: 1500px;
  height: 100%;
  min-height: 600px;
  display: flex;
  animation: appear 0.5s ease-out;
  @keyframes appear {
    from {
      opacity: 0;
      margin-top: 50px;
    }
    to {
      opacity: 1;
      margin-top: 20px;
    }
  }
  @media all and (max-width: 1150px) {
    flex-direction: column;
  }
`;
const LobbyWrapper = styled.div`
  background-color: #bbbbbbab;
  width: 70%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
  padding: 10px;
  @media all and (max-width: 1150px) {
    width: 100%;
    min-height: 600px;
    margin-right: 0;
  }
`;
const LobbyButtonWrapper = styled.div`
  width: 100%;
  height: 45px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  font-family: NanumSquareR;
  div + div {
    margin-left: 10px;
  }
  svg:nth-child(3) {
    margin: 5px 5px 0 calc(30% - 45px);
    width: 30px;
    height: 30px;
    color: #646464;
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
      color: black;
    }
  }
`;
const LobbyRoomWrapper = styled.div`
  background-color: aliceblue;
  width: 100%;
  height: 300px;
`;
const FastMatchButton = styled.div`
  width: 35%;
  height: 100%;
  background-color: #82aae7;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s linear;
  svg {
    width: 27px;
    height: 27px;
  }
  div {
    font-size: 20px;
    margin: 0 5px 0 5px;
  }
  &:hover {
    background-color: #639ffb;
  }
  @media all and (max-width: 405px) {
    svg {
      display: none;
    }
    div {
      margin: 0;
    }
  }
  @media all and (max-width: 350px) {
    div {
      font-size: 18px;
    }
  }
`;
const CreateRoomButton = styled.div`
  width: 35%;
  height: 100%;
  background-color: #87da96;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s linear;
  svg {
    width: 27px;
    height: 27px;
  }
  div {
    font-size: 20px;
    margin: 0 8px 0 0;
  }
  &:hover {
    background-color: #51d86a;
  }
  @media all and (max-width: 405px) {
    svg {
      display: none;
    }
    div {
      margin: 0;
    }
  }
  @media all and (max-width: 350px) {
    div {
      font-size: 18px;
    }
  }
`;
const ChattingWrapper = styled.div`
  width: 30%;
  @media all and (max-width: 1150px) {
    width: 100%;
    height: 360px;
    margin-top: 10px;
  }
`;
const QuickStartPopUp = styled.div`
  background-color: #000000d9;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 96%;
  max-width: 500px;
  height: 360px;
  top: 260px;
  left: calc(50% - min(48%, 250px));
  color: white;
  transition: all 0.2s linear;
  ${props =>
    !props.open &&
    css`
      opacity: 0;
      z-index: -1;
    `}
`;
const QuickStartWrapper = styled.div`
  margin-top: 15px;
  width: 100%;
  height: 270px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const QuickStartGameWrapper = styled.div`
  width: ${props => (props.all ? '100%' : 'calc(50% - 6px)')};
  height: 75px;
  margin: 3px;
  position: relative;
`;
const QuickStartGameText = styled.div`
  position: absolute;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  top: 0px;
  text-align: center;
  padding-top: 25px;
  font-size: 28px;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  background-color: #000000b9;
  cursor: pointer;
  &:hover {
    background-color: #00000000;
  }
`;
const CreateRoomPopUp = styled.div`
  background-color: #000000d9;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 96%;
  max-width: 500px;
  height: 530px;
  top: 210px;
  left: calc(50% - min(48%, 250px));
  color: white;
  transition: all 0.2s linear;
  ${props =>
    !props.open &&
    css`
      opacity: 0;
      z-index: -1;
    `}
`;
const CloseCreateRoomPopUp = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;
const CloseCreateRoomPopUpTitle = styled.div`
  font-size: 24px;
  font-family: 'Lato', sans-serif;
`;
const CreateRoomWrapper = styled.div`
  width: 100%;
  height: 480px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CreateRoomInputText = styled.div`
  width: 100%;
  margin: 0 0 3px 3px;
  font-size: 16px;
  cursor: default;
  font-family: 'Nanum Gothic', sans-serif;
`;
const CreateRoomInput = styled.input`
  outline: none;
  width: 100%;
  height: 40px;
  font-size: 20px;
  padding: 8px 12px;
  margin-bottom: 10px;
  border-radius: 10px;
  letter-spacing: -0.5px;
  &::placeholder {
    font-size: 15px;
  }
`;
const CreateRoomGameList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;
const CreateRoomGameWrapper = styled.div`
  width: calc(50% - 6px);
  height: 75px;
  margin: 3px;
  position: relative;
`;
const CreateRoomGameImage = styled.img`
  border-radius: 5px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const CreateRoomGameText = styled.div`
  position: absolute;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  top: 0px;
  text-align: center;
  padding-top: 25px;
  font-size: 28px;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  background-color: ${props => (props.selected ? '#00000000' : '#000000b9')};
  cursor: pointer;
  &:hover {
    background-color: ${props => (props.selected ? '#00000000' : '#00000063')};
  }
`;
const SelectPeople = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  max-width: 360px;
  margin-top: 5px;
`;
const Number = styled.div`
  font-size: 32px;
  font-family: 'Do Hyeon', sans-serif;
  cursor: pointer;
  ${props =>
    props.selected &&
    css`
      color: #ff8b8b;
    `}
`;
const CreateButton = styled.div`
  margin: ${props => (props.selected ? '16px 0 6px 0' : '72px 0 6px 0')};
  width: 100%;
  height: 55px;
  border-radius: 15px;
  border: 2px solid #0000008a;
  font-size: 25px;
  letter-spacing: 2px;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  background-color: #000000;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s linear;
  &:hover {
    background-color: #284051;
  }
`;
