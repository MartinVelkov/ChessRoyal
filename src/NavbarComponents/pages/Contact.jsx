import { React, useState } from "react";
import "./CssForThePages/Contact.css"
import Img from "../../assets/img/logo.png"
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Тук можете да обработите изпращането на формата, като изпращате данни към сървър
    console.log('Формата беше изпратена:', { name, email, message });
    // Изчистване на формата след изпращане
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="Container">
      <Container>
       <div className="rounded-image-container">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
          <img src={Img} alt="Лого" className="rounded-image" />
        </Box>
      </div> 
      </Container>

      <Container>

      <div className="contact-form-container">
      <h2 className="heading">Свържете се с нас</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Име:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Имейл:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Съобщение:</label>
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="form-control"
            id="text"
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Изпрати</button>
      </form>
    </div>
      </Container>
    </div>    
  );
};
