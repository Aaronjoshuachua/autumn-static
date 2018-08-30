const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators
    if (node.internal.type === `MarkdownRemark`) {
      const relativeFilePath = createFilePath({
        node,
        getNode,
        basePath: "data/news/",
      });
      createNodeField({
        node,
        name: "slug",
        value: `/news${relativeFilePath}`,
      });
    }
  };

  exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators
    return new Promise((resolve, reject) => {
      graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              html
              id
              frontmatter {
                contentType
                path
                date
                title
                author
                tags {
                  name
                }
              }
            }
          }
        }
      }
      `).then(result => {
        if (result.errors) reject()
        const tagPage = path.resolve(`src/templates/tag.js`)
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
                path: node.frontmatter.path,
                component: path.resolve(`./src/templates/${node.frontmatter.contentType}.tsx`),
                context: {}
            })
        })
        resolve()
      })
    })
  };