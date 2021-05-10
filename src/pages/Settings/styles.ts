import styled from 'styled-components';

export const Main = styled.div`
  height: 100%;
  /* max-width: 1120px; */
  overflow: auto;
  padding: 30px;

  color: #3c3c3c;
`;

export const SettingsContainer = styled.div`
  padding: 50px;
  background: #fff;
  border-radius: 10px;

  height: 100%;
  min-height: 780px;
`;

export const CardsContainer = styled.div`
  padding: 50px 25px;
`;

export const CardConfig = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  padding: 10px;
  width: 340px;
  height: 150px;

  border: 1px solid #a3a3a3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  transition-duration: 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  a {
    width: 340px;
    height: 150px;
    text-decoration: none;

    display: flex;
    justify-content: start;
    align-items: center;

    color: #3c3c3c;
  }

  img {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }

  div.cardContent {
    display: flex;
    flex-direction: column;

    h2 {
      line-height: 30px;
      margin-bottom: 10px;
    }
  }
`;
