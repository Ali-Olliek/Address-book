import React, { useState } from 'react'
import book from '../assets/svgs/book.png';
import add from '../assets/svgs/add.png';
import '../styles/main/main.css'
import axios from 'axios';


export default function Dashboard() {

    const methods = ["Starts with", "Ends with", "Includes"];
    const contactProperty = ["Name", "Email", "Phone Number"];

    const [searchFields, setSearchFields] = useState([
    {
        searchContent : "",
        method : "Starts with",
        property : "Name"
    }
    ])

    const handleSearchInput = (index, e) => {
        let data = [...searchFields];
        data[index][e.target.name] = e.target.value;
        setSearchFields(data)
    }
    
    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(searchFields[0])
        
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
        <div className="dashBoard-Container">
            <div className="User">
            <h2>Hello, User</h2>
            </div>
            {searchFields.map((field, index) => (
            <div key={index} className="searchbar">
                <input
                    value={field.searchContent}
                    name="searchContent"
                    type={"text"}
                    placeholder="&#x1F50D; Search"
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
                <button type='submit' onClick={handleSearch}>Search</button>
            </div>
            ))}
            <div className="display">
            <button>
                <img src={book} />
            </button>
            <button>
                <img src={add} />
            </button>
            <div>
            </div>
            </div>
                <button className='secondary'> Log Out </button>
      </div>
    );
}