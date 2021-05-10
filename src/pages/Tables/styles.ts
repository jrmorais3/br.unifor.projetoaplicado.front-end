import styled, { css } from 'styled-components';

interface TableItemProps {
  available: boolean;
}

export const Main = styled.div`
  height: 100%;
  max-width: 1120px;
  overflow: auto;
  padding: 30px;

  color: #3c3c3c;
`;

export const TableContent = styled.div`
  padding: 50px;
  background: #fff;
  border-radius: 10px;
`;

export const TableContentHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin-bottom: 20px;

  svg {
    margin-right: 20px;
  }
`;

export const TablesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px 10px 0;
`;

export const TableItem = styled.div<TableItemProps>`
  margin-right: 30px;
  margin-bottom: 30px;

  transition-duration: 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  a {
    text-decoration: none;
    color: #666360;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 200px;
    height: 160px;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 10px;

    ${props =>
      props.available &&
      css`
        pointer-events: none;
      `}
  }

  header {
    display: flex;
    align-items: center;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background: #fbb1bd;
      margin-right: 15px;
      font-weight: bold;
      color: #000000;

      ${props =>
        props.available &&
        css`
          background: #46d8d5;
        `}
    }
  }

  main {
    display: flex;
    align-items: center;

    svg {
      margin-left: 5px;
      margin-right: 15px;
    }

    span {
      font-size: 14px;
    }
  }

  footer {
    display: flex;
    align-items: center;
    padding: 10px 0 0 10px;

    border-top: 1px solid #c4c4c4;
    margin-left: -10px;
    margin-right: -10px;

    img {
      width: 30px;
      height: 30px;
      margin-right: 15px;
      margin-left: 5px;
    }

    div {
      display: flex;
      flex-direction: column;
    }
  }
`;
