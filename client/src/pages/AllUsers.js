import React, { useEffect, useState } from 'react'
import SummaryApi from './../EndPoints/index';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        name : "",
        email : "",
        role : "",
        _id : ""
    })

    const fetchAllUsers = async() => {
        const fetchData = await fetch(SummaryApi.allUser.url,{
            method : SummaryApi.allUser.method,
            credentials : "include"
        })
        const dataResponse = await fetchData.json()

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.error)
        }

    }
    useEffect(() =>{
        fetchAllUsers()
    },[])

  return (
    <div>
        <table className='w-full userTable'>
            <thead className='bg-black text-white'>
                <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            {
                allUser.map((el,index) =>{
                    return(
                        <tr>
                            <td>{index+1}</td>
                            <td>{el?.name}</td>
                            <td>{el?.email}</td>
                            <td>{el?.role}</td>
                            <td>{moment(el?.createdAt).format('ll')}</td>
                            <td>
                                <button className='bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-400' 
                                onClick={()=>{
                                    setUpdateUserDetails(el)
                                    setOpenUpdateRole(true)
                                }}
                                >
                                    <MdModeEdit/>
                                </button>
                            </td>
                        </tr>
                    )
                })
            }
        </table>
        {
           openUpdateRole && (
            <ChangeUserRole
                onClose={() => setOpenUpdateRole(false)}
                name={updateUserDetails.name}
                email={updateUserDetails.email}
                role={updateUserDetails.role}
                userId={updateUserDetails._id}
                callFunc={fetchAllUsers}
            />
           )
        }
    </div>
  )
}

export default AllUsers