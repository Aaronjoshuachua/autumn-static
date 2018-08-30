import * as React from "react";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import Img from "gatsby-image";
import Helmet from "react-helmet";
import { MarkdownRemark, File, FileConnection, Site } from "../graphql-types";

import * as styles from "../styles/_pages/about.module.scss";
import { CardTitle } from "../components/CardTitle";

interface AboutTemplateProps {
  location: {
    pathname: string;
  };
  data: {
    markdown: MarkdownRemark;
    background: File;
    galleryImgs: FileConnection;
    memberImgs: FileConnection;
    site: Site;
  };
  logo: File;
  footerImg: File;
}

const photoStyle = {
  borderRadius: "50%",
  objectFit: "cover"
};

const AboutTemplate: React.SFC<AboutTemplateProps> = props => {
  const { background, markdown, memberImgs, site } = props.data;
  const { pathname } = props.location;
  const { logo, footerImg } = props;
  const about = markdown;

  const imgsArray = [];
  memberImgs.edges.map(({ node: file }) => imgsArray.push(file));

  const getTeamMembers = () =>
    about.frontmatter.members.map(member =>
      imgsArray
        .filter(item => item.relativePath === member.photo.slice(14))
        .map((item, ii) => (
          <div className={styles.ProfileCard} key={ii}>
            <Img
              resolutions={item.childImageSharp.resolutions}
              imgStyle={photoStyle}
            />
            <div className={styles.ProfileInner}>
              <h3 className={styles.Name}>{member.fullname}</h3>
              <h4 className={styles.Position}>{member.position}</h4>
              <p className={styles.Divider} />
              <p className={styles.Bio}>{member.bio}</p>
            </div>
          </div>
        ))
    );

  return (
    <Layout
      pathname={pathname}
      images={background}
      logo={logo}
      footerImg={footerImg}
    >
      <Helmet title={`About | ${site.siteMetadata.title}`} />
      <PageTitle title="About us" />
      <main className={styles.Columns}>
        <div className={styles.Template}>
          <div dangerouslySetInnerHTML={{ __html: about.html }} />
          <CardTitle title={about.frontmatter.title} prefix="meet" />
          <div className={styles.TeamMembers}>{getTeamMembers()}</div>
        </div>
      </main>
    </Layout>
  );
};

export default AboutTemplate;

export const query = graphql`
  query AboutTemplate($path: String!) {
    markdown: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        path
        members {
          photo
          fullname
          position
          bio
        }
      }
    }
    background: file(relativePath: { eq: "bg-news.png" }) {
      childImageSharp {
        sizes(maxWidth: 1240) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    memberImgs: allFile(
      filter: { absolutePath: { regex: "/images/(member-)(.*[.])/" } }
    ) {
      edges {
        node {
          absolutePath
          relativePath
          childImageSharp {
            resolutions(width: 100, height: 100) {
              ...GatsbyImageSharpResolutions
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
