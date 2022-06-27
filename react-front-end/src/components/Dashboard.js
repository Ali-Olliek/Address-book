import React, { useState } from 'react'
import book from '../assets/svgs/book.png';
import add from '../assets/svgs/add.png';
import search from '../assets/svgs/search.png'
import CreateContact from '../pages/CreateContact';
import '../styles/main/main.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {

    const methods = ["Starts with", "Ends with", "Includes"];
    const contactProperty = ["Name", "Email", "Phone Number"];
    const navigate = useNavigate();
    const [addContact, setAddContact] = useState(false)
    const [searchFields, setSearchFields] = useState([
    {
        searchContent : "",
        method : "Starts with",
        property : "Name"
    }
    ])
    const user = localStorage.getItem('user')
    const userDataList = user.split(',')
    const username = userDataList[0]

    const handleSearchInput = (index, e) => {
        let data = [...searchFields];
        data[index][e.target.name] = e.target.value;
        setSearchFields(data)
    }
    

    const handleAdd = (e) => {
        setAddContact(true)
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        
        let searchContent = searchFields[0].searchContent
        let method = searchFields[0].method
        let property = searchFields[0].property

        return axios.post("http://localhost:3000/api/contacts/Search", {
            searchContent,
            method,
            property,
          })
          .then(function (res) {
            if (res.status === 200) {
              console.log("success", res);
            } else {
              console.log("failed");
            }
          });
    }


    return (
        <>
            <div className="dashBoard-Container">
                <div className="User">
                <h2>Hello, {username}</h2>
                </div>
                {searchFields.map((field, index) => (
                <div key={index} className="searchbar">
                        <input
                            value={field.searchContent}
                            name="searchContent"
                            type={"text"}
                            placeholder="Search"
                            onChange={(e) => {
                            handleSearchInput(index, e);
                        }}/>
                    <p>Specify Method</p>
                    <select
                        value={field.method}
                        name="method"
                        onChange={(e) => {
                        handleSearchInput(index, e);
                        }}>
                        {methods.map((method) => (
                        <option value={method}>{method}</option>
                        ))}
                    </select>
                    <p>Specify Property</p>
                    <select
                        value={field.property}
                        name="property"
                        onChange={(e) => {
                        handleSearchInput(index, e);
                        }}>
                        {contactProperty.map((property) => (
                        <option value={property}>{property}</option>
                        ))}
                    </select>
                    <button type='submit' onClick={handleSearch}>
                        <img src={search}/>
                    </button>
                </div>
                ))}
                <div className="display">
                <button>
                    <img src={book} />
                </button>
                <button onClick={handleAdd}>
                    <img src={add} />
                </button>
                <div>
                </div>
                </div>
                    <button className='secondary'> Log Out </button>
            </div>
            {(addContact) && (
            <div className='createContact'>
                <CreateContact setDisplay={setAddContact}/>
            </div>
        )}
      </>

    );
}