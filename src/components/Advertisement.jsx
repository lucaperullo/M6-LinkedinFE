import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import "./styles/Advertisement.css";

function Advertisement() {
  return (
    <div className="wrapper sticky-top">
      <div className="add"></div>
      <Container>
        <Row>
          <Col>
            <div className="ul_list" style={{ lineHeight: 2, padding: "30px" }}>
              <ul>
                <li className="global-footer-compact__item">
                  <a
                    tabindex="0"
                    data-control-name="compactfooter.about"
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://about.linkedin.com"
                    id="compactfooter-about"
                    className="global-footer__link t-12 t-normal ember-view"
                  >
                    <span>About</span>
                  </a>
                </li>
                <li className="global-footer-compact__item">
                  <a
                    tabindex="0"
                    data-control-name="compactfooter.accessibility"
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.linkedin.com/accessibility"
                    id="compactfooter-accessibility"
                    className="global-footer__link t-12 t-normal ember-view"
                  >
                    <span>Accessibility</span>
                  </a>
                </li>
                <li className="global-footer-compact__item">
                  <a
                    tabindex="0"
                    data-control-name="compactfooter.accessibility"
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.linkedin.com/accessibility"
                    id="compactfooter-accessibility"
                    className="global-footer__link t-12 t-normal ember-view"
                  >
                    <span>Help Center</span>
                  </a>
                </li>
                <li className="global-footer-compact__item">
                  <a
                    tabindex="0"
                    data-control-name="compactfooter.accessibility"
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.linkedin.com/accessibility"
                    id="compactfooter-accessibility"
                    className="global-footer__link t-12 t-normal ember-view"
                  >
                    <span>Privacy & Terms</span>
                  </a>
                </li>
                <li className="global-footer-compact__item">
                  <a
                    tabindex="0"
                    data-control-name="compactfooter.accessibility"
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.linkedin.com/accessibility"
                    id="compactfooter-accessibility"
                    className="global-footer__link t-12 t-normal ember-view"
                  >
                    <span>Ad Choices</span>
                  </a>
                </li>
                <li className="global-footer-compact__item">
                  <a
                    tabindex="0"
                    data-control-name="compactfooter.accessibility"
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.linkedin.com/accessibility"
                    id="compactfooter-accessibility"
                    className="global-footer__link t-12 t-normal ember-view"
                  >
                    <span>Advertising</span>
                  </a>
                </li>
                <li className="global-footer-compact__item">
                  <a
                    tabindex="0"
                    data-control-name="compactfooter.accessibility"
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.linkedin.com/accessibility"
                    id="compactfooter-accessibility"
                    className="global-footer__link t-12 t-normal ember-view"
                  >
                    <span>Business Services</span>
                  </a>
                </li>
                <li className="global-footer-compact__item">
                  <a
                    tabindex="0"
                    data-control-name="compactfooter.accessibility"
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.linkedin.com/accessibility"
                    id="compactfooter-accessibility"
                    className="global-footer__link t-12 t-normal ember-view"
                  >
                    <span>Get the LinkedIn</span>
                  </a>
                </li>
                <li className="global-footer-compact__item">
                  <a
                    tabindex="0"
                    data-control-name="compactfooter.accessibility"
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.linkedin.com/accessibility"
                    id="compactfooter-accessibility"
                    className="global-footer__link t-12 t-normal ember-view"
                  >
                    <span>More</span>
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row style={{ alignItems: "center" }} className="ml-5">
          <img
            className="img_footer_home"
            src="https://www.vectorlogo.zone/logos/linkedin/linkedin-ar21.svg"
            alt=""
          />
          <span style={{ fontSize: 11 }} className="copyright">
            LinkedIn Corporation © 2021
          </span>
        </Row>
      </Container>
    </div>
  );
}

export default Advertisement;
