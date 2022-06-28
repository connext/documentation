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
    algolia: {
      // The application ID provided by Algolia
      appId: "Z3QNOPOJN1",

      // Public API key: it is safe to commit it
      apiKey: "397370f03046aa9f9a7fc65aee13f0d1",

      indexName: "connext",

      // Optional: see doc section below
      contextualSearch: true,

      // // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      // externalUrlRegex: "external\\.com|domain\\.com",

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: "search",

      //... other Algolia params
    },
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
