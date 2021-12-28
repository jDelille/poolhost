import React from 'react'
import './About.css'

function About() {
 return (
  <div className='about-page'>
  <div className='about-content'>
   <h1 className='about-title'> About </h1>
   <h2 className='about-text'> NFL Poolhost is a website created with React and Google Firebase. It is a project I have been working on and is currently in its Beta phase. NFL Poolhost is an NFL Pick'em site that allows users to sign up, make picks, compete against other users, and also chat with those users. The data comes from the ESPN NFL API and is the most up to date NFL data. More updates will roll out in the future. Stay tuned to see what the updates bring. Enjoy! And thank you for checking out NFL Poolhost! </h2>
  </div>
   
   <div className='updates-container'>
    <div className='updates'>
      <h3> Updates </h3>
      <h3> - Upgraded leaderboard system </h3>
      <h3> - More profile customization </h3>
      <h3> - Private Pools </h3>
    </div>
   </div>
   <div className='contact-me-container'>
    {/* <h3> Have a question? <a href="#" className='contact-me'>Contact me!</a></h3> */}
    <h3> Check out my <a href="https://github.com/jDelille" target="_blank" className='github'>Github</a> </h3>
   </div>
  </div>
 )
}

export default About
