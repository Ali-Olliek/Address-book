import React, {  useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import ContactCard from '../components/ContactCard';
import Contact from './Contact'

import '../styles/main/main.css';

export default function Contacts() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [displayContact, setDisplayContent] = useState(false);
    const [contact, setContact ] = useState([]);

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

    const passDataToParent = (e) => {
        setDisplayContent(e)
    }

    const handleContactDisplay = (e) => {
        console.log(e.currentTarget.id)
    }

  return (
    <div className='ContactsList'>
        <h1>Your Contacts</h1>
        {contacts.map((contact, index)=>{
            return (
              <>
                <div>
                  <ContactCard
                    handleContactDisplay={handleContactDisplay}
                    key={contact.id}
                    name={contact.name}
                    passDataToParent={passDataToParent}
                  />
                </div>
              </>
            );
        })}
        <div>
            {displayContact
                && 
                <Contact 
                name={contact.id}/>}
        </div>
    </div>
  )
}
