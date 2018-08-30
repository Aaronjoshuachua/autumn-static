import * as React from "react";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import GalleryCard from "../components/Gallery/GalleryCard";
import { MarkdownRemark, File, FileConnection } from "../graphql-types";

import * as styles from "../styles/_pages/careers.module.scss";

interface CareersTemplateProps {
  location: {
    pathname: string;
  };
  data: {
    markdown: MarkdownRemark;
    background: File;
    galleryImgs: FileConnection;
  };
  logo: File;
  footerImg: File;
}

const CareersTemplate: React.SFC<CareersTemplateProps> = props => {
  const { background, markdown, galleryImgs } = props.data;
  const { pathname } = props.location;
  const { logo, footerImg } = props;
  const post = markdown;

  return (
    <Layout
      pathname={pathname}
      images={background}
      logo={logo}
      footerImg={footerImg}
    >
      <PageTitle title={post.frontmatter.title} />
      <main className={styles.Columns}>
        <div className={styles.Template}>
          <div className={styles.JobDetails}>
            <p>
              <span>
                <strong>Type of position:</strong>
              </span>
              <span>{post.frontmatter.jobtype}</span>
            </p>
            <p>
              <span>
                <strong>Date posted:</strong>
              </span>
              <span>{post.frontmatter.date}</span>
            </p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <GalleryCard galleryImgs={galleryImgs} />
      </main>
    </Layout>
  );
};

export default CareersTemplate;

export const query = graphql`
  query CareersTemplate($path: String!) {
    markdown: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        jobtype
        date
      }
    }
    background: file(relativePath: { eq: "bg-careers.png" }) {
      childImageSharp {
        sizes(maxWidth: 1240) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    galleryImgs: allFile(
      filter: { relativePath: { regex: "/gallery-/" } }
      limit: 6
    ) {
      edges {
        node {
          id
          ...GalleryCardFragment
        }
      }
    }
  }
`;
