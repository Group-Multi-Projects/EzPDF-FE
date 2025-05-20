import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseModal from "@/component/atoms/modal/BaseModal";
import { fileFormField, profileFormField } from "@/helper/constants";
import { renderFormField } from "@/helper/formHelper";
import { message } from "antd";
import apiService from "@/service";

interface fileListFormModalProps {
  open: boolean;
  close: () => void;
  refresh:() => void;
}

const schema = z.object({
  file: z.any().optional(),
});
type FormValues = z.infer<typeof schema>;
const FileFormModal = ({
  open,
  close,
  refresh
}: fileListFormModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      file: "",
    },
  });

  const formData = watch();

  const handleInputChange = (name: string, value: any) => {
    setValue(name as keyof FormValues, value);
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
        const payload = new FormData();
        if (data.file.length > 0) {
            payload.append('file_url', data.file[0] as Blob);
            payload.append('file_name', data.file[0].name);
            payload.append('file_type', data.file[0].type);
            payload.append('user_id', '1');
          } else {
             message.warning("Please select a file");
          }
        const res = await apiService.files.upload(payload)
        reset()
        refresh()
        close()
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
        title="Upload your file"
        onCancel={close}
        centered
        width={900}
        loading={isLoading}
        onOk={handleSubmit(onSubmit)}
        okText="Đồng ý"
        cancelText="Hủy bỏ"
      >
        {fileFormField.map((group, index) => (
          <div key={index}>
            {renderFormField(group, formData, errors, handleInputChange)}
          </div>
        ))}
      </BaseModal>
    </>
  );
};

export default FileFormModal;
