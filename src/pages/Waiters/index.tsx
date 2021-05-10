import React, { useEffect, useState } from 'react';

import { FiEdit } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { Container, Content } from '../../components/Container';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

import waiterImage from '../../assets/user.svg';

import { Main, WaitersContent } from './styles';
import Loading from '../../components/Loading';
import { api } from '../../services/api';

interface Waiter {
  id: number;
  name: string;
  login: string;
  phone_number: string;
  url_photo: string;
  active: boolean;
}

const Waiters: React.FC = () => {
  const [waiters, setWaiters] = useState<Waiter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get<Waiter[]>('/waiters')
      .then(response => {
        setWaiters(response.data);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1 className="pageTitle">Configurações</h1>
        </Header>
        <Main>
          <WaitersContent>
            <header>
              <Link to="/settings/waiters/create">Novo</Link>
              <input
                type="text"
                className="search-bar"
                placeholder="Pesquisar"
              />
            </header>
            <table>
              <thead>
                <tr>
                  <th className="centered">FOTO</th>
                  <th>NOME</th>
                  <th>LOGIN</th>
                  <th className="centered">TELEFONE</th>
                  <th className="centered">STATUS</th>
                  <th className="centered">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {waiters &&
                  waiters.map(waiter => (
                    <tr key={waiter.id}>
                      <td className="centered">
                        <img
                          src={
                            waiter.url_photo ? waiter.url_photo : waiterImage
                          }
                          className="waiterImage"
                          alt="waiter"
                        />
                      </td>
                      <td>{waiter.name}</td>
                      <td>{waiter.login}</td>
                      <td className="centered">{waiter.phone_number}</td>
                      <td className="centered">
                        {waiter.active ? 'Ativo' : 'Inativo'}
                      </td>
                      <td className="centered">
                        <Link to={`/settings/waiters/${waiter.id}`}>
                          <FiEdit size={28} />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {isLoading && <Loading />}
          </WaitersContent>
        </Main>
      </Content>
    </Container>
  );
};
export default Waiters;
