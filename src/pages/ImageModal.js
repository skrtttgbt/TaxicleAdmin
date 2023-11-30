import React from 'react';
import { Modal, Carousel } from 'react-bootstrap';

function ImageModal({ showModal, handleCloseModal, selectedImages }) {
  return (
    <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
      <Modal.Body>
        <Carousel interval={null} ride="carousel">
          {selectedImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img src={image} alt={`Upload Image ${index + 1}`} className="d-block w-100" />
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
}

export default ImageModal;
