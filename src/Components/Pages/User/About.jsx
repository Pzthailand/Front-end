import React from "react";
import { Link } from "react-router-dom";


import '../../Style/User/About.css'
//assets
import Sad from '../../../assets/About/Sad.png'
import Frontend from '../../../assets/About/Frontend.png'
import Backend from '../../../assets/About/Backend.png'
import Database from '../../../assets/About/Database.png'
import Project from '../../../assets/About/Project.png'
import Application from '../../../assets/About/Application.png'
import Study from '../../../assets/About/Study.png'
import Graduate from '../../../assets/About/Graduate.png'
import Bachelorsdegree from '../../../assets/About/Bachelors-degree.png'



function About(){
    return(
        <div>
        <div className="About-Title">About</div>

        <div className="About-container" >
            <b>Hello</b><div style={{marginLeft:10}}>i'm Developer Website & Application i'm Nickname Papzi 30 years old</div>
            <img src={Sad} />
            <p>I no experience</p>
        </div>

        <div style={{fontWeight:500,fontSize:25,textAlign:'center'}}>Website Skill</div>

        <div className="About-container" >
                <img src={Frontend} />
            <p>Frontend : Jsx , Redux , CSS</p>
        </div>

        <div className="About-container" >
                <img src={Backend} />
            <p>Backend : NodeJs : Express</p>
        </div>

        <div className="About-container" >
                <img src={Database} />
            <p>Database : Mysql , Mongodb</p>
        </div>

        <div className="About-container" >
                <img src={Project} />

                <div style={{display:"block",width:400}}>
                <p>Project</p>
                <p>Front-end : <a href="https://github.com/Pzthailand/Front-end.git" target="_blank">https://github.com/Pzthailand/Front-end.git</a></p>
                <p>Back-end : <a href="https://github.com/Pzthailand/Back-end.git" target="_blank">https://github.com/Pzthailand/Back-end.git</a></p>
                </div>
        </div>   
       

        <div className="About-Title">Application  Skill</div>

    
        <div className="About-container" >
                <img src={Application} />
            <p>Appplication : C# , Sqlconnector</p>
        </div>

        <div className="About-container" >
                <img src={Database} />
            <p>Database : Mysql</p>
        </div>

        <div className="About-Title">IT support</div>


        <div className="About-container" >  
            <p>Windows & Program installation</p>
        </div>

        <div className="About-container" >  
            <p>Software Troubleshoot</p>
        </div>

        <div className="About-container" >  
            <p>Hardware Troubleshoot</p>
        </div>


        <div className="About-Title">Specail skill</div>

        <div className="About-container" >  
            <p>Teamwork and collaboration</p>
        </div>

        <div className="About-container" >  
            <p>Active listening</p>
        </div>

        <div className="About-container" >  
            <p>Attention to detail</p>
        </div>
        

        <div className="About-Title">Education level</div>

        <div className="About-container" >
                <img src={Bachelorsdegree} />
            <p>Bachelor Degrees : Southeast Bangkok University</p>
        </div>

        <div className="About-container" >
                <img src={Graduate} />
            <p>Vocational certificate : Attawit Commercial Technology College</p>
        </div>

        <div className="About-container" >
                <img src={Study} />
            <p>Vocational certificate : Khonkaen Management Technology College</p>
        </div>

        </div>
    )
}

export default About