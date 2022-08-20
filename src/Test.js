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

import ChattingForRoom from 'components/chat/ChattingForRoom';

const myUsername = 'seuha516';
const room = {
  name: '게임하는방가나다라마바사아자차카',
  game: 0,
  maxPlayer: 2,
  players: [
    { image: 'profile_default.png', nickname: '익명jneaJ1DK', username: '익명jneaJ1DK' },
    {
      image: 'spvmw5rtvjdc8nuau0y5go7qzrnnwl7vyztw.png',
      nickname: '전승하가나다라마바사아자',
      username: 'seuha516',
    },
  ],
};
const game1 = null;
const game = {
  white: '익명fdkW2c',
  black: 'seuha516',
  turn: 0,
  board: [
    [
      { color: 1, piece: 3 },
      { color: 1, piece: 1 },
      { color: 1, piece: 2 },
      { color: 1, piece: 4 },
      { color: 1, piece: 5 },
      { color: 1, piece: 2 },
      { color: 1, piece: 1 },
      { color: 1, piece: 3 },
    ],
    [
      { color: 1, piece: 0 },
      { color: 1, piece: 0 },
      { color: 1, piece: 0 },
      { color: 1, piece: 0 },
      { color: 1, piece: 0 },
      { color: 1, piece: 0 },
      { color: 1, piece: 0 },
      { color: 1, piece: 0 },
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      { color: 0, piece: 0 },
      { color: 0, piece: 0 },
      { color: 0, piece: 0 },
      { color: 0, piece: 0 },
      { color: 0, piece: 0 },
      { color: 0, piece: 0 },
      { color: 0, piece: 0 },
      { color: 0, piece: 0 },
    ],
    [
      { color: 0, piece: 3 },
      { color: 0, piece: 1 },
      { color: 0, piece: 2 },
      { color: 0, piece: 4 },
      { color: 0, piece: 5 },
      { color: 0, piece: 2 },
      { color: 0, piece: 1 },
      { color: 0, piece: 3 },
    ],
  ],
  moveable: [
    [
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [0, null, 0, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, 0, null, 0],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
    ],
    [
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [0, null, null, null, null, null, null, null],
        [0, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, 0, null, null, null, null, null, null],
        [null, 0, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, 0, null, null, null, null, null],
        [null, null, 0, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, 0, null, null, null, null],
        [null, null, null, 0, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, 0, null, null, null],
        [null, null, null, null, 0, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, 0, null, null],
        [null, null, null, null, null, 0, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, 0, null],
        [null, null, null, null, null, null, 0, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, 2],
        [null, null, null, null, null, null, null, 0],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
    ],
    [
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
    ],
    [
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
    ],
    [
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
    ],
    [
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
    ],
    [
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [0, null, null, null, null, null, null, null],
        [2, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, 0, null, null, null, null, null, null],
        [null, 0, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, 0, null, null, null, null, null],
        [null, null, 0, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, 0, null, null, null, null],
        [null, null, null, 0, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, 0, null, null, null],
        [null, null, null, null, 0, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, 0, null, null],
        [null, null, null, null, null, 0, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, 0, null],
        [null, null, null, null, null, null, 0, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, 0],
        [null, null, null, null, null, null, null, 0],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
    ],
    [
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [0, null, 0, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, 0, null, 0],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
      [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
      ],
    ],
  ],
  whiteDead: [0, 1, 2, 3, 4],
  blackDead: [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4],
};
const myIndex = 0;
const myColor = 0;
const otherColor = 1;

const Test = () => {
  return (
    <Wrapper1>
      <ContentWrapper1>
        <LobbyWrapper1>
          <RoomInfoWrapper>
            <div>{GAME_LIST[room.game].name}</div>
            <div>{room.name}</div>
            <div>{`${room.players.length} / ${room.maxPlayer}`}</div>
          </RoomInfoWrapper>
          <Chessboard />
        </LobbyWrapper1>
        <ChattingWrapper1>
          <ChattingForRoom />
        </ChattingWrapper1>
      </ContentWrapper1>
    </Wrapper1>
  );
};
export default Test;
const Wrapper1 = styled.div`
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
const ContentWrapper1 = styled.div`
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
const LobbyWrapper1 = styled.div`
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
const ChattingWrapper1 = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
`;

const Chessboard = () => {
  const [focus, setFocus] = useState([null, null]);
  const [moveable, setMoveable] = useState(EMPTY_BOARD);

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
  const onReady = () => {};

  const getCellColor = (i, j) => {
    if (i === focus[0] && j === focus[1]) {
      if ((i + j) % 2 === 0) {
        return '#fff173';
      } else {
        return '#e5d224';
      }
    } else {
      if ((i + j) % 2 === 0) {
        return '#fecea0';
      } else {
        return '#d38a45';
      }
    }
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
                  color={getCellColor(i, j)}
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
      {game[`${color === '#ffffff' ? 'black' : 'white'}Dead`].map((x, idx) => (
        <DeadPieceImage
          key={idx}
          src={CHESS_PIECE_LIST[x][`${color === '#ffffff' ? 'black' : 'white'}Image`]}
          alt={CHESS_PIECE_LIST[x].name}
        />
      ))}
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
