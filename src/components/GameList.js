import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../designs/Utils/GameList.module.scss';
import { gamelist } from '../../data/gamelist';
import GameItem from './GameItem';
import HeaderContainer from '../../containers/Utils/HeaderContainer';
const cx = classNames.bind(styles);

const GameList = () => {
  return (
    <div>
      <HeaderContainer />
      <div className={cx('List')}>
        <div className={cx('Category')}>
          <div className={cx('Title')}>All</div>
          {gamelist.map((game) => (
            <GameItem game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameList;
