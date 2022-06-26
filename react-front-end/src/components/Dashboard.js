import React, { useState } from 'react'
import book from '../assets/svgs/book.png';
import add from '../assets/svgs/add.png';
import '../styles/misc.css'

export default function Dashboard() {

    const methods = ["Starts with", "Ends With", "Includes"];
    const contactProperty = ["Name", "Email", "Phone Number"];

    const [searchFields, setSearchFields] = useState([
    {
        searchContent : "",
        method : "Includes",
        property : "Email"
    }
    ])

    return (
      <div className="dashBoard-Container">
        <div className="User">
          <div className="searchbar">
            <h2>User</h2>
          </div>
          <input type={"text"} placeholder="&#x1F50D;" />
          <p>Specify Searching Method</p>
          <select
            value={searchFields.method}
            name="method"
            onChange={(e) => console.log("Hello 1")}
          >
            {methods.map((method) => (
              <option value={method}>{method}</option>
            ))}
          </select>
          <p>Specify Contact Property</p>
          <select
            value={searchFields.property}
            name="property"
            onChange={(e) => console.log("Hello 2")}
          >
            {contactProperty.map((property) => (
              <option value={property}>{property}</option>
            ))}
          </select>
        </div>
        <div className="display">
          <button>
            <img src={book} />
          </button>
          <button>
            <img src={add} />
          </button>
          <div>
            <button> Log Out </button>
          </div>
        </div>
      </div>
    );
}
