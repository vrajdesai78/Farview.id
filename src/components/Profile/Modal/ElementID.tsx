import Image from 'next/image'
import React, { useState } from 'react'
import Modal from './Modal'

const ElementID = () => {

  const [open, setOpen] = useState(false)

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return (
    <div className='bg-white border border-[#EDEDED] rounded-[48px] p-[8px] flex flex-row items-center justify-center  gap-[8px]'>

      <Modal open={open}  closeModal={closeModal} />
      <button onClick={openModal} className='bg-[#F5F5F5] px-[20px] py-[14px] rounded-tl-[64px] rounded-bl-[64px] text-[#262626] font-medium text-[16px] flex flex-row items-center gap-[8px] rounded-tr-[8px] rounded-br-[8px]'>
        <Image src="/images/add.svg" width={24} height={24} alt='add' />
        Add element
      </button>
      <button className='tilted-gradient px-[20px] py-[14px] rounded-tl-[8px] rounded-bl-[8px] text-white font-medium text-[16px] flex flex-row items-center gap-[8px] rounded-tr-[64px] rounded-br-[64px]'>
        Share your ID
      </button>
    </div>
  )
}

export default ElementID
