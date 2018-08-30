import * as React from "react";
import { GatsbyLinkProps } from "gatsby-link";
import { MenuItem } from "../types";

interface NavLinkProps {
  Link: React.ComponentClass<GatsbyLinkProps>;
  item: MenuItem;
}

const NavItem: React.SFC<NavLinkProps> = props => {
  const { item, Link } = props;
  return (
    <li>
      <Link to={item.path}>
        <h5>{item.name}</h5>
      </Link>
    </li>
  );
};

export default NavItem;
