import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineReload, AiOutlineCloseCircle, AiFillLock, AiOutlineWarning } from 'react-icons/ai';
import { BiFileFind, BiLogIn } from 'react-icons/bi';
import { BsPeopleFill, BsFillPencilFill } from 'react-icons/bs';
import { FiUserPlus } from 'react-icons/fi';
import styled, { css } from 'styled-components';

import { gameData } from 'lib/data/gameList';

// TEST VARIABLE.
const condition1 = true; // 로그인 여부.
const var1 = '익명3536'; // 임시 익명 닉네임
const var2 = 13; // 채팅 인원수
const tempUser = {
  username: 'abcd11',
  nickname: '진짜전승하',
  image: 'zl8592jig88zugk2f9cwa66bunixj7cys86d.png',
};
const tempChatLog = [
  {
    user: {
      username: 'seuha516',
      nickname: '전승하123',
      image: 'jnddsowj7thcc17i9zy96ngtvkvczjiq6q0n.png',
    },
    content: '안녕하세요',
    time: new Date(),
  },
  {
    user: {
      username: 'seuha516',
      nickname: '전승하123',
      image: 'p5ehejszkony7y1f3ch5o8eeaepk78yd8wzy.jpeg',
    },
    content:
      '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
    time: new Date(),
  },
  {
    user: {
      username: 'seuha516',
      nickname: '전승하123',
      image: 'jnddsowj7thcc17i9zy96ngtvkvczjiq6q0n.png',
    },
    content: '안녕하세요',
    time: new Date(),
  },
  {
    user: {
      username: 'seuha516',
      nickname: '전승하123',
      image: 'p5ehejszkony7y1f3ch5o8eeaepk78yd8wzy.jpeg',
    },
    content: '안녕하세요',
    time: new Date(),
  },
  {
    user: {
      username: 'seuha516',
      nickname: '전승하123',
      image: 'jnddsowj7thcc17i9zy96ngtvkvczjiq6q0n.png',
    },
    content: '안녕하세요',
    time: new Date(),
  },
  {
    user: {
      username: 'seuha516',
      nickname: '전승하123',
      image: 'p5ehejszkony7y1f3ch5o8eeaepk78yd8wzy.jpeg',
    },
    content: '안녕하세요',
    time: new Date(),
  },
  {
    user: {
      username: 'seuha516',
      nickname: '전승하123',
      image: 'jnddsowj7thcc17i9zy96ngtvkvczjiq6q0n.png',
    },
    content: '안녕하세요',
    time: new Date(),
  },
  {
    user: {
      username: 'seuha516',
      nickname: '전승하123',
      image: 'p5ehejszkony7y1f3ch5o8eeaepk78yd8wzy.jpeg',
    },
    content: '안녕하세요',
    time: new Date(),
  },
  {
    user: {
      username: 'seuha516',
      nickname: '전승하123',
      image: 'jnddsowj7thcc17i9zy96ngtvkvczjiq6q0n.png',
    },
    content: '안녕하세요',
    time: new Date(),
  },
  {
    user: {
      username: 'seuha516',
      nickname: '전승하123',
      image: 'p5ehejszkony7y1f3ch5o8eeaepk78yd8wzy.jpeg',
    },
    content: '안녕하세요',
    time: new Date(),
  },
  {
    user: {
      username: 'seuha516',
      nickname: '전승하123',
      image: 'jnddsowj7thcc17i9zy96ngtvkvczjiq6q0n.png',
    },
    content: '안녕하세요',
    time: new Date(),
  },
  {
    user: {
      username: 'seuha516',
      nickname: '전승하123',
      image: 'p5ehejszkony7y1f3ch5o8eeaepk78yd8wzy.jpeg',
    },
    content: '안녕하세요',
    time: new Date(),
  },
];

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
  const [popUp, setPopUp] = useState(POPUP_STATUS.NONE);
  const [roomInfo, setRoomInfo] = useState(DEFAULT_ROOM_INFO);
  const [chatLog, setChatLog] = useState(tempChatLog);
  const [chatInput, setChatInput] = useState('');
  const popUpRef1 = useRef(null);
  const popUpRef2 = useRef(null);
  const chatLogRef = useRef(null);

  const webSocketUrl = `ws://localhost:8000/ws/chat/afd/`;
  let ws = useRef(null);
  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(webSocketUrl);
      ws.current.onopen = () => {
        console.log('connected to ' + webSocketUrl);
      };
      ws.current.onclose = error => {
        console.log('disconnect from ' + webSocketUrl);
        console.log(error);
      };
      ws.current.onerror = error => {
        console.log('connection error ' + webSocketUrl);
        console.log(error);
      };
      ws.current.onmessage = e => {
        const data = JSON.parse(e.data);
        setChatLog(prevItems => [...prevItems, data.message]);
      };
    }
    return () => {
      console.log('clean up');
      ws.current.close();
    };
  }, []);

  const onQuickMatch = game => {
    alert(`${game}를 선택했습니다.`);
  };
  const onCreateRoom = () => {
    alert(JSON.stringify(roomInfo));
  };
  const onSendMessage = () => {
    if (chatInput === '') return;
    ws.current.send(
      JSON.stringify({
        message: {
          user: tempUser,
          content: chatInput,
          time: new Date(),
        },
      }),
    );
    setChatInput('');
  };

  const scrollEnd = () => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  };

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
  }, [popUpRef1, popUpRef2]);
  useEffect(() => {
    scrollEnd();
  }, [chatLog]);

  return (
    <Wrapper>
      <TitleWrapper>
        <Title1>L</Title1>
        <Title2>obby</Title2>
      </TitleWrapper>
      {condition1 && (
        <WarningMessageWrapper>
          <AiOutlineWarning />
          <WarningMessage color="#a56523">로그인 상태가 아닙니다.</WarningMessage>
          <WarningMessage color="#a56523">{var1}</WarningMessage>
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
        </LobbyWrapper>

        <ChattingWrapper>
          <ChattingInfoWrapper>
            <ChattingTitle>Chat</ChattingTitle>
            <ChattingInfo>
              <BsPeopleFill />
              {var2}
            </ChattingInfo>
          </ChattingInfoWrapper>
          <ChattingLogWrapper ref={chatLogRef}>
            {chatLog.map((x, idx) => (
              <ChatWrapper key={idx} my={true}>
                <ChatImage src={process.env.REACT_APP_API_IMAGE + x.user.image} alt="ProfileImage" />
                <ChatContentWrapper>
                  <ChatNickname>{x.user.nickname}</ChatNickname>
                  <div>{x.content}</div>
                </ChatContentWrapper>
              </ChatWrapper>
            ))}
          </ChattingLogWrapper>
          <ChattingInputWrapper>
            <InputWrapper
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') onSendMessage();
              }}
              placeholder="댓글을 입력하세요."
            />
            <InputWriteButton onClick={onSendMessage}>
              <BsFillPencilFill />
            </InputWriteButton>
          </ChattingInputWrapper>
        </ChattingWrapper>
      </ContentWrapper>

      <QuickStartPopUp open={popUp === POPUP_STATUS.QUICK_START} ref={popUpRef1}>
        <CloseCreateRoomPopUp>
          <CloseCreateRoomPopUpTitle>Choose a Game</CloseCreateRoomPopUpTitle>
          <AiOutlineCloseCircle onClick={() => setPopUp(POPUP_STATUS.NONE)} />
        </CloseCreateRoomPopUp>

        <QuickStartWrapper>
          <QuickStartGameWrapper all={true} onClick={() => onQuickMatch('ALL')}>
            <CreateRoomGameImage src={require('assets/images/game_image/all.jpg')} alt="gameImage" />
            <QuickStartGameText>ALL</QuickStartGameText>
          </QuickStartGameWrapper>
          {gameData.map((x, idx) => (
            <CreateRoomGameWrapper key={idx} onClick={() => onQuickMatch(x.name)}>
              <CreateRoomGameImage src={x.image} alt="gameImage" />
              <QuickStartGameText>{x.name}</QuickStartGameText>
            </CreateRoomGameWrapper>
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
            name="name"
            value={roomInfo.name}
            onChange={e => setRoomInfo({ ...roomInfo, name: e.target.value })}
            placeholder="16자 이하"
          />
          <CreateRoomInputText>Password</CreateRoomInputText>
          <CreateRoomInput
            name="password"
            value={roomInfo.password}
            onChange={e => setRoomInfo({ ...roomInfo, password: e.target.value })}
            placeholder="암호를 설정하려면 입력"
          />
          <CreateRoomInputText>Game</CreateRoomInputText>
          <CreateRoomGameList>
            {gameData.map((x, idx) => (
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
                {gameData[roomInfo.game].player.map(x => (
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
    </Wrapper>

    // <div>
    //   <div>socket</div>
    //   <div>socket connected : {`${socketConnected}`}</div>
    //   <div>res : </div>
    //   <div>
    //     {items.map((item, idx) => {
    //       return <div key={idx}>{JSON.stringify(item)}</div>;
    //     })}
    //   </div>
    // </div>
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
const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  height: 85px;
  font-family: 'Hammersmith One', sans-serif;
`;
const Title1 = styled.div`
  font-size: 72px;
`;
const Title2 = styled.div`
  font-size: 60px;
`;
const WarningMessageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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
  margin-top: 20px;
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
const ChattingWrapper = styled.div`
  background-color: #d3d3d3ab;
  width: 30%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  @media all and (max-width: 1150px) {
    width: 100%;
    height: 360px;
    margin-top: 10px;
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

const ChattingInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  font-size: 26px;
  font-family: 'Lato', sans-serif;
  padding-bottom: 10px;
  border-bottom: 2px solid #00000020;
`;
const ChattingTitle = styled.div`
  width: 100%;
`;
const ChattingInfo = styled.div`
  display: flex;
  svg {
    width: 26px;
    height: 26px;
    margin-right: 5px;
  }
`;
const ChattingLogWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 494px;
  padding-top: 15px;
  overflow-y: auto;
  @media all and (max-width: 1150px) {
    max-height: 254px;
  }
`;
const ChattingInputWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  height: 40px;
  display: flex;
`;
const InputWrapper = styled.input`
  width: calc(100% - 45px);
  height: 100%;
  border: 0;
  border-radius: 5px;
  background-color: #ffffff;
  padding: 0 10px;
  font-size: 16px;
`;
const InputWriteButton = styled.div`
  width: 40px;
  height: 100%;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #7c7c7c;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s linear;
  svg {
    color: white;
    width: 20px;
    height: 20px;
  }
  &:hover {
    background-color: #525252;
  }
`;
const ChatWrapper = styled.div`
  display: flex;
  margin-bottom: 15px;
  font-size: 17px;
  font-family: NanumSquareR;
`;
const ChatImage = styled.img`
  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 45px;
  margin-right: 5px;
`;
const ChatContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChatNickname = styled.div`
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 5px;
`;

const RoomWrapper = styled.div`
  width: 100%;
  height: 279px;
  margin-bottom: 6px;
  padding: 0 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;
const Room = styled.div`
  width: calc(50% - 10px);
  height: 73px;
  margin: 5px 5px 3px 5px;
  padding: 3px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 1px 1px #000000a6;
  border-radius: 8px;
  cursor: pointer;
  transition: margin 0.15s linear;
  background-color: ${props => (props.full ? '#00000085' : props.color)};
  &:hover {
    margin: 3px 7px 5px 3px;
  }
  @media all and (max-width: 395px) {
    width: 100%;
  }
`;
const RoomTitle = styled.div`
  margin-bottom: 3px;
  font-size: 20px;
  font-family: 'Nanum Gothic', sans-serif;
  line-height: 22px;
  height: 43.2px;
`;
const RoomInfo = styled.div`
  height: 20.8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    width: 18px;
    height: 18px;
    margin-right: 3px;
  }
`;
const LockIcon = styled(AiFillLock)`
  ${props =>
    props.password === '' &&
    css`
      visibility: hidden;
    `}
`;
const People = styled.div`
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const ChatWrapper = styled.div`
//   width: 100%;
//   height: 140px;
//   display: flex;
//   flex-direction: column;
//   background-color: #cdcdcd8f;
//   border-radius: 5px;
//   padding: 5px 5px 2px 5px;
// `;
// const Messages = styled.div`
//   height: 109px;
//   padding-bottom: 3px;
//   overflow: auto;
//   &::-webkit-scrollbar {
//     width: 10px;
//   }
//   &::-webkit-scrollbar-thumb {
//     background-color: black;
//     border-radius: 10px;
//     background-clip: padding-box;
//     border: 2px solid transparent;
//   }
//   &::-webkit-scrollbar-track {
//     background-color: grey;
//     border-radius: 10px;
//     box-shadow: inset 0px 0px 5px white;
//   }
// `;
const MessageInputWrapper = styled.form`
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Nanum Gothic', sans-serif;
`;
const MessageInput = styled.input`
  width: calc(100% - 40px);
  height: 25px;
  padding: 0 4px;
`;
const SubmitButton = styled.div`
  width: 38px;
  height: 25px;
  background: black;
  color: white;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const MessageWrapper = styled.div`
  font-size: 15px;
  font-family: 'Nanum Gothic', sans-serif;
  line-height: 17px;
  line-break: anywhere;
  strong {
    font-weight: 600;
    ${props =>
      props.id === 'true' &&
      css`
        color: #007f04;
      `}
  }

  -ms-user-select: text;
  -moz-user-select: -moz-text;
  -webkit-user-select: text;
  -khtml-user-select: text;
  user-select: text;
`;
