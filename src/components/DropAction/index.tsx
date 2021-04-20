/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useRef, useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { BiDotsVertical } from 'react-icons/bi';

import { OutSideClick } from '../../hooks/outSideClick';

import { Container, DropActionContent } from './styles';

interface OcorrenciaProps {
  ocorrenciaId: number;
  finalizada: boolean;
}

interface DropActionProps {
  [key: string]: any;
}

const DropAction: React.FC<DropActionProps> = ({ product_id }) => {
  const btnActionDropRef = useRef<HTMLButtonElement>(null);
  const [positionContent, setPositionContent] = useState(0);
  const { visible, setVisible, ref } = OutSideClick(false);

  const handleClickButton = useCallback(() => {
    if (btnActionDropRef.current) {
      setPositionContent(btnActionDropRef.current.getBoundingClientRect().top);
    }
    setVisible(prevState => !prevState);
  }, [setVisible]);

  return (
    <Container ref={ref}>
      <button
        ref={btnActionDropRef}
        className="openDropAction"
        type="button"
        onClick={handleClickButton}
      >
        <BiDotsVertical size={30} />
      </button>
      {visible && (
        <DropActionContent position={positionContent}>
          <>
            <span className="dropTitle">Ações:</span>
            <button className="btnDropAction" type="button">
              <FaEdit className="drop" />
              Editar
            </button>
            <button className="btnDropAction" type="button">
              <FaTrashAlt className="drop delete" />
              Excluir
            </button>
          </>
        </DropActionContent>
      )}
    </Container>
  );
};

export default DropAction;
