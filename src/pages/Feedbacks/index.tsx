import React from 'react';

import { Container, Content } from '../../components/Container';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

import { Main } from './styles';

const Feedbacks: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1 className="pageTitle">Feedbacks</h1>
        </Header>
        <Main />
      </Content>
    </Container>
  );
};
export default Feedbacks;
