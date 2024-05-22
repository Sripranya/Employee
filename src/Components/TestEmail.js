import { useState } from 'react';
import emailjs from '@emailjs/browser';

function TestEmail() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const serviceId = 'service_1z6g35a';
        const templateId = 'template_wwbn91k';
        const userId = '5dCYy2nTf2hjOK451';
        const templateParams = {
            to_Subject:'Testing',
            from_name: name,
            to_email: email,  
            message: message
        };

        emailjs.send(serviceId, templateId, templateParams, userId)
            .then((res) => {
                console.log('Email sent successfully!');
                setName('');
                setEmail('');
                setMessage('');
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text"  placeholder="Enter your name" value={name}  onChange={(e) => setName(e.target.value)}/><br />
                <label>Email</label>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/><br />
                <label>Message</label>
                <input type="text"  placeholder="Enter your message"  value={message}   onChange={(e) => setMessage(e.target.value)}/><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default TestEmail;
