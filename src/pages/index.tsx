import * as React from "react";
import Layout from "../components/Layout";
import { PageProps } from "../components/types";
import { CardTitle } from "../components/CardTitle";
import Helmet from "react-helmet";

const IndexPage: React.SFC<PageProps> = props => {
  const { background, site } = props.data;
  const { logo, footerImg } = props;

  return (
    <Layout
      pathname={props.location.pathname}
      images={background}
      logo={logo}
      footerImg={footerImg}
    >
      <Helmet title={`Home | ${site.siteMetadata.title}`} />
      {/* <CardTitle title={"mission"} prefix="Our"/> */}
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexPage {
    background: file(relativePath: { eq: "bg-home.png" }) {
      childImageSharp {
        sizes(maxWidth: 1240) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    about: markdownRemark(frontmatter: { path: { eq: "/about" }}) {
      html
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
