import * as React from "react";
import Img from "gatsby-image";
import { File } from "../../graphql-types";

import * as styles from "../../styles/_pages/gallery.module.scss";

interface GalleryImageProps {
  className: string;
  node: File;
  onImageClick: (File) => void;
}

interface GallerImageState {
  showOverlay: boolean;
}

class GalleryImage extends React.Component<
  GalleryImageProps,
  GallerImageState
> {
  public readonly state = {
    showOverlay: false
  };

  public render() {
    const { node, className } = this.props;

    return (
      <div
        className={className}
        onClick={this.onImageClick}
        onMouseEnter={this.onOverlay}
        onMouseLeave={this.offOverlay}
      >
        <i
          className={["far fa-eye", styles.Icon].join(" ")}
          style={this.state.showOverlay ? null : { display: "none" }}
        />
        <div className={this.state.showOverlay ? styles.Overlay : ""} />
        <Img
          sizes={node.childImageSharp.sizes}
          style={{ height: "100%", width: "100%", position: "absolute" }}
        />
      </div>
    );
  }

  private offOverlay = () => {
    this.setState(state => ({
      ...state,
      showOverlay: false
    }));
  };

  private onOverlay = () => {
    this.setState(state => ({
      ...state,
      showOverlay: true
    }));
  };

  private onImageClick = () => {
    const { onImageClick, node } = this.props;
    onImageClick(node);
  };
}

export default GalleryImage;
