import { PRIMARY } from "@/helper/colors";
import "./styles.scss";
import { Popover } from "antd";
import { HomeData } from "@/page/authed/home/data";

const ClientDashboard = () => {
  return (
      <div className="  bg-white rounded-lg">
        <div className="why-use-ezpdf">
          <h2 className="title" style={{ color: PRIMARY.MEDIUM }}>
            Tại sao bạn nên sử dụng EzPDF?
          </h2>
          <div className="features grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {HomeData.map((feature, index) => (
              <div
                key={index}
                className="feature md:w-[300px] p-4 rounded-lg shadow-lg text-center border-[0.5px]"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="feature-image mx-auto w-40  object-cover"
                />
                <Popover content={feature.title}>
                  <div
                    className="feature-title font-bold text-base mt-3 text-primary-medium"
                    style={{
                      textAlign: "justify",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1,
                      overflow: "hidden",
                    }}
                  >
                    {feature.title}
                  </div>
                </Popover>
                  <div
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
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default ClientDashboard
