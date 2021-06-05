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
import { OptionsType, OptionTypeBase } from 'react-select';

import { FiPlus } from 'react-icons/fi';
import { TiArrowLeftThick } from 'react-icons/ti';

import { Container, Content } from '../../components/Container';
import { Main, ProductContainer, Form, ImageContainer } from './styles';

import getValidationErros from '../../utils/getValidationErros';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import { api } from '../../services/api';
import ToggleButton from '../../components/ToggleButton';

const selectCustomStyles = {
  container: base => ({
    ...base,
    flex: 1,
  }),
};

interface Product {
  id: number;
  name: string;
  description: string;
  CATEGORIEId: number;
  price: string;
  url_photo: string;
  rate: number;
  available: boolean;
  images: File[];
}

interface Category {
  id: number;
  description: string;
}

interface ProductParams {
  id: string;
}

const Product: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const params = useParams<ProductParams>();
  const history = useHistory();
  const [product, setProduct] = useState<Product>({} as Product);
  const [productAvailability, setProductAvailability] = useState(false);

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [categoryOptions, setCategoryOptions] = useState<
    OptionsType<OptionTypeBase>
  >([]);

  useEffect(() => {
    Promise.all([
      api.get<Category[]>(`/category`),
      api.get<Product>(`product/form/${params.id}`),
    ])
      .then(response => {
        const [categories, productData] = response;

        setCategoryOptions(
          categories.data.map((opt: Category) => {
            return { value: opt.id, label: opt.description };
          }),
        );

        const dataProd = productData.data;
        setProduct(dataProd);
        setProductAvailability(dataProd.available);
        setPreviewImages([dataProd.url_photo]);

        const selected = categories.data.find(opt => {
          return opt.id === Number(dataProd.CATEGORIEId);
        });
        formRef.current?.setFieldValue('CATEGORIEId', {
          value: selected?.id,
          label: selected?.description,
        });
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, [params.id]);

  const updateAvailability = useCallback(() => {
    setProductAvailability(!productAvailability);
  }, [productAvailability]);

  const handleSubmit = useCallback(
    async (data: Omit<Product, 'id'>) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do produto é obrigatório'),
          CATEGORIEId: Yup.string().required('Categoria é obrigatória'),
          price: Yup.string().required('Preço é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('CATEGORIEId', String(data.CATEGORIEId));
        formData.append('price', String(data.price));
        formData.append('available', productAvailability.toString());
        if (images.length > 0) {
          formData.append(
            'url_photo',
            `http://localhost:3000/images/${images[0].name}`,
          );
          images.forEach(image => {
            formData.append('img', image);
          });
        } else {
          formData.append('url_photo', previewImages[0]);
        }

        const object = Object.fromEntries(formData);
        const edited = {
          ...object,
          available: productAvailability,
        };

        await api.put(`/product/${params.id}`, formData);
        history.push('/menu');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [history, images, params, previewImages, productAvailability],
  );

  const handleSelectImages = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      const selectedImages = Array.from(event.target.files);
      setImages(selectedImages);

      const selectedImagesPreview = selectedImages.map(image => {
        return URL.createObjectURL(image);
      });

      setPreviewImages(selectedImagesPreview);
    },
    [],
  );

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <h1 className="pageTitle">Produto | Editar</h1>
        </Header>
        <Main>
          <ProductContainer>
            <div className="linkBackPage">
              <Link to="/menu">
                <TiArrowLeftThick size={25} />
                <span>Voltar</span>
              </Link>
            </div>
            {product && (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <div className="row">
                  <div className="label">Fotos:</div>
                  <ImageContainer>
                    {previewImages.map(image => {
                      return <img key={image} src={image} alt="ImageName" />;
                    })}

                    <label htmlFor="image[]" className="new-image">
                      <FiPlus size={24} color="#15b6d6" />
                      <input
                        name="images"
                        multiple
                        onChange={handleSelectImages}
                        type="file"
                        id="image[]"
                      />
                    </label>
                  </ImageContainer>
                </div>

                <div className="row">
                  <div className="label">Nome:</div>
                  <Input
                    name="name"
                    placeholder="Nome do Produto"
                    defaultValue={product.name}
                  />
                </div>

                <div className="row">
                  <div className="label">Descrição:</div>
                  <TextArea
                    name="description"
                    placeholder="Descrição"
                    defaultValue={product.description}
                  />
                </div>

                <div className="row">
                  <div className="label">Categoria:</div>
                  <Select
                    name="CATEGORIEId"
                    options={categoryOptions}
                    styles={selectCustomStyles}
                    menuPlacement="auto"
                    placeholder="Selecione a categoria..."
                  />
                </div>

                <div className="row">
                  <div className="label">Preço:</div>
                  <Input
                    mask="currency"
                    name="price"
                    placeholder="Informe o preço unitário"
                    defaultValue={product.price}
                  />
                </div>

                <div className="row">
                  <div className="label">Disponível:</div>
                  <ToggleButton
                    selected={product.available}
                    onChange={updateAvailability}
                  />
                </div>

                <button type="submit" data-test-id="add-product-button">
                  <p className="text">Salvar Alterações</p>
                </button>
              </Form>
            )}
          </ProductContainer>
        </Main>
      </Content>
    </Container>
  );
};

export default Product;
