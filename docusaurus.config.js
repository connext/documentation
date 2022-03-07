const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Connext Documentation",
  tagline: "The interoperability protocol of L2 Ethereum.",
  url: "https://nxtp-docs.connext.network",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logomark.ico",
  organizationName: "connext", // Usually your GitHub org/user name.
  projectName: "connext", // Usually your repo name.

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
          label: "Docs",
          position: "left",
        },
        {
          href: "/routers/intro",
          label: "Routers",
          position: "left",
        },
        {
          href: "https://medium.com/connext",
          label: "Blog",
          position: "right",
        },
        {
          href: 'https://chat.connext.network',
          position: 'right',
          className: 'header-discord-link',
          'aria-label': 'Discord link',
        },
        {
          href: 'https://github.com/connext/nxtp',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style:"dark",
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Integration',
              to: '/',
            },
            {
              label: 'Routers',
              to: 'routers/intro',
            },
            {
              label: 'API',
              to: 'docs/api-reference/contract-api',
            },
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'Team',
              href: '/'
            },
            {
              label: 'FAQ',
              href: '/'
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://chat.connext.network',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/connext/nxtp',
            },
            {
              label: 'Blog',
              href: 'https://blog.connext.network',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Connext, Inc.`,
    },
    prism: {
      additionalLanguages: ["solidity"],
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
          editUrl: "https://github.com/connext/documentation",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
