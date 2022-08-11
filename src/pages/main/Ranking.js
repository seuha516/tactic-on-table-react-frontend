import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import styled from 'styled-components';

import { GAME_LIST } from 'lib/data/gameData';
import { changeField, getRanking } from 'modules/users';

import { Loading } from 'components/common/Loading';
import { RankingTitle } from 'components/common/Title';
import RankingItem from 'components/user/RankingItem';
import PageControl from 'components/common/PageControl';

const MatchRecord = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const rankingData = useSelector(state => state.users.ranking);
  const { page } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const nowPage = parseInt(page || '1');

  useEffect(() => {
    dispatch(getRanking(nowPage));
    return () => {
      dispatch(changeField({ key: 'ranking', value: null }));
    };
  }, [dispatch, nowPage]);

  if (!rankingData) {
    return <Loading />;
  } else {
    return (
      <Wrapper>
        <RankingTitle />
        <ContentWrapper>
          <CategoryWrapper>
            <CategoryUserInfoWrapper>
              <CategoryRankText>Rank</CategoryRankText>
              <CategoryNameText>Name</CategoryNameText>
            </CategoryUserInfoWrapper>
            <CategoryWinsWrapper>
              <CategoryTotalWinsText>Total Wins</CategoryTotalWinsText>
              {GAME_LIST.map(gameItem => (
                <CategoryGameIcon key={gameItem.name} src={gameItem.icon} />
              ))}
            </CategoryWinsWrapper>
          </CategoryWrapper>
          {rankingData.result.map((rankingItem, idx) => (
            <RankingItem key={idx} ranking={rankingItem} rank={idx + 10 * nowPage - 9} />
          ))}
          {rankingData.result.length === 0 && <NoDataText>No Data</NoDataText>}
        </ContentWrapper>
        <PageControl
          nowPage={nowPage}
          objCount={rankingData.count}
          pageSize={10}
          url={'/ranking'}
        />
      </Wrapper>
    );
  }
};

export default MatchRecord;

const Wrapper = styled.div`
  background-color: whitesmoke;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  padding: 40px 40px 50px 40px;
  @media all and (max-width: 1200px) {
    padding: 40px 30px 50px 30px;
  }
  @media all and (max-width: 1000px) {
    padding: 40px 20px 50px 20px;
  }
  @media all and (max-width: 800px) {
    padding: 40px 15px 50px 15px;
  }
  @media all and (max-width: 730px) {
    padding: 40px 20px 50px 20px;
  }
  @media all and (max-width: 500px) {
    padding: 40px 15px 50px 15px;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  min-height: 565px;
  margin: 40px 0 35px 0;
  animation: appear 0.5s ease-out;
  font-family: 'Raleway', sans-serif;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const NoDataText = styled.div`
  width: 100%;
  height: 510px;
  text-align: center;
  font-size: 36px;
  font-family: 'Raleway', sans-serif;
  color: #646464;
  padding-top: 237px;
`;
const CategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  min-height: 50px;
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #c0c0c0;
`;
const CategoryUserInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CategoryRankText = styled.div`
  width: 60px;
  margin-right: 20px;
`;
const CategoryNameText = styled.div`
  width: 250px;
`;
const CategoryWinsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 330px);
  @media all and (max-width: 730px) {
    width: 100%;
    margin-top: 15px;
  }
`;
const CategoryTotalWinsText = styled.div`
  width: 150px;
  text-align: center;
  @media all and (max-width: 730px) {
    text-align: start;
    max-width: 200px;
    width: 40%;
  }
  @media all and (max-width: 375px) {
    width: 80px;
    font-size: 21px;
    padding-left: 2px;
  }
`;
const CategoryGameIcon = styled.img`
  width: 36px;
  height: 36px;
  margin: 0 7px;
`;
