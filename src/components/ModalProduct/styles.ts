import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 50px;
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
    margin-bottom: 30px;
  }

  div.row div {
    /* width: 250px; */
    :not(:last-child) {
      margin-right: 20px;
    }
  }

  div.label {
    margin-right: 30px;
    min-width: 75px;
  }

  button {
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

export const ImageContainer = styled.div`
  /* display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;

  img {
    width: 95px;
    height: 95px;
    object-fit: cover;
    border-radius: 20px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  label.new-image {
    height: 95px;
    width: 95px;
    background: #f5f8fa;
    border: 1px dashed #96d2f0;
    border-radius: 20px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  input[type='file'] {
    display: none;
  }
`;
