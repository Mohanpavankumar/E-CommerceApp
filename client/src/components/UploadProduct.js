import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from './../EndPoints/index';
import {toast} from 'react-toastify';

  const UploadProduct = ({
  onClose
  }) => {
  const [data, setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("")
  const handleOnChange = (e) => {
    const {name, value} = e.target

    setData((preve) => {
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleUploadProduct = async(e) => {
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file)

    setData((preve) => {
      return{
        ...preve,
        productImage : [...preve.productImage, uploadImageCloudinary.url]
      }
    })
  }

  const handleDeleteProductImage = async(index) => {

    const newProductImage = [...data.productImage]
    newProductImage.splice(index,1)
    setData((preve) => {
      return{
        ...preve,
        productImage : [...newProductImage]
      }
    })
  }

  
  const handleSubmit = async(e) =>{
    e.preventDefault()

  const response = await fetch(SummaryApi.UploadProduct.url,{
    method : SummaryApi.UploadProduct.method,
    credentials : "include",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(data)
  });

  if (response.headers.get("content-type")?.includes("application/json")) {
  const responseData = await response.json();

  if (response.ok) {
    toast.success(responseData?.message);
    onClose();
  } else {
    toast.error(responseData?.message || "Something went wrong");
  }
} else {
  const text = await response.text();
  console.error("Non-JSON response received:", text);
  toast.error("Server error: unexpected response format.");
}


  }


  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>UploadProduct</h2>
          <div className='w-fit ml-auto text-2xl hover:text-blue-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-full' onSubmit={handleSubmit}>
          <label htmlFor='productName'>Product Name :</label>
          <input 
            type='text' 
            id='productName'  
            placeholder='enter product name'
            name='productName'
            value={data.productName} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
          <input 
            type='text' 
            id='brandName'  
            placeholder='enter brand name' 
            name='brandName'
            value={data.brandName} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='category' className='mt-3'>Category :</label>
          <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
            <option value={""}>select category</option>
            {
              productCategory.map((el, index) =>{
                return (
                  <option value={el.value} key={el.value+index}>{el.label}</option>
                )
              })
            }
          </select>

          <label htmlFor='productImage' className='mt-3'>Product Image :</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                <span className='text-4xl'><FaCloudUploadAlt /></span>
                <p>Upload Product Image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
              </div>          
            </div>
          </label>
          <div>
            {data?.productImage[0]?(
              <div className='flex items-center gap-2 '>
                {
                  data.productImage.map((el,index) =>{
                return(
                  <div className='relative group'>
                    <img 
                      src={el} 
                      alt={el} 
                      width={80} 
                      height={80} 
                      className='bg-slate-100 border rounded cursor-pointer' 
                      onClick={() => {
                        setOpenFullScreenImage(true)
                        setFullScreenImage(el)
                      }}/>
                      <div className='absolute bottom-0 right-0 p-1 text-xs text-white bg-blue-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                        <MdDelete />
                      </div>
                  </div>
                )
              })
                }
              </div>
            ) : (
              <p className='text-red-600 text-xs'>* please upload product image</p>
            )}
            
          </div>

          <label htmlFor='price' className='mt-3'>Price :</label>
          <input 
            type='number' 
            id='price'  
            placeholder='enter price'
            name='price' 
            value={data.price} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
          <input 
            type='text' 
            id='sellingPrice'  
            placeholder='enter selling Price' 
            name='sellingPrice'
            value={data.sellingPrice} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='description' className='mt-3'>Description :</label>
          <textarea 
            className='h-28 bg-slate-100 border-resize-none p-1' 
            rows={3} 
            placeholder='enter product description'
            name='description'
            value={data.description}
            onChange={handleOnChange}
            required
          >
          </textarea>

          <button className='px-3 py-2 bg-blue-600 text-white mb-10 hover:bg-blue-700'>Upload Product</button>

        </form>

      </div>

    {/** display image full screen **/}
    {
      openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )
    }
    </div>
  )
}

export default UploadProduct