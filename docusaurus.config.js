const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Connext Documentation",
  tagline: "The interoperability protocol of L2 Ethereum.",
  url: "https://tann9949.github.io/",
  baseUrl: "/documentation/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logomark.ico",
  organizationName: "tann9949", // Usually your GitHub org/user name.
  projectName: "documentation", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Connext Documentation",
      logo: {
        alt: "My Site Logo",
        src: "img/logomark.png",
      },
      items: [
        {
          href: "/",
          label: "Integration",
          position: "left",
        },
        {
          href: "/Routers/intro",
          label: "Routers",
          position: "left",
        },
        {
          href: "https://medium.com/connext",
          label: "Blog",
          position: "right",
        },
        {
          href: "https://chat.connext.network",
          label: "Chat",
          position: "right",
        },
        {
          href: "https://github.com/connext/nxtp",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Connext, Inc.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "./docs",
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/connext/documentation",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
