import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import Prepare from '../../images/Preparing.png';
import styles from '../../designs/WrongWay/Preparing.module.scss';
const cx = classNames.bind(styles);

const Preparing = ({ history }) => {
  const onClick = () => {
    history.goBack();
  };
  return (
    <>
      <div className={cx('ShowArea')}>
        <img className={cx('MainImage')} src={Prepare} alt="MainImage" />
        <div className={cx('Text')}>Preparing...</div>
        <div className={cx('Back')} onClick={onClick}>{`<--  Go Back`}</div>
      </div>
    </>
  );
};

export default withRouter(Preparing);
