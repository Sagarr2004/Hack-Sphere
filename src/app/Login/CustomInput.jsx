import React from 'react'
import './utils.css'

function CustomInput({ icon, placeholder, type = 'text', value, onChange }) {
  return (
    <div className="custom_inputs">
      <span>{icon}</span>
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
      />
    </div>
  )
}

export default CustomInput
