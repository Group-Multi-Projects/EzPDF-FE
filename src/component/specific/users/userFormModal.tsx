import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseModal from "@/component/atoms/modal/BaseModal";
import { profileFormField } from "@/helper/constants";
import { renderFormField } from "@/helper/formHelper";
import { message } from "antd";
import apiService from "@/service";

interface UsersFormModalProps {
  open: boolean;
  close: () => void;
  users?: any;
  onRefresh: () => void;
}

const schema = z.object({
  username: z.string().nonempty({ message: "Username is required" }),
  phone: z.string().nonempty({ message: "Phone number is required" }),
  address: z.string().nonempty({ message: "Address number is required" }),
  email: z.string().nonempty({ message: "Email number is required" }),
  role_id: z.any(),
});
type FormValues = z.infer<typeof schema>;
const UsersFormModal = ({
  open,
  close,
  users,
  onRefresh,
}: UsersFormModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isEdit = useMemo(() => !!users?.id, [users]);

  const defaultValues: FormValues = {
    username: "",
    phone: "",
    address: "",
    email: "",
    role_id: 1,
  };
  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const formData = watch();

  useEffect(() => {
    if (isEdit && users) {
      reset({
        username: users.username,
        phone: users.phone,
        address: users.address,
        email: users.email,
        role_id: users.role_id,
      });
    } else {
      reset();
    }
  }, [reset, users]);

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
      if (users) {
        await apiService.users.update(payload, users.id).then(() => {
          message.success("Cập nhật thông tin thành công");
        });
      } else {
        let res = await apiService.users.create(payload);
        let { EC, EM } = res.data;
        if (EC === 0) {
          message.success(EM);
        } else {
          message.error(EM);
        }
      }
      if (onRefresh) {
        onRefresh();
      }
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
        title={isEdit ? "Cập nhật thông tin" : "Tạo mới user"}
        onCancel={close}
        centered
        width={600}
        loading={isLoading}
        onOk={handleSubmit(onSubmit)}
      >
        {profileFormField.map((group, index) => (
          <div key={index}>
            {renderFormField(group, formData, errors, handleInputChange)}
          </div>
        ))}
      </BaseModal>
    </>
  );
};

export default UsersFormModal;
