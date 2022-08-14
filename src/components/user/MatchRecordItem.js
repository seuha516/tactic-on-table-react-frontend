import React from 'react';
import styled from 'styled-components';

import { GAME_LIST } from 'lib/data/gameData';
import { calcTime } from 'lib/utils/calcTime';

import UserIcon from 'components/user/UserIcon';
import MatchResult from 'components/user/MatchResult';

const MatchRecordItem = ({ record }) => {
  return (
    <Wrapper>
      <GameWrapper>
        <MatchIcon src={GAME_LIST[record.game].icon} />
        <MatchName>{GAME_LIST[record.game].name}</MatchName>
      </GameWrapper>
      <DateWrapper1>{calcTime(record.date)}</DateWrapper1>
      <PlayerListWrapper>
        {record.players.map(recordPlayer => (
          <UserIcon key={recordPlayer.username} user={recordPlayer} size="40px" />
        ))}
      </PlayerListWrapper>
      <MatchResult result={record.result} />
      <DateWrapper2>{calcTime(record.date)}</DateWrapper2>
    </Wrapper>
  );
};

export default MatchRecordItem;

const Wrapper = styled.div`
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
