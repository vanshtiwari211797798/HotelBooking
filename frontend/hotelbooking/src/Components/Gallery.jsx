import React, { useState } from 'react';
import img1 from '../Images/1.jpg';
import img2 from '../Images/2.jpg';
import '../Style/Gallery.css';
import vdo from '../Images/tech4.mp4'




const Gallery = () => {
  // Dynamic image data
  const images = [
    { src: img1, title: "Swimming Pool.." },
    { src: img2, title: "Hall.." },
    { src: img1, title: "Dining Table.." }
  
  ];

  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showDetails = (image) => {
    setModalImage(image.src);
    setModalTitle(image.title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>

      <section className="animation">
        <div className="div">
          <video className="img_1" src={vdo} autoPlay loop muted />
        </div>
      </section>
      <div className="main-container">
        <h1 className="gallery">Gallery</h1>
        <div className="box-container">
          {images.map((image, index) => (
            <div className="box" key={index}>
              <img
                src={image.src}
                className="img_2"
                title={image.title}
                alt={image.title}
                onClick={() => showDetails(image)}
              />
              <i
                className="fa-solid fa-magnifying-glass imag"
                onClick={() => showDetails(image)}
              />
            </div>
          ))}
        </div>
        {isModalOpen && (
          <div className="modal" id="none">
            <h1 style={{ cursor: "pointer" }} onClick={closeModal} className="close">
              ❌
            </h1>
            <h3 id="h3">{modalTitle}</h3>
            <img src={modalImage} id="noneimg" alt={modalTitle} />
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
