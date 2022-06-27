import React, {useState} from 'react';
import '../styles/main/main.css';
import Map from '../components/Map';

export default function Contact({contact}) {
  const [Married, setMarried] = useState("Not Married")
  return (
    <div className='Contact'>
        <h1>Contact Name: {contact.name}</h1>
        <p>Contact Email: {contact.email}</p>
        <p>Contact Phone Number: {contact.phone_number}</p>
        <p>Marital Status: {(contact.marital_status) && (<p>Married</p>) ? Married : "Married"}</p>
        <div>
          <Map name ={contact.name} location={contact.contact_location}/>
        </div>
    </div>
  )
}
