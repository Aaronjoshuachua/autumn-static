import * as React from "react";
import * as styles from "../styles/PageTitle.module.scss";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.SFC<PageTitleProps> = props => {
  const className = props.title.length > 30 ? styles.TitleNoLine : styles.Title;
  return <h2 className={className}>{props.title}</h2>;
};

export default PageTitle;
