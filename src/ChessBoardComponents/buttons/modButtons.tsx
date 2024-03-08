import * as React from 'react';
import { VariantProp } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Stack from '@mui/joy/Stack';

export default function ButtonGroupColors() {
  const [variant, setVariant] = React.useState<VariantProp>('soft');
  const createOnClick = (value: VariantProp) => () => {
    setVariant(value);
  };
  return (
    <Stack spacing={1}>
      <ButtonGroup
        variant={variant}
        size="lg"
        color="primary"
        aria-label="primary button group"
      >
        <Button onClick={createOnClick('soft')}>1+0</Button>
        <Button onClick={createOnClick('soft')}>2+1</Button>
        <Button onClick={createOnClick('soft')}>3+0</Button>
  
      </ButtonGroup>
      <ButtonGroup
        variant={variant}
        size="lg"
        color="danger"
        aria-label="danger button group"
      >
        <Button onClick={createOnClick('soft')}>3+2</Button>
        <Button onClick={createOnClick('soft')}>5+0</Button>
        <Button onClick={createOnClick('soft')}>5+3</Button>
      </ButtonGroup>
      <ButtonGroup
        variant={variant}
        size="lg"
        color="success"
        aria-label="success button group"
      >
        <Button onClick={createOnClick('soft')}>10+0</Button>
        <Button onClick={createOnClick('soft')}>10+5</Button>
        <Button onClick={createOnClick('soft')}>15+10</Button>
      </ButtonGroup>
      <ButtonGroup
        variant={variant}
        size="lg"
        color="warning"
        aria-label="warning button group"
      >
        <Button onClick={createOnClick('soft')}>30+0</Button>
        <Button onClick={createOnClick('soft')}>30+20</Button>
        <Button onClick={createOnClick('soft')}>45+0</Button>
      </ButtonGroup>
    </Stack>
  );
}