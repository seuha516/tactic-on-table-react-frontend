import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import {
  GAME_LIST,
  CHESS_COLOR,
  CHESS_PLAYER_COLOR,
  CHESS_PIECE,
  CHESS_MOVE,
  CHESS_PIECE_LIST,
  EMPTY_BOARD,
} from 'lib/data/gameData';

const Chessboard = () => {
  const { myUsername, socket, room, game } = useSelector(({ chats, rooms }) => ({
    myUsername: chats.me.username,
    socket: chats.socket,
    room: rooms.room,
    game: rooms.game,
  }));
  const [focus, setFocus] = useState([null, null]);
  const [moveable, setMoveable] = useState(EMPTY_BOARD);
  const myIndex = room.players[0].username === myUsername ? 0 : 1;
  const myColor = game ? (game.white === myUsername ? CHESS_COLOR.WHITE : CHESS_COLOR.BLACK) : 2;
  const otherColor = game ? (game.white === myUsername ? CHESS_COLOR.WHITE : CHESS_COLOR.BLACK) : 2;

  const onSelectPiece = (i, j) => {
    if (
      game.turn === myColor &&
      game.board[i][j] &&
      game.board[i][j].color === myColor &&
      (i !== focus[0] || j !== focus[1])
    ) {
      setFocus([i, j]);
      setMoveable(game.moveable[i][j]);
    } else {
      setFocus([null, null]);
      setMoveable(EMPTY_BOARD);
    }
  };
  const onReady = () => {
    socket.send(JSON.stringify({ function: 'ready', data: null }));
  };

  return (
    <Wrapper>
      <PlayerWrapper color={CHESS_PLAYER_COLOR[myColor]}>
        <ProfileWrapper>
          <ProfileImage
            src={process.env.REACT_APP_API_IMAGE + room.players[myIndex].image}
            alt="profileImage"
            color={myColor}
          />
          <div>{room.players[myIndex].nickname}</div>
        </ProfileWrapper>
        {game ? (
          <>
            <Time>29 : 10</Time>
            <DeadPieces color={CHESS_PLAYER_COLOR[myColor]} />
          </>
        ) : room.players[myIndex].ready ? (
          <ReadyText>Ready</ReadyText>
        ) : (
          <ReadyButton onClick={onReady}>Ready</ReadyButton>
        )}
      </PlayerWrapper>

      <GameWrapper>
        <GameEtcWrapper>dd</GameEtcWrapper>

        <BoardWrapper>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <BoardRowWrapper key={i}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map(j => (
                <BoardCellWrapper
                  key={j}
                  color={(i + j) % 2 === 0 ? '#fecea0' : '#d38a45'}
                  onClick={() => onSelectPiece(i, j)}
                  pointer={
                    game.board[i][j] && game.turn === myColor && game.board[i][j].color === myColor
                      ? 'true'
                      : 'false'
                  }
                >
                  {game.board[i][j] && (
                    <ChessPiece
                      src={
                        CHESS_PIECE_LIST[game.board[i][j].piece][
                          `${game.board[i][j].color === 0 ? 'white' : 'black'}Image`
                        ]
                      }
                      alt="icon"
                    />
                  )}
                  {j === 0 && <ChessRankText>{myColor === 0 ? 8 - i : i + 1}</ChessRankText>}
                  {i === 7 && <ChessFileText>{String.fromCharCode(97 + j)}</ChessFileText>}
                  {moveable[i][j] !== null && <ChessDropDot />}
                </BoardCellWrapper>
              ))}
            </BoardRowWrapper>
          ))}
        </BoardWrapper>

        <GameEtcWrapper>dd</GameEtcWrapper>
      </GameWrapper>

      <PlayerWrapper color={CHESS_PLAYER_COLOR[otherColor]}>
        {room.players.length > 1 ? (
          <>
            <ProfileWrapper>
              <ProfileImage
                src={process.env.REACT_APP_API_IMAGE + room.players[1 - myIndex].image}
                alt="profileImage"
                color={otherColor}
              />
              <div>{room.players[1 - myIndex].nickname}</div>
            </ProfileWrapper>
            {game ? (
              <>
                <Time>27 : 53</Time>
                <DeadPieces color={CHESS_PLAYER_COLOR[otherColor]} />
              </>
            ) : room.players[1 - myIndex].ready ? (
              <ReadyText>Ready</ReadyText>
            ) : (
              <ReadyText style={{ color: '#a0a0a0' }}>Ready</ReadyText>
            )}
          </>
        ) : (
          <div>Wait</div>
        )}
      </PlayerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media all and (max-width: 1450px) {
    flex-direction: column;
  }
