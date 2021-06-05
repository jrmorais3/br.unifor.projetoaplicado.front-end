import React from 'react';
import Loader from 'react-loader-spinner';

import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <Container>
      <Loader type="Puff" color="#46D8D5" height={100} width={40} />
    </Container>
  );
};

export default Loading;
