import * as React from "react";
import { File } from "../../graphql-types";
import Img from "gatsby-image";
import * as styles from "../../styles/Footer.module.scss";

interface FooterProps {
  footerImg: File;
}

const Footer: React.SFC<FooterProps> = ({ footerImg }) => {
  const {
    childImageSharp: { sizes }
  } = footerImg;
  return (
    <div className={styles.Footer}>
      <div className={styles.FooterWrapper}>
        <div className={styles.Email}>
          <h4>
            <span>speak</span>
            with us
          </h4>
          <form>
            <div className={styles.FormTop}>
              <input
                type="email"
                placeholder="Your email address"
                name="email"
              />
              <input type="text" placeholder="Your name" name="name" />
            </div>
            <textarea
              name="message"
              id=""
              cols={30}
              rows={5}
              placeholder="What would you like to say to us?"
            />
            <button>
              Send <i className="fas fa-paper-plane" />
            </button>
          </form>
        </div>
        <div className={styles.Twitter}>
          <h4>
            <span>on</span>
            twitter
          </h4>
          <div className={styles.TwitterContent}>
            <h4>Under construction...</h4>
          </div>
        </div>
      </div>
      <Img
        sizes={sizes}
        style={{
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: "-1"
        }}
      />
      <div className={styles.License}>
        <div>
          <span>
            Copyright <span>Autumn Interactive</span> © 2018{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
