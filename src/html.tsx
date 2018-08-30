/* tslint:disable no-var-requires */
/* tslint:disable no-submodule-imports */
/* tslint:disable no-implicit-dependencies */
import React from "react";

// let stylesStr
// load production styles
let styles: string;
if (process.env.NODE_ENV === `production`) {
  try {
    styles = require(`!raw-loader!../public/styles.css`);
  } catch (e) {
    console.log(e);
  }
}

interface HTMLProps {
  body: any;
  bodyAttributes: any;
  htmlAttributes: any;
  headComponents: any;
  preBodyComponents: any;
  postBodyComponents: any;
}

module.exports = class HTML extends React.Component<HTMLProps> {
  public render() {
    let css;
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: styles }}
        />
      );
    }
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {this.props.headComponents}
          {css}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
};
