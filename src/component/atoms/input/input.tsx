import { forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import _ from 'lodash';
import { PRIMARY, RED, GRAY_SCALE, BACK_GROUND } from '@/helper/colors';

type Props = {
  fontWeight?: string;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  color?: string;
  backgroundColor?: string;
  // borderColor?: string;
  theme?: 'default' | 'error' | 'disabled'
} & TextFieldProps;

const InputCustom = forwardRef<HTMLInputElement, Props>(
  (
    {
      fontWeight = '400',
      textTransform = 'none',
      theme = 'default',
      sx,
      variant = 'outlined',
      ...props
    },
    ref
  ) => {
    const backgroundColor = () => {
      if (theme === 'error') return RED.LIGHT;
      else if (theme === 'disabled') return GRAY_SCALE.LIGHT;
      return BACK_GROUND;
    };

    const color = () => {
      if (theme === 'error') return RED.DARK;
      else if (theme === 'disabled') return GRAY_SCALE.MEDIUM;
      return PRIMARY.MEDIUM;
    };

    // const borderColor = () => {
    //   if (theme === 'error') return RED.MEDIUM;
    //   else if (theme === 'disabled') return GRAY_SCALE.MEDIUM;
    //   return PRIMARY.MEDIUM;
    // };

    // const hoverBorderColor = () => {
    //   if (theme === 'error') return RED.DARK;
    //   return PRIMARY.DARK;
    // };

    return (
      <TextField
        ref={ref}
        variant={variant}
        style={{
          borderRadius: '5px'
        }}
        sx={_.merge(
          {
            ...{
                backgroundColor: backgroundColor(),
                color: color(),
                fontWeight,
                textTransform,
                // border: `1px solid ${borderColor()}`,
                // '&:hover .MuiOutlinedInput-notchedOutline': {
                //   borderColor: hoverBorderColor(),
                // },
                '&.Mui-disabled': {
                  color: GRAY_SCALE.MEDIUM,
                  backgroundColor: GRAY_SCALE.LIGHT,
                },
              }
          }
        )}
        {...props}
      />
    );
  }
);

export default InputCustom;
