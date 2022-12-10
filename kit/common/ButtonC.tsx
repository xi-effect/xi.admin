import { Button, ButtonProps } from '@mui/material';

const ButtonC = (props: ButtonProps) => {
  const { children, sx, ...restP } = props;

  return (
    <Button
      variant='contained'
      sx={{
        height: '48px',
        fontWeight: 500,
        lineHeight: '22px',
        borderRadius: '8px',
        fontSize: '16px !important',
        textTransform: 'capitalize',
        backgroundColor: 'primary.dark',
        ...sx,
      }}
      {...restP}
    >
      {children}
    </Button>
  );
};

export default ButtonC;
