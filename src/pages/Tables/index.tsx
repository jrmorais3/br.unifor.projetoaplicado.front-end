import React, { useEffect, useState } from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { BsClockHistory } from 'react-icons/bs';
import { GoTasklist } from 'react-icons/go';
import { BiLoaderCircle } from 'react-icons/bi';
import { IoFastFoodOutline } from 'react-icons/io5';

import { Link } from 'react-router-dom';
import { Container, Content } from '../../components/Container';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

import waiterLogo from '../../assets/waiter.svg';

import {
  Main,
  TableContent,
  TableContentHeader,
  TablesContainer,
  TableItem,
} from './styles';

import { api } from '../../services/api';
import Loading from '../../components/Loading';

const icons = {
  'Aguardando Pedido': <BsClockHistory size={28} />,
  'Aceito [fila]': <GoTasklist size={28} />,
  'Em Preparação': <BiLoaderCircle size={28} />,
  Entregue: <IoFastFoodOutline size={28} />,
};

interface ItemOrder {
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  number: number;
  status: string;
  items: ItemOrder[];
}

interface Table {
  id: number;
  number: string;
  available: boolean;
  waiter: string;
  order_table: Order;
}

const Tables: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get<Table[]>(`/table`)
      .then(response => {
        setTables(response.data);
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
          <h1 className="pageTitle">Mesas</h1>
        </Header>
        <Main>
          <TableContent>
            <TableContentHeader>
              <AiOutlineFileSearch size={30} />
              <h3>Clique em uma mesa para detalhar</h3>
            </TableContentHeader>
            <TablesContainer>
              {tables.map(table => (
                <TableItem key={table.id} available={table.available}>
                  <Link to={`/tables/${table.id}`}>
                    <header>
                      <span>{table.number}</span>
                      <h4>{table.available ? 'Livre' : 'Ocupada'}</h4>
                    </header>
                    <main>
                      {table.order_table && (
                        <>
                          {icons[table.order_table.status]}
                          <span>{table.order_table.status}</span>
                        </>
                      )}
                    </main>
                    <footer>
                      <img src={waiterLogo} alt="waiterLogo" />
                      <div>
                        <small>Garçom:</small>
                        <span>{table.waiter ? table.waiter : '-'}</span>
                      </div>
                    </footer>
                  </Link>
                </TableItem>
              ))}
            </TablesContainer>
            {isLoading && <Loading />}
          </TableContent>
        </Main>
      </Content>
    </Container>
  );
};

export default Tables;
