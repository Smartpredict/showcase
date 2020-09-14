module.exports = {
  siteMetadata: {
    title: `SmartPredict | Showcase`,
    description: `SmartPredict Data Science & Machine Learning showcase`,
    author: `@SmartPredict`,
    image:
      "https://res.cloudinary.com/raslasarslas/image/upload/v1579606346/meta-image_qskzgi.png",
  },
  plugins: [
    "gatsby-plugin-top-layout",
    {
      resolve: "gatsby-plugin-material-ui",
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
    // If you want to use styled components you should add the plugin here.
    // 'gatsby-plugin-styled-components',
    "gatsby-plugin-react-helmet",
  ],
  siteMetadata: {
    title: "My page",
  },
};
