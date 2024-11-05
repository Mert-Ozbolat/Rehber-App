import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HiMiniSquares2X2 } from 'react-icons/hi2'
import { IoMenu } from "react-icons/io5"
import { MdPersonAddAlt1 } from 'react-icons/md'
import { RiSearch2Line } from 'react-icons/ri'
import Card from './components/Card'
import Model from './components/Model'



const App = () => {

  const [contacts, setContact] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/contact")
      .then((res) => setContact(res.data));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target[1].value;
    const params = {
      q: text,
    };
    axios
      .get("http://localhost:3000/contact", { params })
      .then((res) => setContact(res.data));
  };

  return (
    <div className='app'>
      <header>
        <h1>Rehber</h1>

        <div>

          <form onSubmit={handleSubmit}>
            <button><RiSearch2Line /></button>
            <input type="search" placeholder='Search' />
          </form>

          <button><HiMiniSquares2X2 /></button>
          <button className='ns'><IoMenu /></button>
          <button className='ns'><MdPersonAddAlt1 />Yeni Kişi</button>

        </div>
      </header>

      <main>
        {contacts.map((contact) => (
          <Card key={contact.id} contact={contact} />
        ))}
      </main>

      <Modal
        editItem={editItem}
        isModalOpen={isModalOpen}
        close={() => {
          setIsModalOpen(false);
          setEditItem(null);
        }}
        setContacts={setContacts}
      />
    </div>
  )
}

export default App