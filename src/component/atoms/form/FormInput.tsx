import React from 'react';
import { Input, InputProps } from 'antd';

export interface FormInputProps extends InputProps {
  label: string;
  placeholder?: string;
  error?: any;
  prefixIcon?: string;
  suffixIcon?: string;
  className?: string;
}
const FormInput: React.FC<FormInputProps> = React.memo(
  ({ label, placeholder, error, prefixIcon, suffixIcon, ...props }) => {
    return (
      <div className='mb-4 w-full'>
        <div className='text-[#808897] text-[14px] leading-[21px] font-normal tracking-[0.02em] mb-[10px] flex gap-1'>
          {label}
        </div>
        <Input
          key={props.name}
          className={`h-[48px] rounded-[12px] !text-[#666d80] border-[1px] text-[16px] px-[16px] placeholder:text-[#666D80]`}
          placeholder={placeholder}
          prefix={prefixIcon && <img src={prefixIcon} alt='prefix-icon' className='w-5 h-5' />}
          suffix={suffixIcon && <img src={suffixIcon} alt='suffix-icon' className='w-5 h-5' />}
          status={error ? 'error' : ''}
          disabled={props.disabled}
          {...props}
        />
        {error && <div className='mt-[7px] ml-[5px] text-red-500 text-[12px]'>{error}</div>}
      </div>
    );
  }
);

export default FormInput;
