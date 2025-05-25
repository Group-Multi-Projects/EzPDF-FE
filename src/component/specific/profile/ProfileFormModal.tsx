import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseModal from "@/component/atoms/modal/BaseModal";
import { profileFormField } from "@/helper/constants";
import { renderFormField } from "@/helper/formHelper";
import { message } from "antd";
import apiService from "@/service";

interface ProfileFormModalProps {
  open: boolean;
  close: () => void;
  initialValues: any;
}

const schema = z.object({
  username: z.string().nonempty({ message: "Username is required" }),
  phone: z.string().nonempty({ message: "Phone number is required" }),
  address: z.string().nonempty({ message: "Address number is required" }),
  email: z.string().nonempty({ message: "Email number is required" }),
  role_id: z.any(),
});
type FormValues = z.infer<typeof schema>;
const ProfileFormModal = ({
  open,
  close,
  initialValues,
}: ProfileFormModalProps) => {
  const role = localStorage.getItem("role");
  const hasPermission = role === "admin";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fields, setFields] = useState(profileFormField)

  console.log(fields);
  
  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const formData = watch();

  useEffect(() => {
    if (initialValues) {
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
  }, [initialValues, reset]);

useEffect(() => {
  const renderFields = () => {
    const updatedFields = profileFormField.map((row) =>
      row.map((field:any) => {
        if (field.name === 'role_id' && field.fieldType === 'select') {
          const updatedOptions = field.options.map((opt:any) => ({
            ...opt,
            disabled: !hasPermission && opt.label === 'Admin',
          }));

          return {
            ...field,
            options: updatedOptions,
          };
        }

        return field;
      })
    );

    setFields(updatedFields);
  };

  renderFields();
}, [hasPermission]);


  const handleInputChange = (name: string, value: any) => {
    setValue(name as keyof FormValues, value);
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const payload = {
        username: data.username,
        phone: data.phone,
        email: data.email,
        address: data.address,
        role_id: data.role_id,
      };
      await apiService.users.update(payload, initialValues.id).then(() => {
        message.success("Cập nhật thông tin thành công");
      });
      close();
    } catch (error) {
      console.log("err in updated user form", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <BaseModal
        open={open}
        title="Cập nhật thông tin"
        onCancel={close}
        centered
        width={600}
        loading={isLoading}
        onOk={handleSubmit(onSubmit)}
        okText="Lưu"
        cancelText="Hủy"
      >
        {fields.map((group, index) => (
          <div key={index}>
            {renderFormField(group, formData, errors, handleInputChange)}
          </div>
        ))}
      </BaseModal>
    </>
  );
};

export default ProfileFormModal;
