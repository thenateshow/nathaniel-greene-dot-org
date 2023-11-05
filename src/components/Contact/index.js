import Loader from 'react-loaders';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser'
import Airplane from './Airplane';

const Contact = () => {

    const refForm = useRef()
    const sendEmail = (e) => {
        e.preventDefault()

        emailjs
        .sendForm(
            'service_qtx5yrb',
            'template_pib53os',
            refForm.current,
            'LIfRsNMAUUIKKlqxX'
        )
        .then(
            () => {
                alert('Message succsessfully sent!')
                window.location.reload(false)
            },
            () => {
                alert('Failed to send the message, please try again.')
            }
        )
    }

    const title = "Contact Me."
    const titleArray = Array.from({length: title.length}, (_, i) => title[i])

    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
    }, [])

    return (
        <>
            <div className='container contact-page'>
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters letterClass={letterClass} strArray={titleArray} idx={15}/>
                    </h1>
                    <p>
                        If you would like to get in contact with me or have any questions, please reach out using the form below.
                    </p>
                    <div className='contact-form'>
                        <form ref={refForm} onSubmit={sendEmail}>
                            <ul>
                                <li className='half'>
                                    <input type='text' name='name' placeholder='Name' required />
                                </li>
                                <li className='half'>
                                    <input type='email' name='email' placeholder='Email' required />
                                </li>
                                <li>
                                    <input type='text' name='subject' placeholder='Subject' required />
                                </li>
                                <li>
                                    <textarea placeholder='Message' name='message' required />
                                </li>
                                <li>
                                    <input type='submit' className='flat-button' value="SEND" />
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
                <Airplane></Airplane>
            </div>
        <Loader type='line-scale' />
        </>
    )
};

export default Contact;