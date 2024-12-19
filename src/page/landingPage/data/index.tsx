import slider1 from "@/assets/svg/slider1.svg";
import slider2 from "@/assets/svg/slider2.svg";
import slider3 from "@/assets/png/img2.png";
export const Data = [
  {
    id: 1,
    tittle: "Working directly on your files",
    description:"Do more than just view PDF files. Highlight and add text, images, shapes, and annotations hands-free to your documents. You can connect with other tools to perform many other functions on your files.",
    link: (
      <>
        Edit PDF files now <span aria-hidden="true">&rarr;</span>
      </>
    ),
    image: slider2,
  },
  {
    id: 2,
    tittle: "Document management—All in one place",
    description:"You don't need to work on many different applications anymore! Save time by storing, managing,and sharing files across multiple devices—from our web platform.",
    link: (
      <>
        Manage now <span aria-hidden="true">&rarr;</span>
      </>
    ),
    image: slider1,
  },
  {
    id: 3,
    tittle: "Converting PDF files is not difficult",
    description:"Online conversion from PDF files to other formats(Word, PPT, Excel, HTML,...) and from other formats to PDF.",
    link: (
      <>
        Convert now <span aria-hidden="true">&rarr;</span>
      </>
    ),
    image: slider3,
  },
];
