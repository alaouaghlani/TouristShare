import React from 'react';
import '../assets/Home.css';

import { Link } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
function Home() {
  return (
    <div className="home">
      <div className="section1">
        <div className="slogan">
          <h1 className="title">Explore, Share, Adventure Everywhere!</h1>
            <Link to="/places" style={{ textDecoration: 'none', color: 'white' }}>
          <button className="btn btn-success my-btn">
            <LanguageIcon  className="rotate-on-hover"/>  Discover
          </button>
            </Link>
        </div>
      </div>

    </div>
  );
}

export default Home;
