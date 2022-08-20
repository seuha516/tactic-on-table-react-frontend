import React from 'react';
import styled from 'styled-components';

import HomeBanner1 from 'components/banner/HomeBanner1';
import HomeBanner2 from 'components/banner/HomeBanner2';
import HomeBanner3 from 'components/banner/HomeBanner3';

const Home = () => {
  return (
    <Wrapper>
      <HomeBanner1 />
      {[0, 1, 2, 3].map(idx => (
        <HomeBanner2 key={idx} gameidx={idx} />
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