`;
const GameWrapper = styled.div`
  width: 640px;
  display: flex;
  @media all and (max-width: 1450px) {
    width: 100%;
  }
`;
const BoardWrapper = styled.div`
  width: 640px;
  height: 640px;
  @media all and (max-width: 1450px) {
    width: 500px;
    height: 500px;
  }
`;
const BoardRowWrapper = styled.div`
  width: 100%;
  height: 12.5%;
  display: flex;
`;
const BoardCellWrapper = styled.div`
  width: 12.5%;
  height: 100%;
  background-color: ${props => props.color};
  color: #8d4e00;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-weight: 600;
  position: relative;
  ${props =>
    props.pointer === 'true' &&
    css`
      cursor: pointer;
    `}
`;
const ChessRankText = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 2px;
  left: 2px;
`;
const ChessFileText = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: calc(100% - 16px);
  left: calc(100% - 9px);
`;
const ChessPiece = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
`;
const ChessDropDot = styled.div`
  position: absolute;
  background-color: #00000097;
  width: 50%;
  height: 50%;
  margin: 25%;
  border-radius: 100%;
  z-index: 3;
`;
const GameEtcWrapper = styled.div`
  width: calc(50% - 250px);
  background-color: wheat;
  display: none;
  @media all and (max-width: 1450px) {
    display: block;
  }
`;
const PlayerWrapper = styled.div`
  background-color: ${props => props.color};
  color: ${props => (props.color === '#000000' ? '#ffffff' : '#000000')};
  width: calc(50% - 320px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media all and (max-width: 1450px) {
    width: 100%;
    height: 100px;
  }
`;
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 185px;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 18px;
  margin-top: 50px;
`;
const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid;
  border-color: ${props => (props.color === '#000000' ? '#a7a7a7' : '#000000')};
  border-radius: 45px;
  margin-bottom: 6px;
  background-color: #ffffff;
`;
const ReadyButton = styled.div`
  margin-top: 160px;
  width: 150px;
  height: 55px;
  padding-top: 10px;
  font-size: 40px;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  text-align: center;
  background-color: #343434;
  color: white;
  box-shadow: 2px 2px 2px 2px #a4a4a4;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.25s linear;
  &:hover {
    background-color: #000000;
    box-shadow: 2px 2px 2px 2px #757575;
  }
`;
const ReadyText = styled.div`
  margin-top: 160px;
  width: 150px;
  height: 55px;
  padding-top: 5px;
  font-size: 50px;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  text-align: center;
  border-radius: 3px;
`;
const Time = styled.div`
  margin-top: 50px;
  font-size: 40px;
  font-family: 'Rubik', sans-serif;
  line-height: 30px;
`;

const DeadPieces = ({ color }) => {
  return (
    <DeadPiecesWrapper>
      {/* {game[`${color === '#ffffff' ? 'black' : 'white'}Dead`].map((x, idx) => (
        <DeadPieceImage
          key={idx}
          src={CHESS_PIECE_LIST[x][`${color === '#ffffff' ? 'black' : 'white'}Image`]}
          alt={CHESS_PIECE_LIST[x].name}
        />
      ))} */}
    </DeadPiecesWrapper>
  );
};
const DeadPiecesWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const DeadPieceImage = styled.img`
  width: 40px;
  height: 40px;
`;

export default Chessboard;
