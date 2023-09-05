import React from 'react';
import style from "./Contact.module.css"

function Contact() {
  return (
    <div className={style.master}>
      <div className={style.container}>
    <div>
      <h1>Contact Us</h1>
      <h4>Feel free to get in touch with us for any inquiries or feedback.</h4>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
          type="text" 
          id="name" 
          name="name" 
          placeholder='Your Name'
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
          type="email" 
          id="email" 
          name="email"
          placeholder='Your Email' 
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea 
          id="message" 
          name="message"
          placeholder='Write your message here' 
          rows="6" 
          style={{ width: '99%', borderRadius: "10px", border: "2px solid black", }}/>
        </div>
        <button className={style.button} type="submit">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Contact;