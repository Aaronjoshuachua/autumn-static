import * as React from "react";
import Img from "gatsby-image";
import { File, FileConnection } from "../../graphql-types";
import * as styles from "../../styles/_pages/gallery.module.scss";

interface GalleryModalProps {
  node?: File;
  images: FileConnection;
  hideModal: () => void;
  visible: boolean;
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
// insert values to block on key events
const keyMapping: object = { 37: true, 38: true, 39: true, 40: true, 32: true };

class GalleryModal extends React.Component<GalleryModalProps> {
  public render() {
    if (this.props.visible) {
      const { node } = this.props;
      // disable scroll on modal visible
      this.disableScroll();
      return (
        <div className={styles.Modal} onClick={this.overloadHandleModal}>
          {/* <i className={["fas fa-times-circle", styles.Icon].join(" ")} /> */}
          <div className={styles.Wrapper}>
            <Img
              sizes={node.maxHeight.sizes}
              style={{ boxShadow: "0 0 20px 10px" }}
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  private preventDefault = (e: Event) => {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  };

  private preventDefaultScrollKeys = (e: KeyboardEvent) => {
    if (keyMapping[e.keyCode]) {
      this.preventDefault(e);
      return false;
    }
  };

  private disableScroll = () => {
    if (window.addEventListener) {
      window.addEventListener("DOMMouseScroll", this.preventDefault, false);
    }
    window.onwheel = this.preventDefault;
    window.onmousewheel = document.onmousewheel = this.preventDefault;
    window.ontouchmove = this.preventDefault;
    document.onkeydown = this.preventDefaultScrollKeys;
  };

  private enableScroll = () => {
    if (window.removeEventListener) {
      window.removeEventListener("DOMMouseScroll", this.preventDefault, false);
    }
    window.onwheel = null;
    window.onmousewheel = document.onmousewheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  };

  private overloadHandleModal = () => {
    this.enableScroll();
    this.props.hideModal();
  };
}

export default GalleryModal;

// export const query = graphql`
//   fragment GalleryModalFragment on ImageSharp {
//     resolutions(width: 400) {
//       ...GatsbyImageSharpResolutions
//     }
//   }
// `;
