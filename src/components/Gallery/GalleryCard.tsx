import * as React from "react";
import { SmallCardTitle } from "../../components/CardTitle";
import { FileConnection } from "../../graphql-types";
import Link from "gatsby-link";
import Img from "gatsby-image";

import * as styles from "../../styles/_pages/gallery.module.scss";

interface GalleryCardProps {
  galleryImgs: FileConnection;
}

const pullFilename = (id: string) => {
  const regex: RegExp = new RegExp(/(gallery-)(.*[.])/gm);
  return id.match(regex)[0].slice(0, -1);
};

const GalleryCard: React.SFC<GalleryCardProps> = ({ galleryImgs }) => {
  return (
    <div className={styles.GalleryCard}>
      <div className={styles.CardHead}>
        <SmallCardTitle
          title="images"
          style={{ lineHeight: "40px" }}
          tag="h5"
        />
      </div>
      <div className={styles.Content}>
        {galleryImgs.edges.map(({ node }, index) => {
          const filename: string = pullFilename(node.id);
          return (
            <Link
              key={`images___${index}`}
              to={`/gallery?${filename}`}
              className={styles.CardLink}
            >
              <Img 
                className={styles.Img} 
                sizes={node.childImageSharp.sizes} 
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryCard;

export const query = graphql`
  fragment GalleryCardFragment on File {
    childImageSharp {
      sizes(maxHeight: 500) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
