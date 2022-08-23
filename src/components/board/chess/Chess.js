import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { CHESS_COLOR, CHESS_MOVE, CHESS_PIECE_LIST, EMPTY_BOARD } from 'lib/data/gameData';
import { changeRoomField } from 'modules/rooms';

import Player from './Player';
import Etc from './Etc';
import Promotion from './Promotion';
import Result from './Result';

const Chess = ({ myUsername, socket, room }) => {
  const dispatch = useDispatch();
  const myIdx = room.players[0].username === myUsername ? 0 : 1;
  const game = useSelector(state => state.rooms.game);
  const [focus, setFocus] = useState([null, null]); // 선택한 기물의 좌표
  const [moveable, setMoveable] = useState(EMPTY_BOARD); // 선택한 기물의 이동 정보
  const [promotion, setPromotion] = useState(null); // 프로모션
  const popUpRef = useRef(null); // 프로모션 팝업 ref

  // 팝업 ref 설정
  useEffect(() => {
    function handleClickOutside(e) {
      if (popUpRef.current && !popUpRef.current.contains(e.target)) {
        setPromotion(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setFocus([null, null]);
    setMoveable(EMPTY_BOARD);
    setPromotion(null);
  }, [game]);

  const onSelectPiece = (i, j) => {
    if (
      game.turn === game.myColor &&
      game.board[i][j] &&
      game.board[i][j].color === game.myColor &&
      (i !== focus[0] || j !== focus[1])
    ) {
      setFocus([i, j]);
      setMoveable(game.moveable[i][j]);
    } else {
      setFocus([null, null]);
      setMoveable(EMPTY_BOARD);
    }
  };
  const getCellColor = (i, j) => {
    const cellColor = game.myColor === 0 ? (i + j) % 2 : 1 - ((i + j) % 2); // 원래 칸 색깔
    let result = [];

    if (i === focus[0] && j === focus[1]) {
      result = ['#a6deff', '#4da3dc'];
    } else if (
      (i === game.lastMove[0].x && j === game.lastMove[0].y) ||
      (i === game.lastMove[1].x && j === game.lastMove[1].y)
    ) {
      result = ['#fff173', '#aa9832'];
    } else {
      result = ['#fecea0', '#d38a45'];
    }

    return result[cellColor];
  };
  const onReady = () => {
    socket.send(JSON.stringify({ function: 'ready', data: null }));
  };
  const onMove = (i, j) => {
    const moveType = game.moveable[focus[0]][focus[1]][i][j];
    const data = {
      originalLocation: {
        x: focus[0],
        y: focus[1],
      },
      targetLocation: {
        x: i,
        y: j,
      },
      moveType: moveType,
    };
    if (moveType === CHESS_MOVE.PROMOTION) {
      setPromotion(data);
    } else {
      socket.send(JSON.stringify({ function: 'chessMove', data: data }));
    }
  };
  const onPromotion = piece => {
    console.log(promotion, piece);
    socket.send(
      JSON.stringify({
        function: 'chessMove',
        data: { ...promotion, piece: piece },
      }),
    );
    setPromotion(null);
  };
  const onFinish = () => {
    dispatch(changeRoomField({ key: 'game', value: null }));
  };

  if (!game) {
    return (
      <Wrapper>
        <Player user={room.players[myIdx]} isMe={true} onReady={onReady} />
        <GameWrapper>
          <BoardWrapper>
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <BoardRowWrapper key={i}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map(j => (
                  <BoardCellWrapper key={j} color={(i + j) % 2 === 0 ? '#fecea0' : '#d38a45'} />
                ))}
              </BoardRowWrapper>
            ))}
          </BoardWrapper>
        </GameWrapper>
        <Player user={room.players.length === 2 ? room.players[1 - myIdx] : null} isMe={false} />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Player user={game.players[0]} isGame={true} turn={game.turn} />
        <GameWrapper>
          <Etc user={game.players[0]} />
          <BoardWrapper>
            {game.result && <Result result={game.result} onFinish={onFinish} />}
            {promotion && (
              <Promotion
                myColor={game.myColor}
                popUpRef={popUpRef}
                setPromotion={setPromotion}
                onPromotion={onPromotion}
              />
            )}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <BoardRowWrapper key={i}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map(j => (
                  <BoardCellWrapper
                    key={j}
                    color={getCellColor(i, j)}
                    onClick={() => onSelectPiece(i, j)}
                    pointer={
                      game.turn === game.myColor &&
                      game.board[i][j] &&
                      game.board[i][j].color === game.myColor
                        ? 'true'
                        : 'false'
                    }
                  >
                    {game.board[i][j] && (
                      <ChessPiece
                        src={
                          CHESS_PIECE_LIST[game.board[i][j].piece][
                            `${
                              game.board[i][j].color === CHESS_COLOR.WHITE ? 'white' : 'black'
                            }Image`
                          ]
                        }
                        alt="icon"
                      />
                    )}
                    {j === 0 && (
                      <ChessRankText>
                        {game.myColor === CHESS_COLOR.WHITE ? 8 - i : i + 1}
                      </ChessRankText>
                    )}
                    {i === 7 && <ChessFileText>{String.fromCharCode(97 + j)}</ChessFileText>}
                    {moveable[i][j] !== null && (
                      <ChessDropDotWrapper onClick={() => onMove(i, j)}>
                        <ChessDropDot />
                      </ChessDropDotWrapper>
                    )}
                  </BoardCellWrapper>
                ))}
              </BoardRowWrapper>
            ))}
          </BoardWrapper>
          <Etc user={game.players[1]} />
        </GameWrapper>
        <Player user={game.players[1]} isGame={true} turn={game.turn} />
      </Wrapper>
    );
  }
};

export default Chess;

const Wrapper = styled.div`
  width: 100%;
  height: 640px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media all and (max-width: 1450px) {
    flex-direction: column-reverse;
    height: 700px;
  }
  @media all and (max-width: 550px) {
    height: 600px;
  }
  @media all and (max-width: 430px) {
    height: 480px;
  }
  @media all and (max-width: 340px) {
    height: 460px;
  }
`;
const GameWrapper = styled.div`
  width: 640px;
  display: flex;
  justify-content: center;
  background-color: #cfcfcf;
  @media all and (max-width: 1450px) {
    width: 100%;
  }
  @media all and (max-width: 850px) {
    background-color: #7e7e7e;
  }
`;
const BoardWrapper = styled.div`
  position: relative;
  width: 640px;
  height: 640px;
  @media all and (max-width: 1450px) {
    width: 500px;
    height: 500px;
  }
  @media all and (max-width: 550px) {
    width: 400px;
    height: 400px;
  }
  @media all and (max-width: 430px) {
    width: 320px;
    height: 320px;
  }
  @media all and (max-width: 340px) {
    width: 300px;
    height: 300px;
  }
`;
const BoardRowWrapper = styled.div`
  width: 100%;
  height: 12.5%;
  display: flex;
`;
const BoardCellWrapper = styled.div`
  background-color: ${props => props.color};
  width: 12.5%;
  height: 100%;
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
  z-index: 1;
  top: 2px;
  left: 2px;
`;
const ChessFileText = styled.div`
  position: absolute;
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
const ChessDropDotWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  cursor: pointer;
`;
const ChessDropDot = styled.div`
  background-color: #00000097;
  width: 50%;
  height: 50%;
  margin: 25%;
  border-radius: 100%;
`;
