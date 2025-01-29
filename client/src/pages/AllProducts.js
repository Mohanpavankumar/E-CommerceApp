import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border-2 py-2 px-3 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all rounded-full' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/* upload product */}

      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)}/>
        )
      }
    </div>
  )
}

export default AllProducts