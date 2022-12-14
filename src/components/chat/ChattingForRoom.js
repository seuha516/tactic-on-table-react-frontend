import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsFillPencilFill } from 'react-icons/bs';
import styled, { css } from 'styled-components';

import ChatItem from 'components/chat/ChatItem';

const ChattingForRoom = () => {
  const { socket, me, chatLog, game } = useSelector(({ chats, rooms }) => ({
    socket: chats.socket,
    me: chats.me,
    chatLog: chats.chatLog,
    game: rooms.game,
  }));
  const [mode, setMode] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const chatLogRef = useRef(null);

  useEffect(() => {
    if (game === null) setMode(0);
  }, [game]);
  useEffect(() => {
    scrollEnd();
  }, []);
  useEffect(() => {
    scrollEnd();
  }, [chatLog]);

  const scrollEnd = () => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  };
  const onSendMessage = () => {
    if (chatInput === '') return;
    socket.send(
      JSON.stringify({
        function: 'chatting',
        data: {
          type: 'MESSAGE',
          user: me,
          content: chatInput,
        },
      }),
    );
    setChatInput('');
  };

  return (
    <Wrapper>
      <ChattingTitle>
        <ChattingModeText on={mode === 0 ? 'true' : 'false'} onClick={() => setMode(0)}>
          Chat
        </ChattingModeText>
        {game && game.log && (
          <ChattingModeText on={mode === 1 ? 'true' : 'false'} onClick={() => setMode(1)}>
            Log
          </ChattingModeText>
        )}
      </ChattingTitle>
      <LogWrapper ref={chatLogRef}>
        {mode === 0
          ? chatLog.map((chatItem, idx) => (
              <ChatItem key={idx} chatItem={chatItem} myUsername={me ? me.username : null} />
            ))
          : game &&
            game.log.map(
              (x, idx) =>
                idx % 2 === 0 && (
                  <LogRowWrapper key={idx}>
                    <LogNumber>{idx / 2 + 1}</LogNumber>
                    <LogItem color={0}>{x}</LogItem>
                    {idx + 1 < game.log.length && <LogItem color={1}>{game.log[idx + 1]}</LogItem>}
                  </LogRowWrapper>
                ),
            )}
      </LogWrapper>
      <ChattingInputWrapper>
        <InputWrapper
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') onSendMessage();
          }}
          placeholder="????????? ???????????????."
        />
        <InputWriteButton onClick={onSendMessage}>
          <BsFillPencilFill />
        </InputWriteButton>
      </ChattingInputWrapper>
    </Wrapper>
  );
};

export default ChattingForRoom;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 15px;
  padding: 10px;
  background-color: #e3e3e3;
`;
const ChattingTitle = styled.div`
  width: 100%;
  height: 34px;
  font-size: 25px;
  font-family: 'Lato', sans-serif;
  border-bottom: 2px solid #00000020;
  display: flex;
  justify-content: space-between;
`;
const ChattingModeText = styled.div`
  cursor: pointer;
  ${props =>
    props.on === 'true'
      ? css`
          color: #000000;
        `
      : css`
          color: #878787;
        `}
`;
const LogWrapper = styled.div`
  width: 100%;
  height: 575px;
  max-height: 575px;
  padding: 7.5px 0;
  overflow-y: auto;
  border-bottom: 2px solid #00000020;
  @media all and (max-width: 1450px) {
    height: 635px;
    max-height: 635px;
  }
  @media all and (max-width: 1200px) {
    height: 260px;
    max-height: 260px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ChattingInputWrapper = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 6px;
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
const LogRowWrapper = styled.div`
  width: 100%;
  height: 28px;
  margin-bottom: 5px;
  display: flex;

  font-size: 18px;
  font-family: NanumSquareR;
  text-align: center;
`;
const LogNumber = styled.div`
  width: 40px;
  font-size: 20px;
  font-weight: 600;
  padding-top: 4px;
  background-color: #efc568;
`;
const LogItem = styled.div`
  padding-top: 6px;
  width: calc(50% - 20px);
  ${props =>
    props.color === 0
      ? css`
          background-color: #ffffff;
          color: #000000;
        `
      : css`
          background-color: #000000;
          color: #ffffff;
        `}
`;
