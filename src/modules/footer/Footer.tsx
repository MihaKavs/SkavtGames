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
          <a
            className="element-link"
            href="https://www.instagram.com/skavtibovec1?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
          >
            <InstagramIcon></InstagramIcon>{" "}
            <p className="link-text">Instagram</p>
          </a>
        </li>
        <li className="link-element">
          <a
            className="element-link"
            href="https://www.facebook.com/SkavtiBovec1"
            target="_blank"
          >
            <FacebookIcon></FacebookIcon>
            <p className="link-text">Facebook</p>
          </a>
        </li>
        <li className="link-element">
          <a
            className="element-link"
            href="https://www.tiktok.com/@skavti.bovec.1"
            target="_blank"
          >
            <img src="/tiktok.svg" className="tiktok-svg"></img>
            <p className="link-text">TikTok</p>
          </a>
        </li>
        <li className="link-element">
          <a
            className="element-link"
            href="https://linktr.ee/skavtibovec1?utm_source=linktree_profile_share&ltsid=7fd3b332-3330-4239-beda-92a0dad02212"
            target="_blank"
          >
            <LinkIcon></LinkIcon>
            <p className="link-text">Povezave</p>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
