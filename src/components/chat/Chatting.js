import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsFillPencilFill } from 'react-icons/bs';
import styled from 'styled-components';

import ChatItem from 'components/chat/ChatItem';

const Chatting = () => {
  const { socket, me, chatLog } = useSelector(({ chats }) => ({
    socket: chats.socket,
    me: chats.me,
    chatLog: chats.chatLog,
  }));
  const [chatInput, setChatInput] = useState('');
  const chatLogRef = useRef(null);

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
        type: 'chatting',
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
      <ChattingTitle>Chat</ChattingTitle>
      <LogWrapper ref={chatLogRef}>
        {chatLog.map((chatItem, idx) => (
          <ChatItem key={idx} chatItem={chatItem} myUsername={me ? me.username : null} />
        ))}
      </LogWrapper>
      <ChattingInputWrapper>
        <InputWrapper
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') onSendMessage();
          }}
          placeholder="채팅을 입력하세요."
        />
        <InputWriteButton onClick={onSendMessage}>
          <BsFillPencilFill />
        </InputWriteButton>
      </ChattingInputWrapper>
    </Wrapper>
  );
};

export default Chatting;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 15px;
  padding: 10px;
  background-color: #e9e9e9;
`;
const ChattingTitle = styled.div`
  width: 100%;
  height: 34px;
  font-size: 25px;
  font-family: 'Lato', sans-serif;
  border-bottom: 2px solid #00000020;
`;
const LogWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 500px;
  padding: 7.5px 0;
  overflow-y: auto;
  border-bottom: 2px solid #00000020;
  @media all and (max-width: 1150px) {
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
