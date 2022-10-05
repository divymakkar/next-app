import Image from "next/image";
import React from "react";

function Footer() {
  const noLogo = true;
  return (
    <footer
      id="footer"
      className={`footer <%= local_assigns[:no_links] ? "no-links" : "" %>"`}
    >
      <div className="container">
        <div className="pre-footer">
          <div className="row">
            <div className="col">
              <p className="footer-titles">ABOUT THRILLOPHILIA</p>
              <ul className="footer-list">
                <li>
                  <a href="/about-us" target="_blank">
                    ABOUT US
                  </a>
                </li>
                <li>
                  <a href="/careers" target="_blank">
                    WE ARE HIRING
                  </a>
                </li>
                <li>
                  <a href="/reviews" target="_blank">
                    THRILLOPHILIA REVIEWS
                  </a>
                </li>
                <li>
                  <a href="/terms-and-conditions" target="_blank">
                    TERMS & CONDITIONS
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" target="_blank">
                    PRIVACY POLICIES
                  </a>
                </li>
                <li>
                  <a href="/copyright-policies" target="_blank">
                    COPYRIGHT POLICIES
                  </a>
                </li>
                <li>
                  <a
                    href="https://thrillophilia.freshdesk.com/support/home"
                    target="_blank"
                  >
                    SUPPORT
                  </a>
                </li>
                <li>
                  <a className="onclick-link footer-link" href="/apps">
                    APPS
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <p className="footer-titles">FOR SUPPLIERS</p>
              <ul className="footer-list">
                <li>
                  <a className="footer-link" target="_blank" href="/suppliers">
                    LIST YOUR ACTIVITIES
                  </a>
                </li>
              </ul>
              <p className="footer-titles">FOR BRANDS</p>
              <ul className="footer-list">
                <li>
                  <a
                    className="footer-link"
                    target="_blank"
                    href="/advertise-with-us"
                  >
                    PARTNER WITH US
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link"
                    target="_blank"
                    href="/destination-marketing"
                  >
                    DESTINATION MARKETING
                  </a>
                </li>
              </ul>
              <p className="footer-titles">FOR TRAVEL AGENTS</p>
              <ul className="footer-list">
                <li>
                  <a
                    className="onclick-link footer-link"
                    href="https://partners.thrillophilia.com"
                  >
                    SIGN UP AS A AGENT
                  </a>
                </li>
                <li>
                  <a
                    className="onclick-link footer-link"
                    href="https://partners.thrillophilia.com/admin/login"
                  >
                    AGENT LOGIN
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <p className="footer-titles">FOR TRAVELLERS</p>
              <ul className="footer-list">
                <li>
                  <a
                    className="onclick-link footer-link gift-link"
                    href="/go-to-gift-page"
                  >
                    Gift an Experience
                  </a>
                </li>
              </ul>
            </div>
            <div className="col destination">
              <p className="footer-titles">TRAVEL DESTINATIONS</p>
              <div className="nearby-places-list">
                <div className="col">
                  <div className="nearby-places-item">
                    <Image
                      className="nearby-places-item-image"
                      src="/images/bali.png"
                      layout="fill"
                      alt="bali"
                    />

                    <a
                      className="onclick-link footer-link"
                      href="/states/bali-state"
                    >
                      <span className="caption">BALI</span>
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="nearby-places-item">
                    <Image
                      className="nearby-places-item-image"
                      src="/images/dubai.png"
                      layout="fill"
                      alt="dubai"
                    />
                    <a
                      className="onclick-link footer-link"
                      href="/cities/dubai"
                    >
                      <span className="caption">DUBAI</span>
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="nearby-places-item">
                    <Image
                      className="nearby-places-item-image"
                      src="/images/singapore.png"
                      layout="fill"
                      alt="singapore"
                    />
                    <a
                      className="onclick-link footer-link"
                      href="/countries/singapore"
                    >
                      <span className="caption">SINGAPORE</span>
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="nearby-places-item">
                    <Image
                      className="nearby-places-item-image"
                      src="/images/thailand.png"
                      layout="fill"
                      alt="thailand"
                    />
                    <a
                      className="onclick-link footer-link"
                      href="/countries/thailand"
                    >
                      <span className="caption">THAILAND</span>
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="nearby-places-item">
                    <Image
                      className="nearby-places-item-image"
                      src="/images/andaman.png"
                      layout="fill"
                      alt="andaman"
                    />
                    <a
                      className="onclick-link footer-link"
                      href="/states/andaman-and-nicobar-islands"
                    >
                      <span className="caption">ANDAMAN</span>
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="nearby-places-item">
                    <Image
                      className="nearby-places-item-image"
                      src="/images/india.png"
                      layout="fill"
                      alt="india"
                    />
                    <a
                      className="onclick-link footer-link"
                      href="/countries/india"
                    >
                      <span className="caption">INDIA</span>
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="nearby-places-item">
                    <Image
                      className="nearby-places-item-image"
                      src="/images/ladakh.png"
                      layout="fill"
                      alt="ladakh"
                    />
                    <a
                      className="onclick-link footer-link"
                      href="/cities/ladakh"
                    >
                      <span className="caption">LADAKH</span>
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="nearby-places-item">
                    <Image
                      className="nearby-places-item-image"
                      src="/images/hongkong.png"
                      layout="fill"
                      alt="hongkong"
                    />
                    <a
                      className="onclick-link footer-link"
                      href="/countries/hong-kong"
                    >
                      <span className="caption">HONGKONG</span>
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="nearby-places-item">
                    <Image
                      className="nearby-places-item-image"
                      src="/images/srilanka.png"
                      layout="fill"
                      alt="srilanka"
                    />
                    <a
                      className="onclick-link footer-link"
                      href="/countries/srilanka"
                    >
                      <span className="caption">SRI LANKA</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {noLogo && (
          <div className="footer-content">
            <div className="footer-logo">
              <a href="/" className="logo-link">
                <div className="thrillo-logo white-logo desktop-logo"></div>
              </a>
            </div>
            <ul className="social-list">
              <li>
                <a
                  className="onclick-link footer-link"
                  href="https://www.facebook.com/Adventure.India.Thrillophilia"
                >
                  <span className="icon-facebook-circle"></span>
                </a>
              </li>
              <li>
                <a
                  className="onclick-link footer-link"
                  href="https://www.instagram.com/thrillophilia/"
                >
                  <span className="icon-instagram-circle"></span>
                </a>
              </li>
              <li>
                <a
                  className="onclick-link footer-link"
                  href="https://twitter.com/thrillophilia"
                >
                  <span className="icon-twitter-circle"></span>
                </a>
              </li>
              <li>
                <a
                  className="onclick-link footer-link"
                  href="https://in.linkedin.com/company/thrillophilia-adventure-tours-pvt.-ltd."
                >
                  <span className="icon-linkedin-circle"></span>
                </a>
              </li>
              <li>
                <a
                  className="onclick-link footer-link"
                  href="https://www.youtube.com/channel/UC8MbRQQdYhNwOFeXmpK5UBw"
                >
                  <span className="icon-youtube-circle"></span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="reserved">
        <div className="container">
          <span className="caption">
            {`© ${new Date().getFullYear()} `}
            <a href="/">Thrillophilia.com</a> All rights reserved.
          </span>
          <p>
            The content and images used on this site are copyright protected and
            copyrights vests with the respective owners. The usage of the
            content and images on this website is intended to promote the works
            and no endorsement of the artist shall be implied. Unauthorized use
            is prohibited and punishable by law.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
