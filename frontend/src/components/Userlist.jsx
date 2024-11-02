import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Userlist = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
    };

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:5000/users/${userId}`);
        getUsers();
    };

  return (
    <div>
        <h1 className='title'>Users</h1>
        <h2 className='subtitle'>List of Users</h2>
        <Link 
            to="/users/add" 
            className='button is-primary mb-2'
            >
                Add New
            </Link>
        <form>
            <div className='field has-addons'>
                <div className="control is-expanded">
                    <input type="text" className='input' placeholder='Find something hire...' />
                </div>
                <div className="control">
                    <button type='submit' className='button is-info'>Search</button>
                </div>
            </div>
        </form>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user.uuid}>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.pass}</td>
                        <td>{user.role}</td>
                        <td>
                        <Link 
                            to={`/users/edit/${user.uuid}`} 
                            className='button is-small is-info mr-2'
                            >
                                Edit
                            </Link>
                        <button 
                            onClick={() => deleteUser(user.uuid) } 
                            className='button is-small is-danger'
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Userlist