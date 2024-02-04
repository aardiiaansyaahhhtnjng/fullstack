import { useState, useEffect } from "react"
import React from 'react'
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const EditUser = () => {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [gender, setGender] = useState("")

const navigate = useNavigate();
const {id} = useParams();

useEffect(() => {
    getUserById();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

const updateUser = async (e) => {
    e.preventDefault();
    try{
        await axios.patch(`http://localhost:5000/users/${id}`, {
            name, 
            email, 
            gender
        });
        navigate("/")
    } catch (error) {
        console.log(error);
    }
}

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`)
    setName(response.data.name);
    setEmail(response.data.email);
    setGender(response.data.gender);
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half"></div>
            <form onSubmit={updateUser}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input 
                           type="text" 
                           className="input" 
                           value={name} 
                           onChange={(e) => setName(e.target.value)} 
                           placeholder='Input Name'/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input 
                           type="text" 
                           className="input" 
                           value={email} 
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder='Input Email'/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Gender</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select 
                                value={gender} 
                                onChange={(e) => setGender(e.target.value)}
                                >
                                    {/* <option value=" " disabled hidden>Select Gender</option> */}
                                    <option value="Select" disabled hidden>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <button type='submit' className='button is-success mr-2'>Update</button>
                    <button type='button' className='button is-danger' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
    </div>
  )
}

export default EditUser