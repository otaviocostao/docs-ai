import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterArea from '../../components/FooterArea/FooterArea'
import InfoArea from '../../components/InfoArea/InfoArea'
import NavBar from '../../components/navbar/NavBar'
import StepsSection from '../../components/StepsSection/StepsSection'
import UploadArea from '../../components/UploadArea/UploadArea'
import './Home.css';

const Home = () => {

  return (
    <div className="home-container">
        <NavBar />
        <InfoArea />
        <UploadArea />
        <StepsSection />
        <FooterArea />
    </div>
  );
};

export default Home;