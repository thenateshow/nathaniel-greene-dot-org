import "./index.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AnimatedLetters from "../AnimatedLetters";
import Logo from './Logo';
import Loader from "react-loaders";

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const nameArray = [' ', 'N', 'a', 't', 'h', 'a', 'n', 'i', 'e', 'l', ','];
    const jobArray = ['s','o','f','t','w','a','r','e',' ','d','e','v','e','l','o','p','e','r','.'];

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 5000)
    }, [])

    return (
        <>
        <div className="container home-page">
            <div className="text-zone">
                <h1>
                <span className={letterClass}>H</span>
                <span className={`${letterClass} _12`}>i,</span>
                <br/>
                <span className={`${letterClass} _13`}>I</span>
                <span className={`${letterClass} _14`}>'m</span>
                <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15}/>
                <br/>
                <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={27}/>
                </h1>
                <h2>Software Engineer / Backend / Java / Golang / REST API / Agile</h2>
                <Link to="/contact" className='flat-button'>Contact Me.</Link>
            </div>
            <Logo></Logo>
        </div>
        <Loader type="line-scale" />
        </>
    )
}

export default Home;