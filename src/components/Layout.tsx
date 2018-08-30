import * as React from "react";
import Helmet from "react-helmet";
import Img from "gatsby-image";
import Link from "gatsby-link";
import * as styles from "../styles/Layout.module.scss";
import * as types from "./types";

/* components */
import HeaderMenu from "./Menu/Header";
import SliderMenu from "./Menu/Slider";
import BreadCrumbs from "./BreadCrumbs";

import { File } from "../graphql-types";

/* styles */
import "../styles/_global/responsive.css";
import Carousel from "./Carousel";
import Footer from "./Footer/Footer";

interface LayoutProps {
  images: File;
  pathname: string;
  children: any;
  logo: File;
  footerImg: File;
}

export const menuItems: types.MenuItem[] = [
  { name: "Home", path: "/", exact: true },
  { name: "About", path: "/about", exact: true },
  { name: "News", path: "/news/", exact: false },
  { name: "Gallery", path: "/gallery", exact: true },
  { name: "Careers", path: "/careers", exact: true }
];

const placeholderImgs: string[] = [
  "https://cdn-html.nkdev.info/goodgames/assets/images/slide-1.jpg",
  "https://cdn-html.nkdev.info/goodgames/assets/images/slide-2.jpg",
  "https://cdn-html.nkdev.info/goodgames/assets/images/slide-3.jpg",
  "https://cdn-html.nkdev.info/goodgames/assets/images/slide-4.jpg",
  "https://cdn-html.nkdev.info/goodgames/assets/images/slide-5.jpg"
];

export default class extends React.Component<LayoutProps> {
  public render() {
    const { pathname, images, logo, footerImg } = this.props;
    const { sizes } = images.childImageSharp;

    return (
      <React.Fragment>
        <Helmet defaultTitle={"Autumn Interactive"}>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
            integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
            // ignoring the following line because of ts not picking up link jsx with react-helmet
            // @ts-ignore
            crossorigin="anonymous"
          />
        </Helmet>
        <div className={styles.Body}>
          <HeaderMenu
            items={menuItems}
            Link={Link}
            pathname={pathname}
            logo={logo}
          />
          <SliderMenu
            items={menuItems}
            Link={Link}
            pathname={pathname}
            logo={logo}
          />
          {this.getCarousel(pathname, placeholderImgs)}
          <div className={this.getLayoutStyles(pathname)}>
            {this.getBreadCrumbs(pathname)}
            {this.props.children}
          </div>
          <Footer footerImg={footerImg} />
          <Img
            sizes={sizes}
            style={{
              left: 0,
              position: "absolute",
              top: 0,
              width: "100%",
              zIndex: "-1"
            }}
          />
        </div>
      </React.Fragment>
    );
  }

  private getCarousel(pathname: string, imgs: string[]): any | null {
    return pathname === "/" ? <Carousel images={imgs} /> : null;
  }

  private getBreadCrumbs(pathname: string): any | null {
    return pathname !== "/" ? <BreadCrumbs /> : null;
  }

  private getLayoutStyles(pathname: string): string {
    return pathname !== "/"
      ? styles.Layout
      : [styles.Layout, styles.Index].join(" ");
  }
}
