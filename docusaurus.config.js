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
          href: "/Basics/intro",
          label: "Basics",
          position: "left",
        },
        {
          href: "/Develop/intro",
          label: "Develop",
          position: "left",
        },
        {
          href: "/Routers/intro",
          label: "Routers",
          position: "left",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownItemsAfter: [{ to: "/versions", label: "All versions" }],
          dropdownActiveClassDisabled: true,
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
