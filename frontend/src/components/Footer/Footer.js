/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Footerstyle.css";

const Footer = () => {
  return (
    <div className="footer">
      {/* <div className="Box">
        <div className="Row">
          <div className="Column0">
            <p className="Heading">
              <i className="fab fa-react"></i> offExam
            </p>
            <a className="FooterLink" href="#">
              <strong className="my-color">Get Latest Updates</strong>
            </a>
            <form
              action="mailto:someone@example.com"
              method="post"
              encType="text/plain"
            >
              <div className="wrapper1">
                <input
                  className="email"
                  placeholder="Your Email Id"
                  type="text"
                  name="email"
                />
                <input type="submit" value="Email Me!" />
              </div>
            </form>
          </div>
          <div className="Column2">
            <div className="Column">
              <p className="Heading">offExam</p>
              <a className="FooterLink" href="#">
                Explore
              </a>
              <a className="FooterLink" href="#">
                How it Works
              </a>
              <a className="FooterLink" href="#">
                Contact Us
              </a>
            </div>
            <div className="Column">
              <p className="Heading">Support</p>
              <a className="FooterLink" href="#">
                Help Center
              </a>
              <a className="FooterLink" href="#">
                Terms of Service
              </a>
              <a className="FooterLink" href="#">
                Legal
              </a>
              <a className="FooterLink" href="#">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div> */}
      <div className="Box">
        <div className="Row1">
          <div className="Heading1">
            <strong className="my-color">
              offExam, Inc. All rights reserved.
            </strong>
          </div>
          <div className="Column1">
            <a className="FooterLink1" href="#">
              <i className="fab fa-facebook-f fa-lg my-color"></i>
            </a>
            <a className="FooterLink1" href="#">
              <i className="fab fa-instagram fa-lg my-color"></i>
            </a>
            <a className="FooterLink1" href="#">
              <i className="fab fa-twitter fa-lg my-color"></i>
            </a>
            <a className="FooterLink1" href="#">
              <i className="fab fa-youtube fa-lg my-color"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
