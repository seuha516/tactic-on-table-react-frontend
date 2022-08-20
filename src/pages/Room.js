import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { GAME_LIST } from 'lib/data/gameData';

import { changeChatField, addMessage } from 'modules/chats';
import { changeRoomField, getRoomList } from 'modules/rooms';

import Chatting from 'components/chat/Chatting';
import Chessboard from 'components/board/chess/Chessboard';
import ChattingForRoom from 'components/chat/ChattingForRoom';
import { Loading } from 'components/common/Loading';

const Room = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { code } = useParams();
  const { isLobby, socket, me, password, room } = useSelector(({ chats, rooms }) => ({
    isLobby: chats.isLobby,
    socket: chats.socket,
    me: chats.me,
    password: rooms.password,
    room: rooms.room,
  }));

  let ws = useRef(null);
  useEffect(() => {
    if (isLobby === null) return;
    if (isLobby === true) {
      socket.close();
      return;
    }

    ws.current = new WebSocket(
      `ws://${process.env.REACT_APP_API_SOCKET_URL}/ws/chat/${code}/${
        password !== '' ? `${password}/` : ''
      }`,
    );
    dispatch(changeRoomField({ key: 'password', value: '' }));
    dispatch(changeChatField({ key: 'chatLog', value: [] }));

    ws.current.onopen = () => {
      console.log(`${code} - CONNECTED`);
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
      if (data.type === 'KICK') {
        if (password !== '' || data.value !== '비밀번호가 틀렸습니다.') alert(data.value);
        navigate('/games');
      } else if (data.type === 'JOIN') {
        ws.current.send(JSON.stringify({ function: 'joinRoom', data: me }));
      } else if (data.type === 'ROOM') {
        dispatch(changeRoomField({ key: 'room', value: data.value }));
      } else if (data.type === 'GAME') {
        dispatch(changeRoomField({ key: 'game', value: data.value }));
      } else if (data.type === 'CHATTING') {
        dispatch(addMessage(data.value));
      }
    };
    dispatch(changeChatField({ key: 'socket', value: ws.current }));

    return () => {
      dispatch(changeRoomField({ key: 'room', value: null }));
      dispatch(changeRoomField({ key: 'game', value: null }));
      dispatch(changeChatField({ key: 'chatLog', value: [] }));
      console.log(`${code} - CLOSE`);
      ws.current.close();

      ws.current = new WebSocket(`ws://localhost:8000/ws/chat/lobby/`);
      ws.current.onopen = () => {
        console.log('Lobby - CONNECTED');
        dispatch(changeChatField({ key: 'isLobby', value: true }));
        dispatch(changeChatField({ key: 'socket', value: ws.current }));
      };
      ws.current.onclose = () => {
        console.log('Lobby - DISCONNECTED');
        dispatch(changeChatField({ key: 'isLobby', value: false }));
      };
      ws.current.onerror = error => {
        console.log('Lobby - CONNECTION ERROR');
        console.log(error);
      };
      ws.current.onmessage = e => {
        const data = JSON.parse(e.data);
        if (data.type === 'LOBBY_UPDATE') {
          dispatch(getRoomList());
        } else if (data.type === 'CHATTING') {
          dispatch(addMessage(data.value));
        }
      };
    };
  }, [isLobby]);

  if (!room) {
    return <Loading />;
  } else {
    return (
      <Wrapper>
        <ContentWrapper>
          <LobbyWrapper>
            <RoomInfoWrapper>
              <div>{GAME_LIST[room.game].name}</div>
              <div>{room.name}</div>
              <div>{`${room.players.length} / ${room.maxPlayer}`}</div>
            </RoomInfoWrapper>
            {room.game === 0 ? (
              <Chessboard />
            ) : room.game === 1 ? (
              <div>Halli Galli</div>
            ) : room.game === 2 ? (
              <div>Omok</div>
            ) : room.game === 3 ? (
              <div>Quoridor</div>
            ) : (
              <div>Null</div>
            )}
          </LobbyWrapper>
          <ChattingWrapper>
            <ChattingForRoom />
          </ChattingWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }
};

export default Room;

const Wrapper = styled.div`
  background-color: #404040;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  @media all and (max-width: 1250px) {
    padding: 40px 30px 40px 30px;
  }
  @media all and (max-width: 1150px) {
    padding: 40px 20px 40px 20px;
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  height: 100%;
  min-height: 675px;
  display: flex;
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
const LobbyWrapper = styled.div`
  background-color: transparent;
  width: calc(100% - 310px);
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;
const RoomInfoWrapper = styled.div`
  width: 100%;
  min-height: 35px;
  padding: 0 15px;
  color: white;
  font-size: 20px;
  font-family: NanumSquareR;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #305c83;
`;
const ChattingWrapper = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
`;
