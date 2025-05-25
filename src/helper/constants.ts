export const baseApi = "/api";

export const profileFormField = [
  [
    {
      label: "Tên",
      name: "username",
      placeholder: "Username",
      fieldType: "input",
    },
  ],
  [
    {
      label: "Số điện thoại",
      name: "phone",
      placeholder: "Phone number",
      fieldType: "input",
    },
  ],
  [
    {
      label: "Email",
      name: "email",
      placeholder: "Email",
      fieldType: "input",
    },
  ],
  [
    {
      label: "Địa chỉ",
      name: "address",
      placeholder: "Address",
      fieldType: "input",
    },
  ],
  [
    {
      label: 'Vai trò',
      name: 'role_id',
      placeholder: 'Role',
      fieldType: 'select',
      options: [
        { label: 'Admin', value: 2 },
        { label: 'User', value: 1 },
      ],
    },
  ],  
];


export const fileFormField = [
  [
    {
      fieldType: 'fileDragger',
      label: 'File',
      name: 'file',
      placeholder: 'File',
      isMulti: false,
    },
  ],
]



export const htmlTemplate = `<p><strong>Giới thiệu về lập trình web hiện đại</strong></p>

<p>Trong những năm gần đây, lập trình web đã phát triển mạnh mẽ với sự xuất hiện của nhiều công nghệ mới như <strong>ReactJS</strong>, <strong>Vue.js</strong> và <strong>Angular</strong>. Các thư viện này giúp lập trình viên xây dựng giao diện người dùng một cách nhanh chóng, mượt mà và dễ bảo trì hơn.</p>

<p><strong>ReactJS</strong> là một thư viện JavaScript được phát triển bởi Facebook, giúp tạo ra giao diện tương tác bằng cách chia nhỏ các thành phần thành các <strong>component</strong> có thể tái sử dụng. Với khái niệm <strong>Virtual DOM</strong>, React giúp cải thiện hiệu suất đáng kể so với cách thao tác DOM truyền thống.</p>

<p>Việc sử dụng <strong>TypeScript</strong> thay vì JavaScript cũng đang trở thành xu hướng phổ biến, vì nó cung cấp hệ thống kiểu tĩnh giúp phát hiện lỗi ngay trong quá trình biên dịch, từ đó giảm thiểu rủi ro khi đưa sản phẩm ra môi trường thực tế.</p>

<p><strong>Quản lý trạng thái</strong> là một phần quan trọng trong các ứng dụng web hiện đại. Các công cụ như <strong>Redux</strong> hoặc <strong>Zustand</strong> cho phép quản lý trạng thái tập trung và dễ kiểm soát, đặc biệt hữu ích trong những ứng dụng lớn, có nhiều thành phần giao tiếp với nhau.</p>

<p><strong>Kết luận:</strong> Để trở thành một lập trình viên web giỏi, bạn cần nắm vững kiến thức nền tảng về HTML, CSS, JavaScript, đồng thời thường xuyên cập nhật và thực hành với các công nghệ mới để đáp ứng được nhu cầu ngày càng cao của thị trường.</p>
`