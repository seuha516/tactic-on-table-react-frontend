import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import styled from 'styled-components';

import { changeUserField, getRecord } from 'modules/users';

import { Loading } from 'components/common/Loading';
import { MatchRecordTitle } from 'components/common/Title';
import MatchRecordItem from 'components/user/MatchRecordItem';
import PageControl from 'components/common/PageControl';

const MatchRecord = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const recordData = useSelector(state => state.users.record);
  const { page } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const nowPage = parseInt(page || '1');

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Tactic On Table - Record';
    dispatch(getRecord(nowPage));
    return () => {
      htmlTitle.innerHTML = 'Tactic On Table';
      dispatch(changeUserField({ key: 'record', value: null }));
    };
  }, [dispatch, nowPage]);

  if (!recordData) {
    return <Loading />;
  } else {
    return (
      <Wrapper>
        <MatchRecordTitle />
        <ContentWrapper>
          {recordData.result.map(recordItem => (
            <MatchRecordItem key={recordItem.num} record={recordItem} />
          ))}
          {recordData.result.length === 0 && <NoDataText>No Data</NoDataText>}
        </ContentWrapper>
        <PageControl
          nowPage={nowPage}
          objCount={recordData.count}
          pageSize={10}
          url={'/match_record'}
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
  justify-content: center;
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
  @media all and (max-width: 760px) {
    padding: 40px 20px 50px 20px;
  }
  @media all and (max-width: 420px) {
    padding: 40px 15px 50px 15px;
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
  margin-bottom: 30px;
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
  height: 570px;
  text-align: center;
  font-size: 36px;
  font-family: 'Raleway', sans-serif;
  color: #646464;
  padding-top: 267px;
`;
