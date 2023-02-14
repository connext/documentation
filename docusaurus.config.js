const lightCodeTheme = require("prism-react-renderer/themes/okaidia");
const darkCodeTheme = require("prism-react-renderer/themes/okaidia");
const CardLink = require("./src/remark/CardLink");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Connext Documentation",
  tagline: "Fast, trust-minimized communication between blockchains.",
  url: "https://docs.connext.network",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logomark.ico",
  organizationName: "connext", // Usually your GitHub org/user name.
  projectName: "connext", // Usually your repo name.
  customFields: {
    description: "Build your next xApp (cross-chain dapp) using Connext.",
  },
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: "2AWQ1KDE1U",

      // Public API key: it is safe to commit it
      apiKey: "5add689ee403e9a231a600e2126496ed",

      indexName: "connext",

      // Optional: see doc section below
      contextualSearch: true,

      // // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      // externalUrlRegex: "external\\.com|domain\\.com",

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: false,

      //... other Algolia params
    },
    navbar: {
      title: "Connext Documentation",
      logo: {
        alt: "Connext documentation",
        src: "img/logomark.png",
      },
      items: [
        {
          type: "doc",
          docId: "concepts/what-is-connext",
          label: "Concepts",
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
          docId: "routers/routers-intro",
          label: "Routers",
          position: "left",
        },
        {
          type: "doc",
          docId: "resources/deployments",
          label: "Resources",
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
      copyright: `Published in ${new Date().getFullYear()} by Connext.`,
    },
    prism: {
      additionalLanguages: ["solidity"],
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {}
    ],
    [
      require.resolve('docusaurus-gtm-plugin'),
      {
        id: 'GTM-MLX9QD8', // GTM Container ID
      }
    ] 
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "./docs",
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsible: true,
          editUrl: "https://github.com/connext/documentation",
          lastVersion: "current",
          versions: {
            current: {
              label: "0.2.x-amarok",
            },
          },
          remarkPlugins: [
            CardLink,
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
        gtag: {
          trackingID: 'G-MPYZEDRVQ0',
          anonymizeIP: true,
        },
      },
    ],
  ],
};
