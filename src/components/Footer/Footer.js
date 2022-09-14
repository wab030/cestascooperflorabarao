import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import Colors from "../../constants/Colors";


import './Footer.css';

const Footer = () => {
  return (
    <div className="Footer">
      <a href='https://www.facebook.com/Cooperflora1'><FiFacebook className='Icon' color='white' /></a>
      {/* <FiInstagram className='Icon' color={Colors.primary} />
      <FiTwitter className='Icon' color={Colors.primary} /> */}
      {/* <AiOutlineMail className='Icon' color={Colors.primary} /> */}
      <a className='Developer' href="albordignon@gmail.com">Site Desenvolvido por A.L. Bordignon</a>
      <p class='License'>Licensed under GNU GPLv3 | <a href='https://github.com/wab030/cestascooperflorabarao'>download the source here</a></p>
    </div>
  );
}

export default Footer;
