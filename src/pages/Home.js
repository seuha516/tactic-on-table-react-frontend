import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { changeRoomField, quickMatch } from 'modules/rooms';

import HomeBanner1 from 'components/banner/HomeBanner1';
import HomeBanner2 from 'components/banner/HomeBanner2';
import HomeBanner3 from 'components/banner/HomeBanner3';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const roomCode = useSelector(state => state.rooms.create);

  useEffect(() => {
    if (roomCode) {
      if (roomCode === 'X') {
        alert('빠른 입장이 가능한 공개 방이 없습니다.');
      } else {
        navigate(`/games/${roomCode}`);
      }
      dispatch(changeRoomField({ key: 'create', value: null }));
    }
  }, [dispatch, navigate, roomCode]);

  const onQuickMatch = game => {
    dispatch(quickMatch(game));
  };

  return (
    <Wrapper>
      <HomeBanner1 />
      {[0, 1, 2, 3].map(idx => (
        <HomeBanner2 key={idx} gameidx={idx} onQuickMatch={onQuickMatch} />
      ))}
      <HomeBanner3 />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  background-color: #363636;
`;
