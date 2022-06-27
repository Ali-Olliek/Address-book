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


    const user = localStorage.getItem("user");
    const userDataList = user.split(",");
    const user_id = userDataList[1];

    const getContacts = async () => {
        const res = await fetch(`http://localhost:3000/api/contacts/Contacts/${user_id}`);
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

    const passDataToParent = (status, e) => {
        setDisplayContent(status)
        setContact(e)
    }


  return (
    <>
    <div className='ContactsList'>
        <h1>Your Contacts</h1>
        {(contacts) ? <p>No Contacts Found</p> : contacts.map((contact, index)=>{
            return (
              <>
                <div key={index}>
                  <ContactCard
                    key={contact.id}
                    name={contact.name}
                    contact={contact}
                    passDataToParent={passDataToParent}
                  />
                </div>
              </>
            );
        })}
    </div>
        <div>
            {(displayContact === true)
                && (
                <Contact
                  contact={contact}
                />)
                }
        </div>
    </>
  )
}
