import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPeopleFill } from 'react-icons/bs';
import classNames from 'classnames/bind';
import styles from '../../designs/Utils/GameItem.module.scss';
const cx = classNames.bind(styles);

const GameItem = ({ game }) => {
  return (
    <div className={cx('game')} key={game.name}>
      <Link to={`/games${game.to}`}>
        <img className={cx('image')} src={game.src} alt={game.name} />
        <div className={cx('info')}>
          <div>{game.name}</div>
          <div style={{ display: 'flex' }}>
            <BsFillPeopleFill />
            {game.player_variable
              ? `${game.player[0]}~${game.player[1]}`
              : `${game.player}`}
          </div>
          <div>{game.complexity}</div>
        </div>
      </Link>
    </div>
  );
};

export default GameItem;
