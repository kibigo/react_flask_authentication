import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home({user}) {
    const navigate = useNavigate()

    const handleLogout = () => {
        fetch('/logout',{
            method:'DELETE'
        })
        .then((response) => response.json())
        .then((data) => {
            window.alert('Logged out successfully')
            navigate('/')
        })
    }
  return (
    <div>
        {user ? (
            <div>
                <h1>Welcome, {user.username}</h1>
                <h2>User_Id, {user.id}</h2>
                <h2>Email, {user.email}</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <h1>Welcome to the home page</h1>
        )}
    </div>
  )
}

export default Home