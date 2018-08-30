import * as React from "react";
import { MenuProps } from "../types";
import Img from "gatsby-image";
import NavLink from "./NavLink";

import * as styles from "../../styles/Menu.module.scss";

interface HeaderMenuState {
  scroll: boolean;
}

class Header extends React.Component<MenuProps, HeaderMenuState> {
  public render() {
    const logoItem = this.props.items[0];
    const { Link, logo } = this.props;

    return (
      <React.Fragment>
        <header className={styles.Header}>
          <div className={styles.Container}>
            <div>
              <Link to={logoItem.path}>
                <Img
                  sizes={logo.childImageSharp.sizes}
                  style={{ width: "100%", height: "100%" }}
                />
              </Link>
            </div>
            {this.getNavItems()}
          </div>
        </header>
      </React.Fragment>
    );
  }

  private getNavItems() {
    const { Link } = this.props;

    return (
      <ul className="mobile hidden">
        {this.props.items.map((item, index) => {
          /* ignoring the home link in item props */
          if (index !== 0) {
            return <NavLink key={index} item={item} Link={Link} />;
          }
        })}
      </ul>
    );
  }
}

export default Header;
