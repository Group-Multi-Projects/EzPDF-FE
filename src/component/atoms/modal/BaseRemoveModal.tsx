import { Modal } from 'antd';
import deleteIcon from '@/assets/svg/delete_icon.svg';

interface RemovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOk: () => void;
  title: string;
  description?: string;
}

const BaseRemoveModal = (props: RemovalModalProps) => {
  const { isOpen, onClose, onOk, title, description } = props;

  return (
    <Modal centered open={isOpen} onOk={onOk} onCancel={onClose}>
      <div className='flex flex-col items-center text-center space-y-4'>
        <div className='flex justify-center'>
          <img src={deleteIcon} alt='' className='h-40 w-40' />
        </div>
        <div className='text-[24px] font-normal'>{title}</div>
        <p className='text-[14px] font-normal'>
          {description ? description : `This ${title.toLowerCase().replace('delete', '')} is about to be deleted`}
        </p>
      </div>
    </Modal>
  );
};

export default BaseRemoveModal;
