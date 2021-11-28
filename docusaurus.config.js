const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "เอกสาร Connext",
  tagline: "โปรโตคอลสำหรับการสื่อสารระว่างบล็อคเชนของ Ethereum L2",
  url: "http://thai-contribute-community.github.io/",
  baseUrl: "/connext-documentation/",
  // url: "http://thaicontribute.connext.network/",
  // baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logomark.ico",
  organizationName: "thai-contribute-community", // Usually your GitHub org/user name.
  projectName: "connext-documentation", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "เอกสาร Connext",
      logo: {
        alt: "My Site Logo",
        src: "img/logomark.png",
      },
      items: [
        {
          href: "/",
          label: "การเชื่อมต่อ (Integration)",
          position: "left",
        },
        {
          href: "/Routers/intro",
          label: "เร้าเตอร์ (Routers)",
          position: "left",
        },
        {
          href: "https://medium.com/connext",
          label: "บล็อก (Blog)",
          position: "right",
        },
        {
          href: "https://chat.connext.network",
          label: "พูดคุย",
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
      copyright: `ลิขสิทธิ์ถูกต้อง © ${new Date().getFullYear()} Connext, Inc.`,
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
