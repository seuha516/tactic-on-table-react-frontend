import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import TOT_icon_white from '../../images/TOT_icon_white.png';
import styles from '../../designs/Sign/Login.module.scss';
const cx = classNames.bind(styles);

const Login = ({ form, onChange, onSubmit }) => {
  return (
    <div className={cx('Login')}>
      <Link to="/">
        <img
          className={cx('Icon')}
          src={TOT_icon_white}
          alt="Icon"
          width="80px"
          height="80px"
        />
      </Link>
      <Link to="/">
        <div className={cx('TitleText')}>Tactic On Table</div>
      </Link>

      <form onSubmit={onSubmit}>
        <div className={cx('Input')}>
          <input
            name="username"
            placeholder="ID"
            onChange={onChange}
            value={form.username}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={onChange}
            value={form.password}
          />
        </div>
        <div className={cx('LoginButton')}>
          <button>Log In</button>
        </div>
      </form>

      {/* <div className={cx('etc')}>
        <div className={cx('forgot')}>Forgot Password?</div>
        <div style={{ display: 'flex' }}>
          <div className={cx('remember')}>Remember</div>
          <input type="checkbox"></input>
        </div>
      </div> */}

      <Link to="/signup" className={cx('Signup')}>
        Sign Up
      </Link>
    </div>
  );
};

export default Login;
