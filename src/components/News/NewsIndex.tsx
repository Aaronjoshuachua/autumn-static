import * as React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";
import { Frontmatter_2, File } from "../../graphql-types";

import * as styles from "../../styles/_pages/news.module.scss";

interface NewsIndexProps {
  frontmatter: Frontmatter_2;
  excerpt: string;
  images: File;
}

const wrapperStyle = { width: "100%", height: "250px", marginBottom: "20px" };
const imgStyle = { objectFit: "cover" };

const NewsIndex: React.SFC<NewsIndexProps> = ({
  frontmatter,
  excerpt,
  images
}) => {
  return (
    <div className={styles.Index}>
      <Img
        resolutions={images.childImageSharp.resolutions}
        style={wrapperStyle}
        imgStyle={imgStyle}
      />
      <Link to={frontmatter.path} className={styles.Header}>
        <h4>{frontmatter.title}</h4>
      </Link>
      <div className={styles.Details}>
        <span>{`By: ${frontmatter.author} on ${frontmatter.date}`}</span>
      </div>
      <p>{excerpt}</p>
      <hr />
    </div>
  );
};

export default NewsIndex;

export const query = graphql`
  fragment NewsIndexFragment on MarkdownRemark {
    frontmatter {
      title
      path
      author
      postimage
      date(formatString: "MMMM DD, YYYY")
    }
  }
  fragment NewsImgsFragment on File {
    relativePath
    childImageSharp {
      resolutions(width: 800) {
        ...GatsbyImageSharpResolutions
      }
    }
  }
`;
