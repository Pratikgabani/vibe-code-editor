import SignInFormClient from '@/modules/auth/components/sign-in-form-client'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <> 
    <Image src = {"/login.svg"} alt = "login" width={500} height={500} className='mx-auto' />
    <SignInFormClient />
    </>
  )
}

export default page
