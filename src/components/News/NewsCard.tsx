import * as React from "react";
import { SmallCardTitle } from "../../components/CardTitle";
import Img from "gatsby-image";
import Link from "gatsby-link";
import * as styles from "../../styles/_pages/news.module.scss";
import {
  MarkdownRemarkConnection,
  FileConnection,
  Frontmatter_2
} from "../../graphql-types";

interface NewsCardProps {
  news: MarkdownRemarkConnection;
  newsCardImgs: FileConnection;
}

const getThumbnail = (
  newsCardImgs: FileConnection,
  frontmatter: Frontmatter_2
) => {
  const imgsArray = [];
  newsCardImgs.edges.map(({ node: file }) => imgsArray.push(file));
  return imgsArray.filter(
    item => item.relativePath === frontmatter.postimage.slice(14)
  )[0];
};

const NewsCard: React.SFC<NewsCardProps> = ({ news, newsCardImgs }) => {
  if (news === null) {
    return (
      <div className={styles.NewsCard}>
        <div className={styles.CardHead}>
          <SmallCardTitle
            title="news"
            style={{ lineHeight: "40px" }}
            tag="h5"
          />
        </div>
        <div className={styles.Content}>
          <h5 style={{ color: "white", letterSpacing: "1px" }}>No news...</h5>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.NewsCard}>
      <div className={styles.CardHead}>
        <SmallCardTitle title="news" style={{ lineHeight: "40px" }} tag="h5" />
      </div>
      <div className={styles.Content}>
        {news.edges.map(({ node }, i) => {
          const thumbnail = getThumbnail(newsCardImgs, node.frontmatter);
          return (
            <div className={styles.ContentInner} key={i}>
              <div className={styles.Thumbnail}>
                <Img
                  sizes={thumbnail.childImageSharp.sizes}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute"
                  }}
                />
              </div>
              <div className={styles.Details}>
                <Link to={node.frontmatter.path} className={styles.Title}>
                  <h4>{node.frontmatter.title}</h4>
                </Link>
                <span className={styles.Date}>
                  <i className="fas fa-calendar-alt" />
                  {node.frontmatter.date}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsCard;

export const query = graphql`
  fragment NewsCardFragment on MarkdownRemark {
    frontmatter {
      title
      date(formatString: "MMMM DD, YYYY")
      postimage
      path
    }
  }
  fragment NewsCardImgsFragment on File {
    relativePath
    childImageSharp {
      sizes(maxWidth: 300) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
