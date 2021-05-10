import styled from 'styled-components';
import { shade } from 'polished';

export const Main = styled.div`
  height: 100%;
  max-width: 1120px;
  overflow: auto;
  padding: 30px;

  color: #3c3c3c;
`;

export const TableDetailsContent = styled.div`
  padding: 50px;
  background: #fff;
  border-radius: 10px;

  div.linkBackPage {
    padding: 20px 0;
    margin-bottom: 30px;

    a {
      display: flex;
      align-items: center;

      color: #3c3c3c;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.2s;

      svg {
        margin-right: 5px;
      }

      span {
        margin-top: 2px;
      }

      &:hover {
        color: ${shade(0.2, '#ff365f')};
      }
    }
  }
`;

export const TableDetailsContentHeader = styled.header`
  display: flex;
  align-items: center;

  margin-bottom: 50px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 80px;
    height: 80px;

    border-radius: 40px;
    background: #fbb1bd;

    margin-right: 15px;

    font-size: 22px;
    font-weight: bold;
    color: #000000;
  }
`;

export const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    flex: 1;

    margin-bottom: 30px;

    h2 {
      color: #666360;
      span {
        margin-right: 10px;
      }
      margin-right: 40px;
    }
  }

  h1 {
    margin-bottom: 20px;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 100%;
    max-width: 790px;

    padding-right: 50px;

    h2 {
      margin-right: 50px;
    }

    span {
      font-weight: bold;
      font-size: 21px;
    }
  }
`;

export const OrderTable = styled.table`
  width: 100%;
  max-width: 790px;

  border-collapse: collapse;
  border-spacing: 0;

  margin-bottom: 30px;

  thead {
    border-bottom: 1px solid #acacac;
  }

  th {
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  th.description {
    text-align: left;
  }

  td {
    white-space: normal;
    text-align: center;
    height: 45px;
    padding: 5px;
    font-size: 14px;
  }

  td.description {
    text-align: left;
  }
`;
