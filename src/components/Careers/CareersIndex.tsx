import * as React from "react";
import Link from "gatsby-link";

import { Frontmatter_2, Fields_2 } from "../../graphql-types";

import * as styles from "../../styles/_pages/careers.module.scss";

interface CareersIndexProps {
  frontmatter: Frontmatter_2;
  excerpt: string;
}

const CareersIndex: React.SFC<CareersIndexProps> = ({
  frontmatter,
  excerpt
}) => {
  return (
    <div className={styles.Index}>
      <Link to={frontmatter.path} className={styles.Header}>
        <h4>{frontmatter.title}</h4>
      </Link>
      <div className={styles.Details}>
        <i className="fas fa-calendar-alt" />
        <span>{frontmatter.date}</span>
      </div>
      <p>{excerpt}</p>
      <hr />
    </div>
  );
};

export default CareersIndex;

export const query = graphql`
  fragment CareersIndexFragment on MarkdownRemark {
    frontmatter {
      jobtype
      title
      path
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;
