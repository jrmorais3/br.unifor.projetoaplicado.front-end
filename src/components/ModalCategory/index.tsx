import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from './styles';

import Modal from '../Modal';
import Input from '../Input';

import getValidationErros from '../../utils/getValidationErros';

interface Category {
  id: number;
  name: string;
  status: boolean;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleCategory: (ategory: Omit<Category, 'id'>) => void;
}

const ModalCategory: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleCategory,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: Category) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome da Categoria é Obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        handleCategory(data);
        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleCategory, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} width="712px">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Categoria</h1>
        <div className="row">
          <Input name="name" placeholder="Nome da Categoria" />
        </div>

        <button type="submit" data-testid="add-category-button">
          <p className="text">Salvar</p>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalCategory;
