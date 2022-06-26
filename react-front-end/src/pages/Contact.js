import React from 'react';
import '../styles/main/main.css';

export default function Contact({name, email, number, status, location}) {
  return (
    <div className='Contact'>
        <p>{name}</p>
        <p>{email}</p>
        <p>{number}</p>
        <p>{status}</p>
        <p>{location}</p>
        
    </div>
  )
}
