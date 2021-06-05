import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory, useParams } from 'react-router-dom';

import { FiCamera } from 'react-icons/fi';
import { TiArrowLeftThick } from 'react-icons/ti';

import { Container, Content } from '../../components/Container';
import { Main, WaiterCreateContainer, Form, ImageContainer } from './styles';

import getValidationErros from '../../utils/getValidationErros';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { api } from '../../services/api';
import ToggleButton from '../../components/ToggleButton';

interface Waiter {
  id: number;
  name: string;
  login: string;
  phone_number: string;
  url_photo: string;
  active: boolean;
}

interface WaitersEditParams {
  id: string;
}

const WaitersEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const params = useParams<WaitersEditParams>();
  const history = useHistory();

  const [waiter, setWaiter] = useState<Waiter>({} as Waiter);
  const [waiterIsActive, setWaiterIsActive] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  useEffect(() => {
    api
      .get<Waiter>(`/waiters/form/${params.id}`)
      .then(response => {
        const waiterData = response.data;
        setWaiter(waiterData);
        setWaiterIsActive(waiterData.active);
        setPreviewImage(waiterData.url_photo);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, [params.id]);

  const handleActivateWaiter = useCallback(() => {
    setWaiterIsActive(!waiterIsActive);
  }, [waiterIsActive]);

  const handleSubmit = useCallback(
    async (data: Waiter) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do garçom é obrigatório'),
          login: Yup.string().required('Login é obrigatória'),
          phone_number: Yup.string().required('Telefone é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('login', data.login);
        formData.append('phone_number', data.phone_number);
        formData.append('active', waiterIsActive.toString());
        if (image) {
          formData.append('img', image);
        } else {
          formData.append('url_photo', previewImage);
        }

        const object = Object.fromEntries(formData);
        const prepared = {
          ...object,
          active: waiterIsActive,
        };

        await api.put(`/waiters/${params.id}`, formData);
        history.push('/settings/waiters');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [image, history, waiterIsActive, params.id, previewImage],
  );

  const handleSelectImages = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      setImage(event.target.files[0]);

      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    },
    [],
  );

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1 className="pageTitle">Garçom | Editar</h1>
        </Header>
        <Main>
          <WaiterCreateContainer>
            <div className="linkBackPage">
              <Link to="/settings/waiters">
                <TiArrowLeftThick size={25} />
                <span>Voltar</span>
              </Link>
            </div>
            {waiter && (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <div className="row">
                  <div className="label">Fotos:</div>
                  <ImageContainer title="Clique para alterar">
                    <label htmlFor="image" className="new-image">
                      {previewImage ? (
                        <img src={previewImage} alt="ImageName" />
                      ) : (
                        <FiCamera />
                      )}
                      <input
                        name="image"
                        type="file"
                        id="image"
                        onChange={handleSelectImages}
                      />
                    </label>
                  </ImageContainer>
                </div>
                <div className="row">
                  <div className="label">Nome:</div>
                  <Input
                    name="name"
                    placeholder="Nome do Garçom"
                    defaultValue={waiter.name}
                  />
                </div>

                <div className="row">
                  <div className="label">Login:</div>
                  <Input
                    name="login"
                    placeholder="Login"
                    defaultValue={waiter.login}
                  />
                </div>

                <div className="row">
                  <div className="label">Celular:</div>
                  <Input
                    mask="phone"
                    name="phone_number"
                    placeholder="Telefone Celular"
                    defaultValue={waiter.phone_number}
                  />
                </div>

                <div className="row">
                  <div className="label">Ativo:</div>
                  <ToggleButton
                    selected={waiter.active}
                    onChange={handleActivateWaiter}
                  />
                </div>

                <button type="submit" data-test-id="add-waiter-button">
                  <p className="text">Salvar Alterações</p>
                </button>
              </Form>
            )}
          </WaiterCreateContainer>
        </Main>
      </Content>
    </Container>
  );
};

export default WaitersEdit;
