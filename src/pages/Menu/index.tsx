import React, { useCallback, useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

import { Container, Content } from '../../components/Container';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

import {
  Main,
  ProductContent,
  ProductContentHeader,
  ProductTable,
} from './styles';
import Tag from '../../components/Tag';
import { api } from '../../services/api';
import ModalProduct from '../../components/ModalProduct';
import DropAction from '../../components/DropAction';
import Loading from '../../components/Loading';

interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
  price: string;
  url_photo: string;
  rate: number;
  available: boolean;
  images: File[];
}

const Menu: React.FC = () => {
  const [showModalProduct, setModalProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api
      .get<Product[]>(`/product`)
      .then(response => {
        setProducts(response.data);
        setIsLoading(false);
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
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('category_id', String(product.category_id));
      formData.append('price', String(product.price));
      formData.append('rate', '5');
      formData.append(
        'url_photo',
        `http://localhost:3000/images/${images[0].name}`,
      );
      images.forEach(image => {
        formData.append('img', image);
      });

      const object = Object.fromEntries(formData);
      const data = {
        ...object,
        available: true,
      };

      const productCreated = await api.post('/product', data);
      setProducts(state => [...state, productCreated.data]);
    },
    [],
  );

  const handleDeleteItem = useCallback(
    async (product_id: number) => {
      await api.delete(`/product/${product_id}`);
      setProducts(products.filter(product => product.id !== product_id));
    },
    [products],
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
                      <Tag theme={product.available ? 'success' : 'default'}>
                        {product.available ? 'Disponível' : 'Indisponível'}
                      </Tag>
                    </td>
                    <td>
                      <DropAction
                        product_id={product.id}
                        product_name={product.name}
                        handleDeleteItem={handleDeleteItem}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </ProductTable>
            {isLoading && <Loading />}
          </ProductContent>
        </Main>
      </Content>
    </Container>
  );
};
export default Menu;
