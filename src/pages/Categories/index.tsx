import React, { useCallback, useEffect, useState } from 'react';

import { Container, Content } from '../../components/Container';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import ToggleButton from '../../components/ToggleButton';
import Loading from '../../components/Loading';

import { api } from '../../services/api';

import {
  Main,
  CategoryContent,
  CategoryContentHeader,
  CategoriesTable,
} from './styles';
import ModalCategory from '../../components/ModalCategory';

interface Category {
  id: number;
  description: string;
  status: boolean;
}

const Categories: React.FC = () => {
  const [showModalCategory, setModalCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api
      .get<Category[]>(`/category`)
      .then(response => {
        const categoriesArray = response.data;
        setCategories(categoriesArray);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, []);

  const toggleModalCategory = useCallback(() => {
    setModalCategory(!showModalCategory);
  }, [showModalCategory]);

  const handleCategory = useCallback(
    async (category: Omit<Category, 'id'>) => {
      const response = await api.post('/category', {
        ...category,
        status: true,
      });
      setCategories([...categories, response.data]);
    },
    [categories],
  );

  const updateStatus = useCallback(
    async (id: number) => {
      try {
        const categoryFound = categories.find(category => category.id === id);
        if (!categoryFound) return;

        const response = await api.put(`category/${id}`, {
          ...categoryFound,
          status: !categoryFound.status,
        });

        const editedCategory = response.data;
        setCategories(
          categories.map(mappedCategory =>
            mappedCategory.id === editedCategory.id
              ? { ...editedCategory }
              : mappedCategory,
          ),
        );
      } catch (error) {
        console.log(error);
      }
    },
    [categories],
  );

  return (
    <Container>
      <Sidebar />
      <ModalCategory
        isOpen={showModalCategory}
        setIsOpen={toggleModalCategory}
        handleCategory={handleCategory}
      />
      <Content>
        <Header>
          <h1 className="pageTitle">Categorias</h1>
        </Header>
        <Main>
          <CategoryContent>
            <CategoryContentHeader>
              <button type="button" onClick={toggleModalCategory}>
                Nova Categoria
              </button>
              <input
                type="text"
                className="search-bar"
                placeholder="Pesquisar"
              />
            </CategoryContentHeader>
            <CategoriesTable>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DESCRIÇÃO</th>
                  <th>ATIVO</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.description}</td>
                    <td>
                      <ToggleButton
                        categoryId={category.id}
                        selected={category.status}
                        onChange={updateStatus}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </CategoriesTable>
            {isLoading && <Loading />}
          </CategoryContent>
        </Main>
      </Content>
    </Container>
  );
};

export default Categories;
