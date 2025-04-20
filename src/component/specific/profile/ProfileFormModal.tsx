import React from 'react'
import { z } from 'zod';

const schema = z.object({
  username: z.string().nonempty({ message: 'Username is required' }),
  phone: z.string().nonempty({ message: 'Phone number is required' }),
  address: z.string().nonempty({ message: 'Address number is required' }),
  email: z.string().nonempty({ message: 'Email number is required' }),
  role_id : z.any(),
});
type FormValues = z.infer<typeof schema>;
const ProfileFormModal = () => {
  return (
    <div>
      
    </div>
  )
}

export default ProfileFormModal
