import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageControl = ({ nowPage, objCount, pageSize, url, setPage }) => {
  const lastPage = Math.max(Math.floor((objCount + pageSize - 1) / pageSize), 1);

  const makePageList = (start, end) => {
    let ret = [];
    if (objCount === 0) {
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

  if (url) {
    return (
      <PageControlWrapper>
        {nowPage > 1 && (
          <>
            <PageControlButton to={`${url}?page=1`} style={{ marginRight: '5px' }}>
              {`<<`}
            </PageControlButton>
            <PageControlButton to={`${url}?page=${nowPage - 1}`} style={{ marginRight: '5px' }}>
              {`<`}
            </PageControlButton>
          </>
        )}
        <PageControlNumberWrapper>
          {makePageList(nowPage - 2, nowPage + 2).map(n => (
            <PageControlNumber
              key={n}
              to={`${url}?page=${n}`}
              style={n === nowPage ? { background: 'black', color: 'white' } : {}}
            >
              {n}
            </PageControlNumber>
          ))}
        </PageControlNumberWrapper>
        {nowPage < lastPage && (
          <>
            <PageControlButton to={`${url}?page=${nowPage + 1}`} style={{ marginLeft: '5px' }}>
              {`>`}
            </PageControlButton>
            <PageControlButton to={`${url}?page=${lastPage}`} style={{ marginLeft: '5px' }}>
              {`>>`}
            </PageControlButton>
          </>
        )}
      </PageControlWrapper>
    );
  } else {
    return (
      <PageControlWrapper>
        {nowPage > 1 && (
          <>
            <PageControlButtonDiv onClick={() => setPage(1)} style={{ marginRight: '5px' }}>
              {`<<`}
            </PageControlButtonDiv>
            <PageControlButtonDiv
              onClick={() => setPage(nowPage - 1)}
              style={{ marginRight: '5px' }}
            >
              {`<`}
            </PageControlButtonDiv>
          </>
        )}
        <PageControlNumberWrapper>
          {makePageList(nowPage - 2, nowPage + 2).map(n => (
            <PageControlNumberDiv
              key={n}
              onClick={() => setPage(n)}
              style={n === nowPage ? { background: 'black', color: 'white' } : {}}
            >
              {n}
            </PageControlNumberDiv>
          ))}
        </PageControlNumberWrapper>
        {nowPage < lastPage && (
          <>
            <PageControlButtonDiv
              onClick={() => setPage(nowPage + 1)}
              style={{ marginLeft: '5px' }}
            >
              {`>`}
            </PageControlButtonDiv>
            <PageControlButtonDiv onClick={() => setPage(lastPage)} style={{ marginLeft: '5px' }}>
              {`>>`}
            </PageControlButtonDiv>
          </>
        )}
      </PageControlWrapper>
    );
  }
};

export default PageControl;

const PageControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
`;
const PageControlButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-top: 1px;
  font-size: 25px;
  font-family: 'Nanum Gothic Coding', monospace;
  color: #828282;
  transition: all 0.2s linear;
  cursor: pointer;
  &:hover {
    color: black;
  }
  @media all and (max-width: 430px) {
    width: 25px;
    height: 25px;
  }
`;
const PageControlButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-top: 1px;
  font-size: 25px;
  font-family: 'Nanum Gothic Coding', monospace;
  color: #828282;
  transition: all 0.2s linear;
  cursor: pointer;
  &:hover {
    color: black;
  }
  @media all and (max-width: 430px) {
    width: 25px;
    height: 25px;
  }
`;
const PageControlNumberWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 5px;
`;
const PageControlNumber = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22.5px;
  font-family: 'Lexend', sans-serif;
  cursor: pointer;
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
  @media all and (max-width: 430px) {
    margin: 0 2.5px;
  }
`;
const PageControlNumberDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22.5px;
  font-family: 'Lexend', sans-serif;
  cursor: pointer;
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
  @media all and (max-width: 430px) {
    margin: 0 2.5px;
  }
`;
