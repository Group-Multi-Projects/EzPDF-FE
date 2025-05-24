import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import classNames from 'classnames/bind';
import styles from './WYSIWYGEditor.module.scss';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
  ],
};

const formats = ['bold', 'italic', 'underline', 'strike', 'color', 'background', 'list', 'bullet', 'indent', 'align'];

const cx = classNames.bind(styles);

interface WYSIWYGEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  theme?: string;
  className?: string;
  style?: React.CSSProperties;
  ref?:any;
  disabled?: boolean;
}

const WYSIWYGEditor = ({
  value,
  onChange,
  placeholder,
  theme = 'snow',
  className,
  style,
  ref,
  disabled
}: WYSIWYGEditorProps) => {
  return (
      <div className={cx('editor', className)}>
        <ReactQuill
         style={{ height: '100%' }}
         ref={ref}
          theme={theme}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          readOnly={disabled}
        />
      </div>
  );
};

export default WYSIWYGEditor;
