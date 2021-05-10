import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Content } from '../../components/Container';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

import waiter from '../../assets/waiter.svg';

import { Main, SettingsContainer, CardsContainer, CardConfig } from './styles';

const Settings: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1 className="pageTitle">Configurações</h1>
        </Header>
        <Main>
          <SettingsContainer>
            <header>
              <h1>Configurações do Estabelecimento</h1>
            </header>
            <CardsContainer>
              <CardConfig>
                <Link to="/settings/waiters">
                  <img src={waiter} alt="waiter" />
                  <div className="cardContent">
                    <h2>Garçons</h2>
                    <p>Adicione e gerencie sua equipe de garçons</p>
                  </div>
                </Link>
              </CardConfig>
            </CardsContainer>
          </SettingsContainer>
        </Main>
      </Content>
    </Container>
  );
};
export default Settings;
