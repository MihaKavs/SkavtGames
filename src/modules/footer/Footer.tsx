import React from "react";
import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import LinkIcon from "@mui/icons-material/Link";
function Footer() {
  return (
    <div className="footer-container">
      <ul className="footer-list">
        <li className="link-element">
          <InstagramIcon></InstagramIcon> <p className="link-text">Instagram</p>
        </li>
        <li className="link-element">
          <FacebookIcon></FacebookIcon>
          <p className="link-text">Facebook</p>
        </li>
        <li className="link-element">
          <EmailIcon></EmailIcon>
          <p className="link-text">Mail</p>
        </li>
        <li className="link-element">
          <img src="/tiktok.svg" className="tiktok-svg"></img>
          <p className="link-text">TikTok</p>
        </li>
        <li className="link-element">
          <LinkIcon></LinkIcon>
          <p className="link-text">Povezave</p>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
