"use client" ; 
import React, { useEffect, useState } from 'react';
import CustomInput from '../Login/CustomInput';
import './signup.css';

import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

function CreateUser() {
  const [role, setRole] = useState('Role 1');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  // Handle role change
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // Handle form submission for signup
  const handleSignup = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    try {
      console.log('Username:', username);
      console.log('Password:', password);
      console.log('Role:', role);

      // Send POST request to backend API
      const response = await axios.post(
        'http://127.0.0.1:8000/api/accounts/signup/',
        {
          username,
          password,
          role: role.toLowerCase().replace(' ', '_'), // Match backend role format
        }
      );

      console.log('Response:', response);

      // Extract data from response
      const data = response.data;

      // Store user token and ID in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('id', data.id);

      // Redirect user based on their role
      if (role === 'Admin') {
        navigate('/admin-home');
      } else if (role === 'Investigator') {
        navigate('/invest-home');
      } else if (role === 'Review Committee') {
        navigate('/review-home');
      } else {
        navigate('/research-home');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(
        error.response?.data?.error ||
          'An error occurred during signup. Please try again.'
      );
    }
  };

//   // Check if user is already logged in
//   useEffect(() => {
//     const checkLogin = async () => {
//       const sessionId = localStorage.getItem('token');
//       if (sessionId) {
//         try {
//           const response = await fetch('http://127.0.0.1:8000/api/accounts/me/', {
//             method: 'GET',
//             headers: {
//               Authorization: `Token ${sessionId}`,
//               'Content-Type': 'application/json',
//             },
//           });

//           if (response.status === 200) {
//             console.log('User is authenticated');
//             const data = await response.json();

//             // Redirect based on user's role
//             const userRole = data.role;
//             if (userRole === 'admin') {
//               navigate('/admin-home');
//             } else if (userRole === 'investigator') {
//               navigate('/invest-home');
//             } else if (userRole === 'review_committee') {
//               navigate('/review-home');
//             } else {
//               navigate('/research-home');
//             }
//           }
//         } catch (error) {
//           console.error('Session invalid or expired');
//         }
//       } else {
//         console.log('User is not authenticated');
//       }
//     };

//     checkLogin();
//   }, [navigate]);

  return (
    <>
      <div className="container">
        <div className="signup_content">
          <div className="signup_title">
            <Image src={require("./astra1.png")}/>
          </div>
          <div className="signup_form">
            <form onSubmit={handleSignup}>
              <div className="signup_form_head">
                <h2>
                  Welcome <br />
                  {role}!
                </h2>
              </div>

              {/* Role Selection */}
              <div className="signup_role_select">
                <label htmlFor="role">Select Your Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                  className="role_dropdown"
                >
                  <option value="Role 1">Role 1</option>
                  <option value="Role 2">Role 2</option>
                  <option value="Role 3">Role 3</option>
                  <option value="Role 4">Role 4</option>
                </select>
              </div>

              {/* Username and Password Input Fields */}
              <div className="signup_form_field">
                <CustomInput
                  icon={<i className="ri-user-3-line"></i>}
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <CustomInput
                  icon={<i className="ri-lock-line"></i>}
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Error Message */}
              {error && <div className="error_message">{error}</div>}

              {/* Submit Button */}
              <div className="signup_btn">
                <button type="submit">Create Account</button>
              </div>

              {/* Navigation to Account Creation */}
              <div className="signup_admin">
                <p>
                  Already an user? <Link href="/Login">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
