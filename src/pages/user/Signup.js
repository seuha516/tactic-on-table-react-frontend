import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import TOT_icon_white from '../../images/TOT_icon_white.png';
import { AiOutlineCheck } from 'react-icons/ai';
import styles from '../../designs/Sign/Signup.module.scss';
import * as checkInformation from '../../lib/checkInformation';
const cx = classNames.bind(styles);

const Signup = ({ form, onChange, onSubmit, onCheck }) => {
  return (
    <div className={cx('Signup')}>
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

      <div className={cx('Input')}>
        <div>ID</div>
        <span>
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            type="text"
            placeholder="6~12자 이내 영문, 숫자"
          />
          <button
            className={cx(checkInformation.checkUsername(form).buttonStatus)}
            onClick={onCheck}
          >
            <AiOutlineCheck style={{ width: '16px', height: '16px' }} />
          </button>
        </span>
        <span
          className={cx(
            'warning',
            checkInformation.checkUsername(form).warnColor,
          )}
        >
          {checkInformation.checkUsername(form).warnMessage}
        </span>

        <div>Password</div>
        <input
          name="password"
          value={form.password}
          onChange={onChange}
          type="password"
          placeholder="8~20자 문자/숫자/기호"
        />
        <span
          className={cx(
            'warning',
            checkInformation.checkPassword(form).warnColor,
          )}
        >
          {checkInformation.checkPassword(form).warnMessage}
        </span>

        <div>Confirm Password</div>
        <input
          name="passwordConfirm"
          value={form.passwordConfirm}
          onChange={onChange}
          type="password"
          placeholder="8~20자 문자/숫자/기호"
        />
        <span
          className={cx(
            'warning',
            checkInformation.checkPasswordConfirm(form).warnColor,
          )}
        >
          {checkInformation.checkPasswordConfirm(form).warnMessage}
        </span>
      </div>

      <div className={cx('SignupButton')}>
        <button onClick={onSubmit}>Sign Up</button>
      </div>
    </div>
  );
};

export default Signup;
