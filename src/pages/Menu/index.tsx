import React, { useCallback, useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

import { BiDotsVertical } from 'react-icons/bi';
import { Container, Content, Main } from '../../components/Container';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

import { ProductContent, ProductContentHeader, ProductTable } from './styles';
import Tag from '../../components/Tag';
import { api } from '../../services/api';
import ModalProduct from '../../components/ModalProduct';

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
  images: File[];
}

const Menu: React.FC = () => {
  const [showModalProduct, setModalProduct] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api
      .get<Product[]>(`/product`)
      .then(response => {
        setProducts(response.data);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, []);

  const toggleModalProduct = useCallback(() => {
    setModalProduct(!showModalProduct);
  }, [showModalProduct]);

  const handleProduct = useCallback(
    async (product: Omit<Product, 'id'>, images: File[]) => {
      /**
       * **** Somente em densenvolvimento *****************
       */
      //  const img = {};
      //  images.forEach((image, index) => {
      //  img[index] = image.name;
      //  });
      console.log(images);
      const data = new FormData();
      data.append('name', product.name);
      data.append('description', product.description);
      data.append('category_id', String(product.category_id));
      data.append('price', String(product.price));
      data.append('rate', '5');
      data.append('status', '1');
      images.forEach(image => {
        data.append('img', image);
      });

      const productCreated = await api.post('/product', data);
      setProducts(state => [...state, productCreated.data]);

      // **************************************************

      /**
       * Quando integrar com o back:
       */
      // const data = {
      //   ...product,
      //   images,
      //   rate: 5,
      //   status: 2,
      // };
      // const productCreated = await api.post('/products', data);
      // setProducts(state => [...state, productCreated.data]);
    },
    [],
  );

  return (
    <Container>
      <Sidebar />
      <ModalProduct
        isOpen={showModalProduct}
        setIsOpen={toggleModalProduct}
        handleProduct={handleProduct}
      />
      <Content>
        <Header>
          <h1 className="pageTitle">Itens do Cardápio</h1>
        </Header>
        <Main>
          <ProductContent>
            <ProductContentHeader>
              <button type="button" onClick={toggleModalProduct}>
                Novo Item
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
                        src={
                          product.url_photo
                            ? product.url_photo
                            : 'images/default.jpeg'
                        }
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
