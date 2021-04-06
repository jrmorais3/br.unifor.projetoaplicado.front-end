import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 48px 60px;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }

  div {
    margin-top: 0px;
  }

  div.control {
    display: flex;
  }

  div.control > div {
    width: 250px;
    :not(:last-child) {
      margin-right: 20px;
    }
  }

  div.row {
    display: flex;
  }

  div.row div {
    /* width: 250px; */
    :not(:last-child) {
      margin-right: 20px;
    }
  }

  button {
    margin-top: 48px;
    align-self: flex-end;
  }

  button {
    display: flex;
    height: 40px;
    width: 178px;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: #02c697;
    border: 0;
    border-radius: 20px;
    text-decoration: none;

    .text {
      padding: 16px 24px;
      font-weight: bold;
    }
  }

  .logoErrorInput {
    margin-left: 5px;
  }
`;
