import React from 'react'
import '../Style/About.css'
import img from '../Images/1.jpg'
import video from '../Images/tech4.mp4'


const About = () => {
  return (
    <>

    {/* video section start */}
    <div className="video">
      <div className="video-background">
     <video src={video} id='background-video' autoPlay muted loop></video>
        <div className="content">
          <h2 className="video-content1">About My Hotel</h2>
          <p className="video-content">
      
            One of the clearest ways that a hotel can stand out from the
            competition and wow potential guests is with a great website. But if
            you’re staring at a blank screen with that goal in mind, that task can
            suddenly seem a lot more complicated. Whether you’re designing a new
            hotel website or trying to give yours a refresh, a little inspiration
            can go a long way towards making some meaningful progress.
          </p>
        </div>
      </div>
    </div>
    {/* video section end */}
    {/* about page start */}
    <section className="about">
      <div className="about-in">
        <div className="about-image">
          <img className="A-img" src={img} alt="Company Representative" />
        </div>
        <div className="about-content">
          <h2>About Our Hotel</h2>
          <p style={{ fontSize: 25 }}>
            My hotel is a commercial establishment that provides lodging, meals,
            and other services to guests, travelers, and tourists.
          </p>
          <button className="learn-more">Learn More</button>
        </div>
      </div>
      <div className="about-in-in">
        <div className="flip-card" data-aos="zoom-in-down">
          <div className="flip-card-inner">
            <div className="flip-card-back">
              <h1 className="about-room">Deluxe Room</h1>
              <p className="room-content">
              
                Any enclosed space within a number of walls to which entry is
                possible only via a door or other dividing structure
              </p>
            </div>
            <div className="flip-card-front">
              <img
                src={img}
                alt="Avatar"
                style={{ width: 300, height: 300 }}
              />
            </div>
          </div>
        </div>
        <div className="flip-card" data-aos="zoom-in-down">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img
                src={img}
                alt="Avatar"
                style={{ width: 300, height: 300 }}
              />
            </div>
            <div className="flip-card-back">
              <h1 className="about-room">Luxuery Room</h1>
              <p className="room-content">
                Any enclosed space within a number of walls to which entry is
                possible only via a door or other dividing structure
              </p>
            </div>
          </div>
        </div>
        <div className="flip-card" data-aos="zoom-in-down">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img
                src={img}
                alt="Avatar"
                style={{ width: 300, height: 300 }}
              />
            </div>
            <div className="flip-card-back">
              <h1 className="about-room">Sweet Room</h1>
              <p className="room-content">
                Any enclosed space within a number of walls to which entry is
                possible only via a door or other dividing structure
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* about page end */}

  </>
  
  )
}

export default About