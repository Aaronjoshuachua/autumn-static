import * as React from "react";
import { GatsbyLinkProps } from "gatsby-link";
import { File, Site } from "../graphql-types";

export interface MenuItem {
  name: string;
  path: string;
  exact: boolean;
}

export interface MenuProps {
  logo: File;
  Link: React.ComponentClass<GatsbyLinkProps>;
  items: MenuItem[];
  pathname: string;
}

export interface DataProps {
  background: File;
  site: Site;
}

export interface PageProps {
  location: {
    pathname: string;
    search: string;
  };
  data: DataProps;
  logo: File;
  footerImg: File;
}
