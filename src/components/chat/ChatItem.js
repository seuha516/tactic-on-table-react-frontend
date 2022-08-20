/* 
  chatItem
  type: NOTICE / GAME / MESSAGE
  info: JOIN / LEAVE / ROOM_SETTING_CHANGED (NOTICE)
        TIPS / WARNING / RESULT (GAME)
  user: {username, nickname, image, email} (MESSAGE)
  content: string
*/

import React from 'react';
import { AiOutlineInfoCircle, AiOutlineWarning, AiFillFlag } from 'react-icons/ai';
import styled from 'styled-components';

const COLOR = {
  JOIN: '#d9ffcb',
  LEAVE: '#ffcbcb',
  ROOM_SETTING_CHANGED: '#cbe1ff',
  TIPS: '#0f0089',
  WARNING: '#8d4700',
  RESULT: '#bb1a1a',
};
const ICON = {
  TIPS: <AiOutlineInfoCircle />,
  WARNING: <AiOutlineWarning />,
  RESULT: <AiFillFlag />,
};

const ChatItem = ({ chatItem, myUsername }) => {
  if (chatItem.type === 'NOTICE') {
    return <NoticeWrapper backgroundColor={COLOR[chatItem.info]}>{chatItem.content}</NoticeWrapper>;
  } else if (chatItem.type === 'GAME') {
    return (
      <GameWrapper color={COLOR[chatItem.info]}>
        {ICON[chatItem.info]}
        <div>{chatItem.content}</div>
      </GameWrapper>
    );
  } else if (chatItem.type === 'MESSAGE') {
    if (myUsername === chatItem.user.username) {
      return (
        <MyMessageWrapper>
          <MyChatContent>{chatItem.content}</MyChatContent>
        </MyMessageWrapper>
      );
    } else {
      return (
        <MessageWrapper>
          <ChatImage
            src={process.env.REACT_APP_API_IMAGE + chatItem.user.image}
            alt="profileImage"
          />
          <ChatDataWrapper>
            <ChatNickname>{chatItem.user.nickname}</ChatNickname>
            <ChatContentWrapper>
              <ChatContent>{chatItem.content}</ChatContent>
            </ChatContentWrapper>
          </ChatDataWrapper>
        </MessageWrapper>
      );
    }
  } else {
    return <div />;
  }
};

export default ChatItem;

const NoticeWrapper = styled.div`
  background-color: ${props => props.backgroundColor};
  width: 100%;
  padding: 3px 10px;
  margin: 4px 0;
  font-size: 18px;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  line-height: 24px;
`;
const GameWrapper = styled.div`
  color: ${props => props.color};
  background-color: #ffffff6e;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 3px 10px;
  margin: 4px 0;
  font-size: 18px;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  line-height: 24px;
  svg {
    width: 24px;
    height: 24px;
    margin: 1.5px 4px 0 0;
  }
  div {
    width: calc(100% - 28px);
  }
`;
const MyMessageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 80%;
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 18px;
  text-align: end;
  margin: 8px 0 10px 20%;
`;
const MyChatContent = styled.div`
  position: relative;
  background: #feff85;
  padding: 4px 7px 6px 6px;
  word-break: break-all;
  border-radius: 3px;
  border-bottom-right-radius: 0;
  &:after {
    border-bottom: 0px solid transparent;
    border-right: 0px solid transparent;
    border-left: 10px solid transparent;
    border-top: 10px solid #feff85;
    content: '';
    position: absolute;
    bottom: -6px;
    right: 0px;
  }
`;
const MessageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 80%;
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 18px;
  margin: 10px 20% 10px 0;
`;
const ChatImage = styled.img`
  width: 45px;
  height: 45px;
  border: 2px solid black;
  border-radius: 45px;
  margin-right: 5px;
  background-color: white;
`;
const ChatDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChatNickname = styled.div`
  font-weight: 500;
  margin-bottom: 5px;
`;
const ChatContentWrapper = styled.div`
  display: flex;
`;
const ChatContent = styled.div`
  position: relative;
  background: #ffffff;
  padding: 4px 7px 6px 6px;
  word-break: break-all;
  border-radius: 3px;
  border-bottom-left-radius: 0;
  &:after {
    border-top: 0px solid transparent;
    border-right: 0px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 10px solid #ffffff;
    content: '';
    position: absolute;
    bottom: 0px;
    left: -6px;
  }
`;
