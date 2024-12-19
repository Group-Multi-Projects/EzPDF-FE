
import { ReactNode } from "react";

type SlideProps = React.HTMLAttributes<HTMLDivElement> & {
  leftChildren: ReactNode;
  rightChildren: ReactNode;
};
export const Slide: React.FC<SlideProps> = ({ leftChildren, rightChildren, ...props }) => {

  return (
    <div className="my-9">
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left contained: text */}
        <div className="p-5 flex justify-center items-center">
          {leftChildren}
        </div>
        {/* Right contained: image */}
        <div className="p-5 flex justify-center items-center">
          {rightChildren}
        </div>
      </div>
    </div>
  );
}


