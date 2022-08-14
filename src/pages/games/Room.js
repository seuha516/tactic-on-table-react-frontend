import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { changeChatField, addMessage } from 'modules/chats';

import Chatting from 'components/chat/Chatting';

const Room = () => {
  const dispatch = useDispatch();

  const { code } = useParams();
  const { init, originalWs, user } = useSelector(({ users, chats }) => ({
    init: chats.init,
    originalWs: chats.socket,
    user: users.user,
  }));

  let ws = useRef(null);
  useEffect(() => {
    if (!init) return;
    else originalWs.close();

    ws.current = new WebSocket(`ws://${process.env.REACT_APP_API_SOCKET_URL}/ws/chat/${code}/`);
    ws.current.onopen = () => {
      console.log(`${code} - CONNECTED`);
      ws.current.send(
        JSON.stringify({
          type: 'tryJoinRoom',
          data: {
            code: code,
          },
        }),
      );
    };
    ws.current.onclose = () => {
      console.log(`${code} - DISCONNECTED`);
    };
    ws.current.onerror = error => {
      console.log(`${code} - CONNECTION ERROR`);
      console.log(error);
    };
    ws.current.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data.type === 'chat') {
        dispatch(addMessage({ key: 'chat', value: data.value }));
      } else if (data.type === 'game') {
        dispatch(addMessage({ key: 'game', value: data.value }));
      }
    };
    dispatch(changeChatField({ key: 'socket', value: ws.current }));

    return () => {
      console.log(`${code} - CLOSE`);
      ws.current.close();

      ws.current = new WebSocket(`ws://localhost:8000/ws/chat/lobby/`);
      ws.current.onopen = () => {
        console.log('Lobby - CONNECTED');
      };
      ws.current.onclose = () => {
        console.log('Lobby - DISCONNECTED');
      };
      ws.current.onerror = error => {
        console.log('Lobby - CONNECTION ERROR');
        console.log(error);
      };
      ws.current.onmessage = e => {
        const data = JSON.parse(e.data);
        if (data.type === 'chat') {
          dispatch(addMessage({ key: 'chat', value: data.message }));
        } else if (data.type === 'game') {
          dispatch(addMessage({ key: 'game', value: data.message }));
        }
      };
      dispatch(changeChatField({ key: 'socket', value: ws.current }));
    };
  }, [init]);

  return (
    <Wrapper>
      <ContentWrapper>
        <ChattingWrapper>
          <Chatting />
        </ChattingWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Room;

const Wrapper = styled.div`
  background-color: whitesmoke;
  width: 100%;
  height: 100%;
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
const ChattingWrapper = styled.div`
  width: 30%;
  @media all and (max-width: 1150px) {
    width: 100%;
    height: 360px;
    margin-top: 10px;
  }
`;
