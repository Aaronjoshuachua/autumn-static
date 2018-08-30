import * as React from "react";

import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import NewsIndex from "../components/News/NewsIndex";
import GalleryCard from "../components/Gallery/GalleryCard";
import Helmet from "react-helmet";

import {
  MarkdownRemarkConnection,
  File,
  FileConnection,
  Site
} from "../graphql-types";

import * as styles from "../styles/_pages/news.module.scss";

interface NewsProps {
  location: {
    pathname: string;
  };
  data: {
    markdowns: MarkdownRemarkConnection;
    background: File;
    galleryImgs: FileConnection;
    site: Site;
    newsImgs: FileConnection;
  };
  logo: File;
  footerImg: File;
}

const getNews = (markdowns: MarkdownRemarkConnection, imgsArray: File[]) => {
  if (markdowns === null) {
    return (
      <h4 style={{ color: "white", letterSpacing: "1px" }}>No news yet!</h4>
    );
  }
  return markdowns.edges.map(({ node }) => {
    const {
      frontmatter: { postimage }
    } = node;
    // access array before passing into newsindex
    const mainImg = imgsArray.filter(
      item => item.relativePath === postimage.slice(14)
    )[0];
    return (
      <NewsIndex
        images={mainImg}
        key={node.id}
        excerpt={node.excerpt}
        frontmatter={node.frontmatter}
      />
    );
  });
};

const NewsPage: React.SFC<NewsProps> = props => {
  const { markdowns, background, galleryImgs, site, newsImgs } = props.data;
  const { logo, footerImg } = props;
  // retrieving imgs
  const imgsArray: File[] = [];
  newsImgs.edges.map(({ node: file }) => imgsArray.push(file));

  return (
    <Layout
      pathname={props.location.pathname}
      images={background}
      logo={logo}
      footerImg={footerImg}
    >
      <Helmet title={`News | ${site.siteMetadata.title}`} />
      <PageTitle title={"news"} />
      <main className={styles.Columns}>
        <div className={styles.Page}>{getNews(markdowns, imgsArray)}</div>
        <GalleryCard galleryImgs={galleryImgs} />
      </main>
    </Layout>
  );
};

export default NewsPage;

export const query = graphql`
  query NewsPage {
    markdowns: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/news/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 150)
          ...NewsIndexFragment
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
    newsImgs: allFile(filter: { absolutePath: { regex: "/images/(news-)(.*[.])/" } }) {
      edges {
        node {
          id
          ...NewsImgsFragment
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
    site {
      siteMetadata {
        title
      }
    }
  }
`;
