export const baseApi = "/api";

export const profileFormField = [
  [
    {
      label: "Username",
      name: "username",
      placeholder: "Username",
      fieldType: "input",
    },
  ],
  [
    {
      label: "Phone number",
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
      label: "Address",
      name: "address",
      placeholder: "Address",
      fieldType: "input",
    },
  ],
  [
    {
      label: 'Role',
      name: 'role_id',
      placeholder: 'Role',
      fieldType: 'select',
      options: [
        { label: 'Admin', value: '2' },
        { label: 'User', value: '1' },
      ],
    },
  ],  
];
