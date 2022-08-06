import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import styled, { css } from 'styled-components';

import { gameData } from 'lib/data/gameList';
import { calcTime } from 'lib/utils/calcTime';
import { getRecord } from 'modules/users';

const MatchRecord = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const record = useSelector(state => state.users.record);

  const { page } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const nowPage = parseInt(page || '1');
  const lastPage = Math.max(Math.floor((record ? record.count + 9 : 0) / 10), 1);
  const makePageList = (start, end) => {
    let ret = [];
    if (!record || record.count === 0) {
      return [1];
    } else if (nowPage > lastPage) {
      return [lastPage];
    } else {
      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= lastPage) ret.push(i);
      }
      return ret;
    }
  };

  useEffect(() => {
    dispatch(getRecord(nowPage, null));
  }, [dispatch, nowPage]);

  return (
    <Wrapper>
      <TitleWrapper>
        <Title1>M</Title1>
        <Title2>atch</Title2>
        <Title1>R</Title1>
        <Title3>ecord</Title3>
      </TitleWrapper>
      <ContentWrapper>
        {record &&
          record.result.map(recordItem => (
            <MatchWrapper key={recordItem.num}>
              <GameWrapper>
                <MatchIcon src={gameData[recordItem.game].icon} />
                <MatchName>{gameData[recordItem.game].name}</MatchName>
              </GameWrapper>
              <DateWrapper1>{calcTime(recordItem.date)}</DateWrapper1>
              <PlayerListWrapper>
                {recordItem.players.map(recordPlayer => (
                  <div key={recordPlayer.username}>
                    <PlayerImage1 src={process.env.REACT_APP_API_IMAGE + recordPlayer.image} />
                  </div>
                ))}
              </PlayerListWrapper>
              <ResultWrapper>
                {recordItem.result.type === '1on1' ? (
                  recordItem.result.winner ? (
                    <>
                      <ResultText type={'winner'}>Winner</ResultText>
                      <PlayerImage2 src={process.env.REACT_APP_API_IMAGE + recordItem.result.winner.image} />
                    </>
                  ) : (
                    <ResultText type={'draw'}>Draw</ResultText>
                  )
                ) : recordItem.result.type === 'multi' ? (
                  <>
                    <ResultText type={'1st'}>1st</ResultText>
                    <PlayerImage2 src={process.env.REACT_APP_API_IMAGE + recordItem.result.winner.image} />
                  </>
                ) : (
                  <>
                    <ResultText type={'canceled'}>Canceled</ResultText>
                  </>
                )}
              </ResultWrapper>
              <DateWrapper2>{calcTime(recordItem.date)}</DateWrapper2>
            </MatchWrapper>
          ))}
      </ContentWrapper>
      <PageControlWrapper>
        {nowPage > 1 && record && record.count > 0 && (
          <PageControlButton to={`/match_record?page=1`} style={{ marginRight: '5px' }}>
            {`<<`}
          </PageControlButton>
        )}
        {nowPage > 1 && record && record.count > 0 && (
          <PageControlButton to={`/match_record?page=${nowPage - 1}`} style={{ marginRight: '5px' }}>
            {`<`}
          </PageControlButton>
        )}
        <PageControlNumberWrapper>
          {makePageList(nowPage - 2, nowPage + 2).map(n => (
            <PageControlNumber
              key={n}
              to={`/match_record?page=${n}`}
              style={n === nowPage ? { background: 'black', color: 'white' } : {}}
            >
              {n}
            </PageControlNumber>
          ))}
        </PageControlNumberWrapper>
        {nowPage < lastPage && record && record.count > 0 && (
          <PageControlButton to={`/match_record?page=${nowPage + 1}`} style={{ marginLeft: '5px' }}>
            {`>`}
          </PageControlButton>
        )}
        {nowPage < lastPage && record && record.count > 0 && (
          <PageControlButton to={`/match_record?page=${lastPage}`} style={{ marginLeft: '5px' }}>
            {`>>`}
          </PageControlButton>
        )}
      </PageControlWrapper>
    </Wrapper>
  );
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
  @media all and (max-width: 1400px) {
    padding: 40px 30px 50px 30px;
  }
  @media all and (max-width: 1200px) {
    padding: 40px 20px 50px 20px;
  }
  @media all and (max-width: 1150px) {
    padding: 40px 40px 50px 40px;
  }
  @media all and (max-width: 1050px) {
    padding: 40px 30px 50px 30px;
  }
  @media all and (max-width: 950px) {
    padding: 40px 20px 50px 20px;
  }
  @media all and (max-width: 420px) {
    padding: 40px 15px 50px 15px;
  }
  @media all and (max-width: 400px) {
    padding: 40px 10px 50px 10px;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  height: 85px;
  font-family: 'Hammersmith One', sans-serif;
`;
const Title1 = styled.div`
  font-size: 72px;
  @media all and (max-width: 500px) {
    font-size: 60px;
  }
  @media all and (max-width: 400px) {
    font-size: 48px;
  }
`;
const Title2 = styled.div`
  font-size: 60px;
  margin-right: 20px;
  @media all and (max-width: 500px) {
    font-size: 50px;
    margin-right: 15px;
    margin-bottom: 2px;
  }
  @media all and (max-width: 400px) {
    font-size: 40px;
    margin-right: 10px;
    margin-bottom: 1px;
  }
`;
const Title3 = styled.div`
  font-size: 60px;
  @media all and (max-width: 500px) {
    font-size: 50px;
    margin-bottom: 2px;
  }
  @media all and (max-width: 400px) {
    font-size: 40px;
    margin-bottom: 1px;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  min-height: 570px;
  margin-top: 40px;
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
const MatchWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px;
  margin-bottom: 6px;
  padding-bottom: 7px;
  border-bottom: 1px solid #c0c0c0;
`;
const GameWrapper = styled.div`
  display: flex;
`;
const MatchIcon = styled.img`
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  margin-right: 10px;
  padding: 5px;
  border-radius: 40px;
  box-shadow: 1px 1px 1px 2px;
`;
const MatchName = styled.div`
  width: 100px;
  font-size: 20px;
  font-weight: 600;
  line-height: 40px;
`;
const PlayerListWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
  @media all and (max-width: 760px) {
    margin-top: 15px;
    width: 65%;
  }
  @media all and (max-width: 550px) {
    margin-top: 10px;
    width: 100%;
  }
`;
const PlayerImage1 = styled.img`
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  margin-right: 2px;
  border-radius: 40px;
  box-shadow: 1px 1px grey;
`;
const PlayerImage2 = styled.img`
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  margin-right: 2px;
  border-radius: 40px;
  border: 1px solid #0ca1a7;
  box-shadow: 1px 1px #375758;
`;
const ResultWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 160px;
  @media all and (max-width: 760px) {
    margin-top: 15px;
    width: 35%;
  }
  @media all and (max-width: 550px) {
    margin-top: 10px;
    width: 100%;
  }
`;
const ResultText = styled.div`
  line-height: 40px;
  font-size: 17px;
  font-weight: 600;
  margin-right: 5px;
  ${props =>
    props.type === 'winner'
      ? css`
          color: #187e1b;
          margin-right: 5px;
        `
      : props.type === '1st'
      ? css`
          color: #2a2ac1;
          margin-right: 5px;
        `
      : props.type === 'draw'
      ? css`
          color: #2e2e2e;
          font-size: 18px;
        `
      : css`
          color: #d51414;
          font-size: 18px;
        `}
`;
const DateWrapper1 = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  width: 100px;
  text-align: end;
  display: none;
  @media all and (max-width: 760px) {
    width: calc(100% - 150px);
    display: block;
  }
`;
const DateWrapper2 = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  width: 100px;
  text-align: end;
  @media all and (max-width: 760px) {
    display: none;
  }
`;
const PageControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin-top: 30px;
`;
const PageControlButton = styled(Link)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  margin-top: 1px;
  cursor: pointer;
  font-family: 'Nanum Gothic Coding', monospace;
  transition: all 0.2s linear;
  color: #828282;
  &:hover {
    color: black;
  }
  @media all and (max-width: 432px) {
    width: 25px;
    height: 25px;
  }
`;
const PageControlNumberWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 5px;
`;
const PageControlNumber = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 22.5px;
  font-family: 'Lexend', sans-serif;
  width: 30px;
  height: 30px;
  margin: 0px 7.5px;
  border-radius: 15px;
  background: white;
  box-shadow: 1px 2px gray;
  transition: all 0.2s linear;
  &:hover {
    background: rgba(0, 0, 0, 0.6);
    color: white;
  }
  @media all and (max-width: 432px) {
    margin: 0 2.5px;
  }
`;
