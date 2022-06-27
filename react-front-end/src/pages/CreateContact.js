import React, { useState } from 'react'
import '../styles/main/main.css'
import Map from '../components/Map'
import axios from 'axios'

export default function CreateContact({setDisplay}) {
    const [ contactDetails, setContactDetails] = useState([
        {
            name:"",
            email: "",
            phone_number: "",
            marital_status: false,
            location : []
        }
    ])
    const [contactLocation, setContactLocation] = useState([])

    const passLocation = (Post) => {
        setContactLocation(Post)
        console.log("hello?")
    }


    const handleFormChange = (index, e) => {
        let data = [...contactDetails];
        data[index][e.target.name] = e.target.value;
        setContactDetails(data);
    }
    const user = localStorage.getItem("user");
    const userDataList = user.split(",");
    const userid = userDataList[1];

    const handleSubmit = async (event) => {
      event.preventDefault();
        console.log(contactDetails[0].name)
      let name = contactDetails[0].name;
      let email = contactDetails[0].email;
      let phone_number = contactDetails[0].phone_number;
      let marital_status = contactDetails[0].marital_status;
      let contact_location = contactDetails[0].location;
      let user_id = userid;

      return axios
        .post("http://localhost:3000/api/contacts/createContact", {
          name,
          email,
          phone_number,
          marital_status,
          contact_location,
          user_id
        })
        .then((res) => {
          console.log(res.data[0]);
          if (res.status === 200) {
              console.log(res.data)
              setDisplay(false)
          }
          return res.data;
        });
    };

  return (
    <div className="CreateContact">
      <h1>Create A New Contact</h1>
      <form onSubmit={handleSubmit}>
        {contactDetails.map((detail, index) => (
          <div key={index} className="CreateContactForm">
            <input
              type={"text"}
              name="name"
              value={detail.name}
              placeholder={"Contact Name"}
              onChange={(e) => {
                handleFormChange(index, e);
              }}
            />
            <input
              type={"text"}
              name="email"
              value={detail.email}
              placeholder={"Contact Email"}
              onChange={(e) => {
                handleFormChange(index, e);
              }}
            />
            <input
              type={"text"}
              name="phone_number"
              value={detail.phone_number}
              placeholder={"Contact Phone Number"}
              onChange={(e) => {
                handleFormChange(index, e);
              }}
            />
            <div>
              <label>Married</label>
              <input
                type={"radio"}
                name="marital_status"
                value={detail.marital_status}
                onChange={(e) => {
                  handleFormChange(index, e);
                }}
              />
            </div>
            <Map location={detail.contact_location} passLoc={passLocation}/> 
          </div>
        ))}
        <button type="submit">Save Contact</button>
      </form>
    </div>
  );
}
