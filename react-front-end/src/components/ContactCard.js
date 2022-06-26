import React from 'react'
import user1 from '../assets/svgs/user1.png'
import '../styles/main/main.css'

export default function ContactCard({name}) {
  return (
    <div className='ContactCard'>
        <img src={user1}/>
        <p>{name}</p>
    </div>
  )
}
