import { Select, SelectProps } from 'antd';

export interface FormSelectProps extends SelectProps {
  label?: string;
  title?: string;
  name?: string;
  error?: any;
  placeholder?: string;
  options: {
    label: React.ReactNode;
    title?: string;
    icon?: string;
    options?: { label: React.ReactNode; value: string; icon?: string }[];
    value?: string;
    disabled?: boolean
  }[];
  disabled?: boolean;
  defaultValue?: string;
  value?: any;
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  error,
  title,
  placeholder,
  disabled,
  defaultValue,
  value,
  ...props
}) => {
  return (
    <div className='cd-custom-select-container mb-4 w-full'>
      {label && (
        <div className='text-[#808897] text-[14px] leading-[21px] font-normal mb-[10px] flex gap-1'>
          {label}
        </div>
      )}
      <Select
        placeholder={placeholder}
        className='w-full h-[48px] custom-select-component'
        dropdownRender={(menu) => (
          <>
            {title && <div className='p-2 font-semibold'>{title}</div>}
            {menu}
          </>
        )}
        options={options.map((option) => ({
          value: option.value,
          disabled: !!option?.disabled,
          label: (
            <div className='flex items-center gap-2'>
              {option.icon && <img src={option.icon} alt='icon' />}
              {option.label}
            </div>
          ),
        }))}
        onChange={(value, option) => props.onChange && props.onChange(value, option)}
        status={error ? 'error' : ''}
        disabled={disabled}
        defaultValue={defaultValue}
        value={value || undefined}
        {...props}
      />
      {error && <div className='mt-[7px] ml-[5px] text-red-500 text-[12px]'>{error}</div>}
    </div>
  );
};

export default FormSelect;
