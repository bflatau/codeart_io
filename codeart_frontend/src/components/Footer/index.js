import React from 'react';
import './styles.scss';

//ICONS
import { FaFacebookF } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaHouzz } from 'react-icons/fa';
import { FaPinterest } from 'react-icons/fa';

const AppFooter = () => (
  <div className="app-footer-container">

    {/* <div className="footer-info-text-container">
      © {new Date().getFullYear()} A Ben Flatau Joint
    </div> */}

    <div className="footer-designed-by-container">
      Designed and Built by{' '}
      <a className="footer-link" href="http://arch-folio.com" target="_blank">
        Arch-Folio.com {' '} 
      </a>
      © {new Date().getFullYear()}
    </div>
  </div>
);

export default AppFooter;
