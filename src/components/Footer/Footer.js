import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import Colors from "../../constants/Colors";


import './Footer.css';

const Footer = () => {
  return (
    <div className="Footer">
      <a href='https://www.facebook.com/Cooperflora1'><FiFacebook className='Icon' color={Colors.primary} /></a>
      {/* <FiInstagram className='Icon' color={Colors.primary} />
      <FiTwitter className='Icon' color={Colors.primary} /> */}
      {/* <AiOutlineMail className='Icon' color={Colors.primary} /> */}
      <a className='Developer' href="albordignon">Site Desenvolvido por A.L. Bordignon</a>
    </div>
  );
}

export default Footer;
