
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowDown, faCircle, faICursor, faSquare, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  icon: IconProp;
  ariaLabel: string;
  text?:string
}

export const ButtonTool: React.FC<ButtonProps> = ({ onClick, icon, ariaLabel, text, ...rest }) => {
  return (
    <button
      className="flex items-center gap-2 p-2 me-1 border hover:bg-slate-100 rounded-md transition-all duration-200"
      onClick={onClick}
      aria-label={ariaLabel}
      {...rest}
    >
      {text}
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};


export const Toolbar = () => {
  const addText = () => {
    alert("Add Text functionality triggered!");
    // Logic htmlFor adding text to the PDF goes here
  };

  const addShape = () => {
    alert("Add Shape functionality triggered!");
    // Logic htmlFor adding shapes to the PDF goes here
  };

  return (
    <div className="flex items-center justify-between p-2 shadow-sm w-full">

      <div className="flex">
      <ButtonTool onClick={addText} icon={faICursor} ariaLabel="Add Text" />
      <ButtonTool onClick={addShape} icon={faSquare} ariaLabel="Add Shape" />
      <ButtonTool onClick={addShape} icon={faCircle} ariaLabel="Add Shape" />
      <ButtonTool onClick={addShape} icon={faStar} ariaLabel="Add Shape" />
      </div>
       
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2 px-3 me-2"
      >Save all <FontAwesomeIcon icon={faArrowDown} />
      </button>
    </div>
  );
};

