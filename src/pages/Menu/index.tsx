import React, { useCallback, useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

import { BiDotsVertical } from 'react-icons/bi';
import { Container, Content, Main } from '../../components/Container';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

import { ProductContent, ProductContentHeader, ProductTable } from './styles';
import Tag from '../../components/Tag';
import { api } from '../../services/api';

const statusStyle = {
  '1': 'success',
  '2': 'info',
  '3': 'warning',
};

const statusDescription = {
  '1': 'Disponível',
  '2': 'Estoque Baixo',
  '3': 'Indisponível',
};

interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
  price: string;
  url_photo: string;
  rate: number;
  status: number;
}

const Menu: React.FC = () => {
  const [showModalCategory, setModalCategory] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api
      .get<Product[]>(`/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, []);

  const toggleModalCategory = useCallback(() => {
    setModalCategory(!showModalCategory);
  }, [showModalCategory]);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1 className="pageTitle">Menu</h1>
        </Header>
        <Main>
          <ProductContent>
            <ProductContentHeader>
              <button type="button" onClick={toggleModalCategory}>
                Nova Item
              </button>
              <input
                type="text"
                className="search-bar"
                placeholder="Pesquisar"
              />
            </ProductContentHeader>
            <ProductTable>
              <thead>
                <tr>
                  <th>FOTO</th>
                  <th>NOME/DESCRIÇÃO</th>
                  <th>CLASSIFICAÇÃO</th>
                  <th>PREÇO ATUAL</th>
                  <th colSpan={2}>SITUAÇÃO</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <img
                        className="productImage"
                        src={product.url_photo}
                        alt="ProductImage"
                      />
                    </td>
                    <td>
                      <strong>{product.name}</strong>
                      <p>{product.description}</p>
                    </td>
                    <td>
                      <AiFillStar className="gold" />
                      <AiFillStar className="gold" />
                      <AiFillStar className="gold" />
                      <AiFillStar className="gold" />
                      <AiFillStar className="grey" />
                      {/* <AiOutlineStar /> */}
                    </td>
                    <td>{product.price}</td>
                    <td>
                      <Tag theme={statusStyle[product.status] || 'default'}>
                        {statusDescription[product.status]}
                      </Tag>
                    </td>
                    <td>
                      <button
                        className="productActions"
                        type="button"
                        title="Ações"
                      >
                        <BiDotsVertical size={30} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </ProductTable>
          </ProductContent>
        </Main>
      </Content>
    </Container>
  );
};
export default Menu;
