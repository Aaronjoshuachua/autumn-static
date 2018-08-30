import * as React from "react";
import { slide as Slide } from "react-burger-menu";
import Img from "gatsby-image";
import { MenuProps } from "../types";

import NavLink from "./NavLink";

import * as styles from "../../styles/Menu.module.scss";
import "../../styles/_global/burger.scss";

class Slider extends React.Component<MenuProps> {
  public render() {
    const logoItem = this.props.items[0];
    const { Link, logo } = this.props;

    return (
      <Slide
        burgerButtonClassName={"mobile only"}
        right={true}
        width={250}
        customCrossIcon={false}
      >
        <div className={styles.Slide}>
          <Link className={styles.Logo} to={logoItem.path}>
            <Img
              sizes={logo.childImageSharp.sizes}
              style={{ width: "100%", height: "100%" }}
            />
          </Link>
          {this.getNavItems()}
        </div>
      </Slide>
    );
  }

  private getNavItems() {
    const { Link } = this.props;

    return (
      <ul>
        {this.props.items.map((item, index) => {
          if (index !== 0) {
            return <NavLink key={index} item={item} Link={Link} />;
          }
        })}
      </ul>
    );
  }
}

export default Slider;
