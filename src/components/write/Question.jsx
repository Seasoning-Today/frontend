import React, { useState } from 'react';
import styled from 'styled-components';

const SeasonQuestion = styled.div`
  width: 100%;

  display: flex;
  column-gap: 0.88rem;

  color: #8e8c86;
  text-align: justify;

  font-family: 'Apple SD Gothic Neo';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  .write__question__aside {
    min-width: 0.125rem;
    height: 100%;

    background-color: #919191;
  }
`;

const Question = ({ text }) => {
  return (
    <SeasonQuestion>
      <div className="write__question__aside" />
      {text}
    </SeasonQuestion>
  );
};

export default Question;
