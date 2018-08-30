import * as React from "react";
import Layout from "../components/Layout";
import Helmet from "react-helmet";
import PageTitle from "../components/PageTitle";
import NewsCard from "../components/News/NewsCard";
import GalleryImage from "../components/Gallery/GalleryImage";
import GalleryModal from "../components/Gallery/GalleryModal";
import { CardTitle } from "../components/CardTitle";
import { PageProps, DataProps } from "../components/types";
import {
  File,
  FileConnection,
  MarkdownRemarkConnection
} from "../graphql-types";

import * as styles from "../styles/_pages/gallery.module.scss";
import { isMaster } from "cluster";

interface GalleryDataProps extends DataProps {
  images: FileConnection;
  news: MarkdownRemarkConnection;
  newsCardImgs: FileConnection;
}

interface GalleryProps extends PageProps {
  data: GalleryDataProps;
}

interface GalleryState {
  currentImage: File | null;
  showModal: boolean;
}

class GalleryPage extends React.Component<GalleryProps, GalleryState> {
  public readonly state = {
    currentImage: null,
    showModal: false
  };

  public componentDidMount() {
    const { location } = this.props;
    if (location.search) {
      const currentImage = this.retrieveCurrentImage(
        location.search,
        this.props.data.images
      );
      this.setState(state => ({
        ...state,
        showModal: true,
        currentImage
      }));
    }
  }

  public render() {
    const { background, images, site, news, newsCardImgs } = this.props.data;
    const { logo, footerImg, location } = this.props;

    return (
      <Layout
        pathname={location.pathname}
        images={background}
        logo={logo}
        footerImg={footerImg}
      >
        <Helmet title={`Gallery | ${site.siteMetadata.title}`} />
        <PageTitle title={"gallery"} />
        <main className={styles.Columns}>
          <div>
            <CardTitle title="Images" tag="h4" className={styles.CardTitle} />
            <div className={styles.Gallery}>{this.getImgs(images)}</div>
          </div>
          <NewsCard news={news} newsCardImgs={newsCardImgs} />
        </main>
        <GalleryModal
          node={this.state.currentImage}
          images={images}
          hideModal={this.hideModal}
          visible={this.state.showModal}
        />
      </Layout>
    );
  }

  private hideModal = () => {
    this.setState(state => ({
      ...state,
      showModal: false
    }));
  };

  private onImageClick = (node: File) => {
    this.setState(state => ({
      ...state,
      currentImage: node,
      showModal: true
    }));
  };

  private getImgs = (images: FileConnection) =>
    images.edges.map(({ node }, index) => {
      return (
        <GalleryImage
          key={`images__${index}`}
          className={styles.Image}
          node={node}
          onImageClick={this.onImageClick}
        />
      );
    });

  private retrieveCurrentImage = (urlQuery: string, imgs: FileConnection) => {
    // trim prefixed `?`
    const trimmed: string = urlQuery.slice(1);
    const currentImage = imgs.edges.filter(({ node }) => {
      return node.relativePath.split(".")[0] === trimmed;
    });
    return currentImage[0].node;
  };
}

export default GalleryPage;

export const query = graphql`
  query GalleryPage {
    background: file(relativePath: { eq: "bg-gallery.png" }) {
      childImageSharp {
        sizes(maxWidth: 1240) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    images: allFile(filter: { relativePath: { regex: "/gallery-/" } }) {
      edges {
        node {
          relativePath
          childImageSharp {
            sizes(maxWidth: 500) {
              ...GatsbyImageSharpSizes
            }
          }
          maxHeight: childImageSharp {
            sizes(maxHeight: 720, maxWidth: 1280) {
              ...GatsbyImageSharpSizes
            }
          }
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
