import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import _ from 'lodash'
import { PRIMARY, RED, WHITE } from '@/helper/colors';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>  {
  children: ReactNode,
  fontWeight?: string;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  theme?: 'submit' | 'add' | 'cancel'
  padding?: string;
  type?: "submit" | "button" | "reset" | undefined
} 

const ButtonCustom = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      fontWeight = 400,
      textTransform = 'none',
      theme = 'submit',
      padding = "1rem 1.5rem",
      type= "button",
      ...props
    },
    ref
  ) => {
    const backgroundColor = () => {
      if (theme === 'submit') return PRIMARY.MEDIUM;
      else if (theme === 'cancel') return RED.LIGHT;
      else if (theme === 'add') return PRIMARY.LIGHT;
      return 'transparent';
    };
    const color = () => {
      return WHITE;
    };
    const borderColor = () => {
      if (theme === 'submit') return PRIMARY.MEDIUM;
      else if (theme === 'cancel') return RED.LIGHT;
      else if (theme === 'add') return PRIMARY.LIGHT;
      return 'transparent';
    };
    const hoverStyles = {
      color: WHITE,
      backgroundColor:
        theme === 'submit'
          ? PRIMARY.DARK
          : theme === 'cancel'
          ? RED.DARK
          : PRIMARY.DARK,
      border:
        theme === 'submit'
          ? `1px solid ${PRIMARY.DARK}`
          : theme === 'cancel'
          ? `1px solid ${RED.DARK}`
          : `1px solid ${PRIMARY.DARK}`,
    };

    return (
      <button
        ref={ref}
        style={{
          borderRadius: '4px',
          transition: 'all 0.2s linear',
          lineHeight: '20px',
          backgroundColor: backgroundColor(),
          color: color(),
          border: `1px solid ${borderColor()}`,
          fontWeight,
          padding,
          textTransform,
        }}
        onMouseEnter={(e) => {
          Object.assign((e.target as HTMLButtonElement).style, hoverStyles);
        }}
        onMouseLeave={(e) => {
          Object.assign((e.target as HTMLButtonElement).style, {
            backgroundColor: backgroundColor(),
            color: color(),
            border: `1px solid ${borderColor()}`,
          });
        }}
        type='button'
        disabled={props.disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);


export default ButtonCustom;
