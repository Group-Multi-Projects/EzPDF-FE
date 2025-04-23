import React from 'react';
import { Modal, Button, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { cn } from '@/lib/utils';


interface BaseModalProps {
  open: boolean;
  title?: string;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  children?: React.ReactNode;
  width?: number;
  footer?: React.ReactNode | null;
  centered?: boolean;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = ({
  open,
  title,
  onOk,
  onCancel,
  okText = 'Save',
  cancelText = 'Cancel',
  children,
  width,
  footer = null,
  centered = true,
  className,
  disabled = false,
  loading = false,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      closable={false}
      centered={centered}
      width={width}
      footer={
        footer !== null ? (
          footer
        ) : (
          <div className='flex justify-between gap-x-[20px]'>
            <Button className='w-full h-[48px] rounded-[12px]' onClick={onCancel}>
              {cancelText}
            </Button>
            <Button
              type='primary'
              className='w-full h-[48px] rounded-[12px]'
              style={{ backgroundColor: '#4258F1' }}
              onClick={onOk}
              disabled={disabled}
              loading={disabled || loading}
            >
              {okText}
            </Button>
          </div>
        )
      }
      className={cn('rounded-[12px] px-[24px] py-[20px]', className)}
    >
      <div className='flex justify-between items-center'>
        <div className='font-normal text-[24px] text-[#0D0D12]'>{title}</div>
        <div
          className='w-[24px] h-[24px] rounded-[5px] border-[#DFE1E6] border flex justify-center items-center cursor-pointer'
          onClick={onCancel}
        >
          <CloseOutlined style={{ fontSize: '12px', color: '#666D80' }} />
        </div>
      </div>
      <Divider />
      <div>{children}</div>
      <Divider />
    </Modal>
  );
};

export default BaseModal;
