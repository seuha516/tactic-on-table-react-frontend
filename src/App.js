import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { addMessage, changeChatField } from 'modules/chats';
import { getRoomList } from 'modules/rooms';

import NanumSquareR from 'assets/fonts/NanumSquareR.ttf';

import Header from 'components/sections/Header';
import Footer from 'components/sections/Footer';
import Home from 'pages/Home';
import Games from 'pages/Games';
import Room from 'pages/Room';
import MatchRecord from 'pages/MatchRecord';
import Ranking from 'pages/Ranking';
import Information from 'pages/Information';
import Signup from 'pages/user/Signup';
import Login from 'pages/user/Login';
import UserPage from 'pages/user/UserPage';
import Test from 'Test'; ///////////////////////////////////////////////////

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    img, a {
      -webkit-user-drag: none;
    }
    select {
      -ms-user-select: none;
      -moz-user-select: -moz-none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      user-select: none;
    }
    strong {
      font-weight: bold;
    }
    em {
      font-style: italic;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #4f4f4f;
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #929292;
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px white;
    }
  }
  html {
    overflow-x: hidden;
  }
  body {
    box-sizing: border-box;
    line-height: 1;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  @font-face {
    font-family: NanumSquareR;
    src: url(${NanumSquareR}) format("truetype");
  }
`;

function App() {
  const dispatch = useDispatch();

  let ws = useRef(null);
  useEffect(() => {
    if (!ws.current) {
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
    }
    return () => {
      console.log('Lobby - CLOSE');
      ws.current.close();
    };
  }, [dispatch]);

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="games" element={<Games />} />
          <Route path="games/:code" element={<Room />} />
          <Route path="match_record" element={<MatchRecord />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="information" element={<Information />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="user/:username" element={<UserPage />} />

          <Route path="test" element={<Test />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
