import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import 'firebase/storage';
import 'firebase/app';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdOutlineVerified } from "react-icons/md";

const ImageModal = ({ email, verify}) => {
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate() 
  const [verified, setVerified] = useState(verify)
  useEffect(() => {
    // Replace with your Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBfx_T4WDJB4411wPLS9BrHjcM59fXNkJQ",
      authDomain: "taxicle-img.firebaseapp.com",
      projectId: "taxicle-img",
      storageBucket: "taxicle-img.appspot.com",
      messagingSenderId: "999134669505",
      appId: "1:999134669505:web:8d4789449f1c71fbb2c240",
      measurementId: "G-ERN066LXB1"
    };

    // Initialize Firebase app
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    // Reference to your Firebase Storage bucket with dynamic folder (email)
    const storageRef = ref(storage, email);

    const fetchImages = async () => {
      try {
        // List all items (images) in the Storage bucket
        const result = await listAll(storageRef);

        // Get download URLs for each image
        const urls = await Promise.all(
          result.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return url;
          })
        );

        // Set the image URLs in the state
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    // Fetch images when the component mounts
    fetchImages();
  }, [email]); // Include email in the dependency array to re-fetch when email changes

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true, // Enable center mode
    centerPadding: '0', // Adjust as needed
  };

  const handleApprove = (email) =>{
    axios.post('https://taxicleserver.onrender.com/admin-approve', {email}) 
    .then(res => {
      if(res.data.message === 'success') {
        setVerified(true)
      }
    }).catch(err => console.log(err))
  }
  
  return (
    <div className='slide-container'>
      {imageUrls.length > 0 && (
        <Slider {...settings}>
          {imageUrls.map((url, index) => (
            <div key={index} className='image_holder'>
              <img src={url} alt={`Slide ${index}`} style={{ width: '100%' }} />
            </div>
          ))}
        </Slider>
      )}
      {verified === false ?
      <div className='btn-container d-flex justify-content-center'>
            <button className='btn btn-success' onClick={() => handleApprove(email)}>Approve Application</button>
      </div>
      :
      <div className='btn-container d-flex justify-content-center'>
            <p style={{ontSize:'20px'}}><MdOutlineVerified  color='#4bb543' fontSize='30px'/> Verified</p>
      </div>
            }
    </div>
  );
};

export default ImageModal;
