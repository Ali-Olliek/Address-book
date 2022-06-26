import React, {  useState, useEffect } from 'react'
import '../styles/main/main.css'
import ContactCard from '../components/ContactCard'

export default function Contacts() {

    const [contacts, setContacts] = useState([]);


    const getContacts = async () => {
        const res = await fetch(`http://localhost:3000/api/contacts/Contacts/62b5a8c7abeddb3708d9601d`);
        const data = await res.json();
        return data;
    };

    useEffect(()=> {
        const getData = async () => {
        const contactsFromServer = await getContacts();
        setContacts(contactsFromServer)
        };
        getData();
    }, []);

  return (
    <div className='ContactsList'>
        <h1>Your Contacts</h1>
        {contacts.map((contact)=>{
            return (
                <>
                <ContactCard 
                key={contact.email}
                name={contact.name}
                />
              </>
            );
        })}
    </div>
  )
}
