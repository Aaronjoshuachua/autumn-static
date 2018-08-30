import * as React from "react";
import Layout from "../components/Layout";
import Img from "gatsby-image";
import PageTitle from "../components/PageTitle";
import GalleryCard from "../components/Gallery/GalleryCard";
import {
  MarkdownRemark,
  File,
  FileConnection,
  Frontmatter_2
} from "../graphql-types";

import * as styles from "../styles/_pages/news.module.scss";

interface NewsTemplateProps {
  location: {
    pathname: string;
  };
  data: {
    markdown: MarkdownRemark;
    background: File;
    galleryImgs: FileConnection;
    newsImgs: FileConnection;
  };
  logo: File;
  footerImg: File;
}

const getMainImg = (
  newsImgs: FileConnection,
  frontmatter: Frontmatter_2
): File => {
  const imgsArray = [];
  newsImgs.edges.map(({ node: file }) => imgsArray.push(file));
  return imgsArray.filter(
    item => item.relativePath === frontmatter.postimage.slice(14)
  )[0];
};

const NewsTemplate: React.SFC<NewsTemplateProps> = props => {
  const { background, markdown, galleryImgs, newsImgs } = props.data;
  const { pathname } = props.location;
  const { logo, footerImg } = props;
  const post = markdown;

  const mainImg = getMainImg(newsImgs, markdown.frontmatter);

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
          <Img sizes={mainImg.childImageSharp.sizes} />
          <div className={styles.PostDetails}>
            <div className={styles.Author}>
              <span>By:</span>
              <span>
                <strong>{post.frontmatter.author}</strong>
              </span>
            </div>
            <div className={styles.Date}>
              <i className="fas fa-calendar-alt" />
              <span>
                <strong>{post.frontmatter.date}</strong>
              </span>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <GalleryCard galleryImgs={galleryImgs} />
      </main>
    </Layout>
  );
};

export default NewsTemplate;

export const query = graphql`
  query NewsTemplate($path: String!) {
    markdown: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        path
        postimage
        author
        date(formatString: "MMMM DD, YYYY")
      }
    }
    background: file(relativePath: { eq: "bg-news.png" }) {
      childImageSharp {
        sizes(maxWidth: 1240) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    newsImgs: allFile(filter: { absolutePath: { regex: "/images/(news-)(.*[.])/" } }) {
      edges {
        node {
          id
          relativePath
          childImageSharp {
            sizes(maxWidth: 800) {
              ...GatsbyImageSharpSizes
            }
          }
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
