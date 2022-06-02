const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const CardLink = require("./src/remark/CardLink");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Connext Documentation",
  tagline: "Fast, trust-minimized communication between blockchains.",
  url: "https://nxtp-docs.connext.network",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logomark.ico",
  organizationName: "connext", // Usually your GitHub org/user name.
  projectName: "connext", // Usually your repo name.
  customFields: {
    description: "Build your next xApp(cross-chain dapp) using Connext.",
  },
  themeConfig: {
    navbar: {
      title: "Connext Documentation",
      logo: {
        alt: "My Site Logo",
        src: "img/logomark.png",
      },
      items: [
        {
          type: "doc",
          docId: "basics/intro",
          label: "Basics",
          position: "left",
        },
        {
          type: "doc",
          docId: "developers/intro",
          label: "Developers",
          position: "left",
        },
        {
          type: "doc",
          docId: "routers/intro",
          label: "Routers",
          position: "left",
        },
        {
          type: "doc",
          docId: "faq",
          label: "FAQ ",
          position: "left",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownActiveClassDisabled: true,
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              href: "https://medium.com/connext",
              label: "Blog",
            },
            {
              href: "https://chat.connext.network",
              label: "Chat",
            },
            {
              href: "https://github.com/connext/nxtp",
              label: "GitHub",
            },
          ],
        },
        {
          title: "Project",
          items: [
            {
              href: "https://www.connext.network/",
              label: "Homepage",
            },
            {
              href: "https://connextscan.io/",
              label: "Explorer",
            },
            {
              href: "https://bridge.connext.network/",
              label: "Bridge",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              href: "https://connextscan.io/status",
              label: "Status",
            },
          ],
        },
      ],
      copyright: `Published in ${new Date().getFullYear()} by Connext. Built with Docusaurus.`,
    },
    prism: {
      additionalLanguages: ["solidity"],
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    sidebarCollapsible: false,
  },
  plugins: [require.resolve("@easyops-cn/docusaurus-search-local")],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "./docs",
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          remarkPlugins: [CardLink],
          editUrl: "https://github.com/connext/documentation",
          lastVersion: "current",
          versions: {
            current: {
              label: "0.2.x-amarok",
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
