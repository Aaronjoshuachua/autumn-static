import * as React from "react";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import GalleryCard from "../components/Gallery/GalleryCard";
import NewsCard from "../components/News/NewsCard";
import CareersIndex from "../components/Careers/CareersIndex";
import Helmet from "react-helmet";
import { PageProps, DataProps } from "../components/types";
import { MarkdownRemarkConnection, FileConnection } from "../graphql-types";

import * as styles from "../styles/_pages/careers.module.scss";

interface CareersDataProps extends DataProps {
  markdowns: MarkdownRemarkConnection;
  galleryImgs: FileConnection;
  news: MarkdownRemarkConnection;
  newsCardImgs: FileConnection;
}

interface CareersProps extends PageProps {
  data: CareersDataProps;
}

class CareersPage extends React.Component<CareersProps> {
  public render() {
    const {
      markdowns,
      background,
      galleryImgs,
      site,
      news,
      newsCardImgs
    } = this.props.data;
    const { logo, footerImg } = this.props;

    return (
      <Layout
        pathname={this.props.location.pathname}
        images={background}
        logo={logo}
        footerImg={footerImg}
      >
        <Helmet title={`Careers | ${site.siteMetadata.title}`} />
        <PageTitle title={"careers"} />
        <main className={styles.Columns}>
          <div className={styles.Page}>{this.getPositions(markdowns)}</div>
          <div className={styles.Side}>
            <GalleryCard galleryImgs={galleryImgs} />
            <NewsCard news={news} newsCardImgs={newsCardImgs} />
          </div>
        </main>
      </Layout>
    );
  }

  private getPositions(data: MarkdownRemarkConnection) {
    if (data === null) {
      return (
        <h4 style={{ color: "white", letterSpacing: "1px" }}>
          Woops, we've got no positions available at this point of time...
        </h4>
      );
    }
    return data.group.map(({ fieldValue, edges }, index) => {
      return (
        <div key={index} className={styles.Positions}>
          <h4 className={styles.CategoryTitle}>
            <span>latest</span>
            {` ${fieldValue} positions`}
          </h4>
          {edges.map(({ node }, iindex) => {
            return (
              <CareersIndex
                key={iindex}
                frontmatter={node.frontmatter}
                excerpt={node.excerpt}
              />
            );
          })}
        </div>
      );
    });
  }
}

export default CareersPage;

export const query = graphql`
  query CareerPage {
    markdowns: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/careers/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      group(field: frontmatter___jobtype) {
        fieldValue
        edges {
          node {
            id
            excerpt(pruneLength: 150)
            ...CareersIndexFragment
          }
        }
      }
    }
    galleryImgs: allFile(
      filter: { relativePath: { regex: "/(gallery-)(.*[.])/" } }
      limit: 6
    ) {
      edges {
        node {
          id
          ...GalleryCardFragment
        }
      }
    }
    background: file(relativePath: { eq: "bg-careers.png" }) {
      childImageSharp {
        sizes(maxWidth: 1240) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    news: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/news/" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 6
    ) {
      edges {
        node {
          id
          ...NewsCardFragment
        }
      }
    }
    newsCardImgs: allFile(
      filter: { absolutePath: { regex: "/images/(news-)(.*[.])/" } }
    ) {
      edges {
        node {
          id
          ...NewsCardImgsFragment
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
