import React, { useCallback, useEffect, useState } from 'react';

import { Container } from './styles';

interface ToggleButtonProps {
  selected?: boolean;
  [key: string]: any;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  categoryId,
  selected = false,
  onChange,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const toggleSelected = useCallback(() => {
    setIsSelected(!isSelected);
    onChange(categoryId);
  }, [isSelected, onChange, categoryId]);

  return (
    <Container
      isActive={isSelected}
      onClick={toggleSelected}
      onChange={() => onChange(categoryId)}
    >
      <div className="dialog-button" />
    </Container>
  );
};

export default ToggleButton;
