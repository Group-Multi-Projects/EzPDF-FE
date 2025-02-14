import { PRIMARY } from "@/helper/colors";
import "./styles.scss";
import {
  FileCode,
  FileSpreadsheet,
  Presentation,
  Image,
  FileText,
  FilePen,
  Search,
} from "lucide-react";

const HomePage = () => {
  const features = [
    {
      title: "How To Edit PDF File?",
      description:
        "Our tools help you process PDF files more easily. Our website contains all the most useful tools for you to process PDF files.",
      image: "/src/assets/png/img1.png", // Thay bằng link ảnh
    },
    {
      title: "Work directly on your files",
      description:
        "Do more than just view PDFs. You can edit directly, add, edit, delete files, mark PDF files,...",
      image: "/src/assets/png/img2.png", // Thay bằng link ảnh
    },
    {
      title: "Convert PDF file to HTML file",
      description:
        "This makes programming easier and faster for developers, saving a lot of time.",
      image: "/src/assets/jpg/img2.jpg", // Thay bằng link ảnh
    },
  ];
  const tools = [
    { icon: FilePen, color: "#ff4d00", label: "Edit PDF" },
    { icon: FileText, color: "#0f1fff", label: "PDF to Word" },
    { icon: FileCode, color: "#ff824d", label: "PDF to HTML" },
    { icon: Presentation, color: "#ff824d", label: "PDF to PPT" },
    { icon: FileSpreadsheet, color: "#00c220", label: "PDF to Excel" },
    { icon: Image, color: "#0010f5", label: "PDF to JPG" },
  ];
  return (
    <div className="md:p-10 h-full overflow-scroll">
    <div className="text-white p-6 rounded-xl shadow-lg  md:mx-auto mx-3" style={{backgroundColor:'rgb(143 82 127)'}}>
      <h2 className="text-2xl font-semibold text-center mb-4">
        Select the tools you need
      </h2>

      {/* Search Box */}
      <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
        <Search className="text-gray-500 ml-2" size={20} />
        <input
          className="flex-1 bg-transparent outline-none text-gray-700 px-2"
          placeholder="Research your content"
        />
        <button className="bg-primary-medium text-white px-4 py-1 rounded-md hover:bg-primary-dark transition">
          Search
        </button>
      </div>

      {/* Tools Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {tools.map(({ icon: Icon, color, label }, index) => (
          <button
            key={index}
            className="flex items-center bg-white text-gray-700 p-3 rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            <Icon className="mr-2" size={20} color={color} strokeWidth={1} />
            {label}
          </button>
        ))}
      </div>
    </div>

      <div className="why-use-ezpdf">
        <h2 className="title" style={{ color: PRIMARY.MEDIUM }}>
          Why should you use EzPDF?
        </h2>
        <div className="features grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature md:w-[300px] bg-gray-100 p-4 rounded-lg shadow-md text-center"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="feature-image mx-auto w-40  object-cover"
              />
              <h3 className="feature-title font-bold text-base mt-3 text-primary-medium"
                  style={{
                  textAlign: "justify",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  overflow: "hidden",
                }}
              >
                {feature.title}
              </h3>
              <p
                className="w-full text-gray-600 text-sm"
                style={{
                  textAlign: "justify",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
