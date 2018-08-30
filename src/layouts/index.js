import * as React from "react"

// global styles
import "../styles/_global/index.css"


export default (props) => {
    const myData = { 
        logo: props.data.file, 
        footerImg: props.data.footer
    }
    return <React.Fragment>{props.children({ ...props, ...myData })}</React.Fragment>
}

export const query = graphql`
    query LayoutQuery {
        file(relativePath:{regex:"/logo-main/"}) {
            childImageSharp {
                sizes(maxWidth: 512) {
                    ...GatsbyImageSharpSizes
                }
            }
        }
        footer: file(relativePath:{regex:"/bg-footer/"}) {
            childImageSharp {
                sizes(maxWidth: 800) {
                    ...GatsbyImageSharpSizes
                }
            }
        }
    }
`