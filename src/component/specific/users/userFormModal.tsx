import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import BaseModal from '@/component/atoms/modal/BaseModal';
import { profileFormField } from '@/helper/constants';
import { renderFormField } from '@/helper/formHelper';
import { message } from 'antd';


interface UsersFormModalProps {
  open: boolean;
  close: () => void;
  initialValues?: any;
}

const schema = z.object({
  username: z.string().nonempty({ message: 'Username is required' }),
  phone: z.string().nonempty({ message: 'Phone number is required' }),
  address: z.string().nonempty({ message: 'Address number is required' }),
  email: z.string().nonempty({ message: 'Email number is required' }),
  role_id : z.any(),
});
type FormValues = z.infer<typeof schema>;
const UsersFormModal = ({open, close, initialValues}:UsersFormModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isEdit = !!initialValues;

  const defaultValues:FormValues ={
    username: '',
    phone: '',
    address: '',
    email: '',
    role_id: ''
  } 
  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues
})

    const formData = watch();

    useEffect(() => {
      if (isEdit && initialValues) {
        reset({
          username: initialValues.username,
          phone: initialValues.phone,
          address: initialValues.address,
          email: initialValues.email,
          role_id: initialValues.role_id,
        });
      } else {
        reset();
      }
    }, [ initialValues, reset]);

    const handleInputChange = (name: string, value: any) => {
      setValue(name as keyof FormValues, value);
    };

    const onSubmit = async (data:FormValues) =>{
      message.warning('Please connect API')
      // setIsLoading(true)
      try {
        const payload = {
          username: data.username,
          phone: data.phone,
          email:data.email,
          address:data.address,
          role_id:data.role_id
        }
      } catch (error) {
        console.log('err in updated user form',error);
        
      }finally{
        setIsLoading(false)
      }
    }
  return (
    <>
      <BaseModal
        open={open}
        title={isEdit ? 'Update user information' : 'Create new user'}
        onCancel={close}
        centered
        width={600}
        loading={isLoading}
        onOk={handleSubmit(onSubmit)}
      >
        {profileFormField.map((group, index) => (
        <div key={index}>{renderFormField(group, formData, errors, handleInputChange)}</div>
      ))}
      </BaseModal>
    </>
  )
}

export default UsersFormModal
