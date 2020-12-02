module.exports = {
  plugins: [
    `gatsby-plugin-react-native-web`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Expo PWA',
        short_name: 'Expo PWA',
        start_url: `/`,
        background_color: '#fff',
        theme_color: '#3740ff',
        display: 'standalone',
        icon: './assets/images/icon.png',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
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
              maxWidth: 380,
              wrapperStyle: (fluidResult) => `flex:${_.round(fluidResult.aspectRatio, 2)};`,
            },
          },
        ],
      },
    },
    /* ... */
  ],
  siteMetadata: {
    title: 'Expo PWA',
    siteUrl: 'https://expo-pwa.web.app',
  },
};
