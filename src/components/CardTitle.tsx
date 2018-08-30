import * as React from "react";
import * as styles from "../styles/CardTitle.module.scss";

interface CardTitleProps {
  style?: object;
  tag?: string;
  title: string;
  className?: string;
  prefix?: string;
}

export const CardTitle: React.SFC<CardTitleProps> = ({
  title,
  tag,
  style,
  className,
  prefix
}) => {
  const xclassName = [styles.Title, className].join(" ");
  const xprefix = prefix || "Lastest"
  switch (tag) {
    case "h4":
      return (
        <h4 style={style} className={xclassName}>
          { prefix === "no" ? null : <span>{xprefix}</span> }
          {title}
        </h4>
      );
    case "h3":
      return (
        <h3 style={style} className={xclassName}>
          { prefix === "no" ? null : <span>{xprefix}</span> }
          {title}
        </h3>
      );
    case "h2":
      return (
        <h2 style={style} className={xclassName}>
          { prefix === "no" ? null : <span>{xprefix}</span> }
          {title}
        </h2>
      );
    default:
      return (
        <h4 style={style} className={xclassName}>
          { prefix === "no" ? null : <span>{xprefix}</span> }
          {title}
        </h4>
      );
  }
};

export const SmallCardTitle: React.SFC<CardTitleProps> = ({
  title,
  tag,
  style
}) => {
  switch (tag) {
    case "h5":
      return (
        <h5 style={style} className={styles.SmallTitle}>
          <span>Lastest</span>
          {title}
        </h5>
      );
    case "h4":
      return (
        <h4 style={style} className={styles.SmallTitle}>
          <span>Lastest</span>
          {title}
        </h4>
      );
    case "h3":
      return (
        <h3 style={style} className={styles.SmallTitle}>
          <span>Lastest</span>
          {title}
        </h3>
      );
    case "h2":
      return (
        <h2 style={style} className={styles.SmallTitle}>
          <span>Lastest</span>
          {title}
        </h2>
      );
    default:
      return (
        <h4 style={style} className={styles.SmallTitle}>
          <span>Lastest</span>
          {title}
        </h4>
      );
  }
};
