import './styles.scss';
import { FileCode, FileSpreadsheet, Presentation ,Image, FileText, FilePen } from 'lucide-react';

const HomePage = () => {
    const features = [
        {
          title: "How To Edit PDF File?",
          description: "Công cụ của chúng tôi giúp bạn xử lý file PDF dễ dàng hơn. Trang web của chúng tôi chứa tất cả những công cụ hữu ích nhất để bạn xử lý file PDF.",
          image: "/src/assets/png/image.png", // Thay bằng link ảnh
        },
        {
          title: "Làm việc trực tiếp trên các file của bạn",
          description: "Thực hiện được nhiều tác vụ hơn là chỉ xem PDF. Bạn có thể edit trực tiếp, thêm sửa xóa file, đánh dấu file PDF,...",
          image: "/src/assets/png/image.png", // Thay bằng link ảnh
        },
        {
          title: "Chuyển đổi file PDF thành file HTML",
          description: "Điều này giúp cho việc lập trình của các developer trở nên dễ dàng, nhanh chóng hơn, tiết kiệm được nhiều thời gian.",
          image: "/src/assets/png/image.png", // Thay bằng link ảnh
        },
      ];
    return (
        <div className="p-10">
        <div className="container">
          <h2 className="title">Hãy chọn công cụ mà bạn cần</h2>
          <div className="search-container">
            <input className="search-input" placeholder="Tìm kiếm nội dung của bạn" />
            <button className="search-button">🔍</button>
          </div>
          <div className="tools">
            <button className="tool-button flex"><FilePen style={{marginRight:"10px"}} size={20} color="#ff4d00" strokeWidth={3} />Edit PDF</button>
            <button className="tool-button flex "> <FileText style={{marginRight:"10px"}} size={20} color="#0f1fff" strokeWidth={3} />PDF to Word</button>
            <button className="tool-button flex"> <FileCode style={{marginRight:"10px"}} size={20} color="#ff824d" strokeWidth={3} />  PDF to HTML</button>
            <button className="tool-button flex"><Presentation style={{marginRight:"10px"}} size={20} color="#ff824d" strokeWidth={3} />PDF to PPT</button>
            <button className="tool-button flex "><FileSpreadsheet style={{marginRight:"10px"}} size={20} color="#00c220" strokeWidth={3} />PDF to Excel</button>
            <button className="tool-button flex" ><Image style={{marginRight:"10px"}} size={20} color="#0010f5" strokeWidth={3} />PDF to JPG</button>
          </div>
        </div>


        <div className="why-use-ezpdf">
      <h2 className="title">Tại sao bạn nên sử dụng EzPDF?</h2>
      <div className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            <img src={feature.image} alt={feature.title} className="feature-image" />
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
        </div>
      );
} ;



export default HomePage;
