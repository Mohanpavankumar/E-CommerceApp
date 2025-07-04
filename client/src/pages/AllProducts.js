import React, { useState, useEffect } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../EndPoints'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async() => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() =>{
    fetchAllProduct()
  },[])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border-2 py-2 px-3 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all rounded-full' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/* all products */}
      <div className='flex items-center gap-5 py-4'>
        {
          allProduct.map((product, index)=>{
            return(
              <div className='bg-white p-4 rounded'>
                <img src={product?.productImage[0]} alt='img' width={100} height={100} />
                <h1>{product.productName}</h1>
              </div>
            )
          })
        }
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