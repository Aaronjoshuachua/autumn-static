module.exports = {
    siteMetadata: {
        title: `Autumn Interactive`,
        author: `Autumn Interactive Team`
    },
    plugins: [
        `gatsby-plugin-typescript`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography.js`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `pages`,
              path: `${__dirname}/content`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `images`,
              path: `${__dirname}/src/img`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `images`,
              path: `${__dirname}/static/files/images`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: ["gatsby-remark-copy-linked-files"],
            },
        },
        `gatsby-plugin-sharp`,
        {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
        ],
      },
    },
        `gatsby-plugin-netlify-cms`,
        `gatsby-transformer-sharp`,
    ]
};