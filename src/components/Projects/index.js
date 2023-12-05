import Loader from 'react-loaders';
import './index.scss';
import wordCollage from '../../assets/images/wordCollage.png';
import AnimatedLetters from '../AnimatedLetters';
import { useEffect, useState } from 'react';

const Projects = () => {
    
    const title = "Projects."
    const titleArray = Array.from({length: title.length}, (_, i) => title[i])

    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
    }, [])
    
    return (
        <>
        <div className='container projects-page'>
            <div className='text-zone'>
                <h1>
                    <AnimatedLetters letterClass={letterClass} strArray={titleArray} idx={15} />
                </h1>
                <p>
                    This is a compilation of some projects I have worked on. They come from both academic projects at Binghamton University and personal endevors. I plan on continuously expanding this list as I master more skills. To view the source code of any project listed, click on the project's name. Not all of my projects are listed here, so make sure to check out my other repositories by using the Github link at the bottom of the left navigation bar.
                </p>
                <hr className='main-break'></hr>
                <div className='scroll project-list'>
                    <div className='project-desc project1'>
                        <a href='https://github.com/thenateshow/nathaniel-greene-dot-org' target="_blank" rel="noopener noreferrer"><h2><b><u>Personal Website</u></b></h2></a>
                        <h4>React / SCSS / HTML</h4>
                        <p>This website is a visualization of my resume, projects, and development abilities. As my project experience grows, the page will continue to showcase my new work. It is also a place for me to implement new web design features as I learn and experiment with them.</p>
                    </div>
                    <br></br>
                    <hr className='sub-break'></hr>
                    <div className='project-desc project2'>
                        <a href='https://github.com/thenateshow/nfl-predictions-ml' target="_blank" rel="noopener noreferrer"><h2><b><u>NFL Predictions Using Machine Learning Algorithms</u></b></h2></a>
                        <h4>Java / CSV / Machine Learning</h4>
                        <p>The NFL Predictor was a project developed for my Intro to Machine Learning class at Binghamton University. Using a publicly available dataset, this program trained different machine learning algorithms in order to create models used to predict future football games.</p>
                    </div>
                    <br></br>
                    <hr className='sub-break'></hr>
                    <div className='project-desc project3'>
                        <a href='https://github.com/thenateshow/solitaire' target="_blank" rel="noopener noreferrer"><h2><b><u>Solitaire</u></b></h2></a>
                        <h4>Python / Terminal</h4>
                        <p>A text-based game of solitaire that can be ran and played in a terminal window.</p>
                    </div>
                    <br></br>
                    <hr className='sub-break'></hr>
                    <div className='project-desc project4'>
                        <a href='https://github.com/thenateshow/project-euler-solutions' target="_blank" rel="noopener noreferrer"><h2><b><u>Project Euler</u></b></h2></a>
                        <h4>JavaScript / Java</h4>
                        <p>Project Euler is an archive of challenging math-based problems solvable only by efficiently coded solutions. This repository contains my solutions to some of the problems, and will continue to grow as I work through more.</p>
                    </div>
                    <br></br>
                    <hr className='sub-break'></hr>
                    <div className='project-desc project5'>
                        <a href='https://github.com/thenateshow/mate-in-1-or-2' target="_blank" rel="noopener noreferrer"><h2><b><u>Checkmate Chess Engine</u></b></h2></a>
                        <h4>C / File Parsing</h4>
                        <p>This chess engine takes an input string outlining a current chess board layout and will determine if there is a possibility of a checkmate after 1 move, or checkmate after 2 moves. It is capable of reading a file containing many lines of inputs.</p>
                    </div>
                </div>
            </div>
            <div className='word-image'>
                <img src={wordCollage} alt='Word Collage'/>
            </div>
        </div>
        <Loader type='line-scale' />
        </>
    )
}

export default Projects