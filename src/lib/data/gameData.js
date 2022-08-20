export const GAME_LIST = [
  {
    name: 'Chess',
    icon: require('assets/images/game_icon/chess.jpg'),
    image: require('assets/images/game_image/chess.jpg'),
    banner: require('assets/images/home/banner/chess.jpg'),
    player: [2],
    defaultPlayer: 2,
  },
  {
    name: 'Halli Galli',
    icon: require('assets/images/game_icon/halli_galli.png'),
    image: require('assets/images/game_image/halli_galli.png'),
    banner: require('assets/images/home/banner/halli_galli.jpg'),
    player: [2, 3, 4, 5, 6],
    defaultPlayer: 4,
  },
  {
    name: 'Omok',
    icon: require('assets/images/game_icon/omok.png'),
    image: require('assets/images/game_image/omok.jpg'),
    banner: require('assets/images/home/banner/omok.jpg'),
    player: [2],
    defaultPlayer: 2,
  },
  {
    name: 'Quoridor',
    icon: require('assets/images/game_icon/quoridor.png'),
    image: require('assets/images/game_image/quoridor.jpg'),
    banner: require('assets/images/home/banner/quoridor.jpg'),
    player: [2],
    defaultPlayer: 2,
  },
];

export const CHESS_PLAYER_COLOR = ['#ffffff', '#000000', '#e9e9e9'];
export const CHESS_COLOR = {
  WHITE: 0,
  BLACK: 1,
};
export const CHESS_PIECE = {
  PAWN: 0,
  KNIGHT: 1,
  BISHOP: 2,
  ROOK: 3,
  QUEEN: 4,
  KING: 5,
};
export const CHESS_MOVE = {
  NORMAL: 0,
  CASTLING: 1,
  PROMOTION: 2,
  ENPASSANT: 3,
};
export const CHESS_PIECE_LIST = [
  {
    name: 'Pawn',
    whiteImage: require('assets/images/game/chess/white_pawn.png'),
    blackImage: require('assets/images/game/chess/black_pawn.png'),
  },
  {
    name: 'Knight',
    whiteImage: require('assets/images/game/chess/white_knight.png'),
    blackImage: require('assets/images/game/chess/black_knight.png'),
  },
  {
    name: 'Bishop',
    whiteImage: require('assets/images/game/chess/white_bishop.png'),
    blackImage: require('assets/images/game/chess/black_bishop.png'),
  },
  {
    name: 'Rook',
    whiteImage: require('assets/images/game/chess/white_rook.png'),
    blackImage: require('assets/images/game/chess/black_rook.png'),
  },
  {
    name: 'Queen',
    whiteImage: require('assets/images/game/chess/white_queen.png'),
    blackImage: require('assets/images/game/chess/black_queen.png'),
  },
  {
    name: 'King',
    whiteImage: require('assets/images/game/chess/white_king.png'),
    blackImage: require('assets/images/game/chess/black_king.png'),
  },
];
export const EMPTY_BOARD = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
];
