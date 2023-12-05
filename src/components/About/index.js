import { useEffect, useState } from 'react';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGolang, faJava, faJsSquare, faReact, faSass } from '@fortawesome/free-brands-svg-icons';
import Loader from 'react-loaders';

const About = () => {

    const title = "About Me."
    const titleArray = Array.from({length: title.length}, (_, i) => title[i])

    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
    }, [])
    
    return (
        <>
        <div className="container about-page">
            <div className="text-zone">
                <h1>
                <AnimatedLetters
                    letterClass={letterClass}
                    strArray={titleArray}
                    idx={15}
                />
                </h1>
                <p>I am a dedicated and motivated software engineer, specializing in backend development. I have heavy experience in Java, Golang, and SQL, as well as some experience with JavaScript, CSS, Python, and C++. </p>
                <p>As a backend engineer at a business-to-business ecommerce startup, I developed microservices supporting the homepages and product pages for a constantly growing customer base. My work includes RESTful APIs written primarily in Golang designed to retrieve configuration variables, product details, and dynamic content from other services or locations. My work involved the entire software development life cycle, including design, development, performance and integration testing, security review, and official release and continued support in the production environment.</p>
                <p>In addition to my backend work here, I was also a part of the analytics team, tasked with architecting and implementing a platform hosting live analytics viewable by customers. Using Microsoft Power BI, my team and I created dashboards and reports that pulled in up-to-date data from Snowflake using SQL. The reports were capable of automation, dispersal, and customization to fit any customers' needs.</p>
                <p>Throughout my internships, I gained valuable skills that will remain vital throughout my career. During my time with an IT service company, I mastered the automated testing suite SmartBear TestComplete, creating automated tests for Java-based applications. In my internship with a healthcare provider, I worked with the IT Security team triaging alerts and reviewing possible phishing emails. Security and testing are crucial pieces of the development process, and my internships have given me a solid foundation in these areas.</p>
                <p>I have a wide range of skills, built up through my academic work at Binghamton University, professional experiences, and personal projects, but my abilities are constantly growing. For example, developing this website helped strengthen my React, CSS (more specifically SCSS), and SVG manipulation skills. Even if I don't match your developer needs exactly, I am an ambitious engineer willinng to quickly learn any technologies required. I am passionate about my work, and am always eager to work on challenging projects and creative solutions.</p>
            </div>

            <div className='bouncing-logos'>
                <div className='bouncinglogos'>
                    <div className='topRow'>
                        <div className='topRowImg bounce1'>
                            <div className='iconContainer icon11'>
                                <FontAwesomeIcon icon={faJava} color='#5382a1' />
                            </div>
                        </div>
                        <div className='topRowImg bounce2'>
                            <div className='iconContainer icon12'>
                                <FontAwesomeIcon icon={faGithub} color="#fff" />
                            </div>
                        </div>
                        <div className='topRowImg bounce3'>
                            <div className='iconContainer icon13'>
                                <FontAwesomeIcon icon={faReact} color="#61dbfb" />
                            </div>
                        </div>
                    </div>
                    <div className='bottomRow'>
                        <div className='bottomRowImg bounce4'>
                            <div className='iconContainer icon21'>
                                <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
                            </div>
                        </div>
                        <div className='bottomRowImg bounce5'>
                            <div className='iconContainer icon22'>
                                <FontAwesomeIcon icon={faGolang} color="#29beb0" />
                            </div>
                        </div>
                        <div className='bottomRowImg bounce6'>
                            <div className='iconContainer icon23'>
                                <FontAwesomeIcon icon={faSass} color="#cd6799" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <Loader type="line-scale" />
        </>
    )
}

export default About;