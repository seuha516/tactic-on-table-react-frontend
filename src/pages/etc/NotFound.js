import React from 'react';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import ErrorImage from '../../images/404Error.png';
import styles from '../../designs/WrongWay/NotFound.module.scss';
import HeaderContainer from '../../containers/Utils/HeaderContainer';
const cx = classNames.bind(styles);

const NotFound = ({ location, history }) => {
  const onClick = () => {
    history.push('/');
  };
  return (
    <>
      <HeaderContainer />
      <div className={cx('ShowArea')}>
        <img className={cx('MainImage')} src={ErrorImage} alt="MainImage" />
        <div className={cx('Text')}>{`Cannot find "${location.pathname}"`}</div>
        <div className={cx('Back')} onClick={onClick}>{`<--  Go Home`}</div>
      </div>
    </>
  );
};

export default withRouter(NotFound);
