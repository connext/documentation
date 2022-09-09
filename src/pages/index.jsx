import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

import styles from "./index.module.css";

import styled from "@emotion/styled";

import Discord from "/static/img/discord.svg";

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

import SearchBar from "@theme-original/SearchBar";

import {
  InformationCircleIcon,
  LinkIcon,
  BookOpenIcon,
  ChatIcon,
  CodeIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/outline";
export const actions = [
  {
    title: "What is Connext",
    href: "#",
    icon: InformationCircleIcon,
    to: "./core-concepts/understanding-connext",
    text: `Learn about the core concepts of the Connext Protocol. Brige basics, trust assumptions, security and more.`,
  },
  {
    title: "Build with xcall",
    href: "#",
    icon: LinkIcon,
    to: "./developers/quickstart",
    text: `Learn how to use the cross-chain primitive to interact with the Connext Protocol.`,
  },
  {
    title: "Smart contract overview",
    href: "#",
    icon: BookOpenIcon,
    to: "./developers/reference/contracts/contracts-overview",
    text: `Learn about the architecture of the Connext Protocol smart contracts made up of the Core and Periphery libraries.`,
  },
];

export const github = [
  {
    title: "xapp-starter",
    href: "https://github.com/connext/xapp-starter",
    icon: CodeIcon,
  },
  {
    title: "nxtp",
    href: "https://github.com/connext/nxtp",
    icon: CodeIcon,
  },
  {
    title: "Deployment addresses",
    href: "https://github.com/connext/nxtp/blob/main/packages/deployments/contracts/deployments.json",
  },
];

export const Guides = [
  {
    title: "SDK Quick Start",
    text: "Integrate with the Connext Protocol using JavaScript",
    to: "./developers/sdk/sdk-quickstart",
  },
  {
    title: "Solidity Quick Start",
    text: "Integrate with the Connext Protocol using Solidty",
    to: "./developers/contracts/contracts-quickstart",
  },
];

export const hacker = [
  {
    title: "Hacker Starter Kit",
    to: "./",
  },
  {
    title: "Our Current Hackathons",
    to: "./",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  justify-content: center;
  margin: 0 auto;
  padding: 1rem 0;
  max-width: 960px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    max-width: 100%;
    margin: 0 1rem;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const TwoRow = styled(Row)`
  grid-template-columns: 1fr 1fr;
  grid-gap: 48px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  display: flex;
  max-height: 250px;
  min-width: 350px;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 20px;
  border: 1px solid var(--ifm-color-emphasis-200);
  /* flex: 1 1 0px; */

  &:hover {
    border: 1px solid var(--ifm-color-emphasis-400);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 960px) {
    width: 100%;
  }
`;

const CenterCard = styled(Card)`
  min-width: 250px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 24px;

  h3 {
    margin-bottom: 0.25rem;
  }

  p {
    margin-bottom: 0px;
  }
`;

const ShadowCard = styled(Card)`
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
  background-color: #ffffff10;
  backdrop-filter: blur(10px);
  min-height: 200px;
  /* background-color: var(--ifm-color-emphasis-0); */
`;

const WideCard = styled(ShadowCard)`
  max-height: auto;

  @media (max-width: 960px) {
    margin: 0 2rem;
    max-height: fit-content;
    width: fit-content;
  }
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const TopSection = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const LinkRow = styled.div`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  a h3 {
    color: black !important;
  }
`;

const DocsHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  position: relative;
`;

const StyledImage = styled(ThemedImage)`
  position: relative;
  z-index: -1;
  width: 100%;
  object-fit: cover;
`;

const StyledTitleImage = styled(StyledImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  position: absolute;
  opacity: 0.2;
  mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
`;

const StyledGithubIcon = styled.div`
  svg {
    fill: var(--ifm-font-color-base);
  }
`;

const HideMedium = styled.div`
  @media (max-width: 960px) {
    display: none;
  }
`;

export default function Home() {
  return (
    <Layout
      title={`Connext Docs`}
      description="Technical Documentation For The Connext Protocol"
    >
      <Container>
        <DocsHeader>
          <div
            style={{
              padding: "4rem 0  ",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontWeight: "600" }}> Welcome to the Connext Docs</h1>
            <HideMedium>
              <SearchBar />{" "}
            </HideMedium>

            <TwoRow
              style={{
                gap: "56px",
                marginTop: "4rem",
              }}
            >
              <p
                style={{
                  maxWidth: "640px",
                  margin: "1rem ",
                  fontWeight: 500,
                  textAlign: "left",
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                  align: "left",
                }}
              >
                <h2>What is connext?</h2>
                Connext powers fast, trust-minimized communication between
                blockchains.
                <br />
                <br />
                Our goal is to create a world where users never need to know
                what chain or rollup they're on (unless they want to!) and
                developers can build applications that utilize resources from
                many chains/rollups simultaneously.
                <br />
                <br />
                Get started with xcall in less than 10 lines of code!
              </p>
              <div class={styles.hack_hero_code_editor}>
                <div class={styles.hack_code_editor_top}>
                  <div class={styles.hack_hero_dots_container}>
                    <div class={styles.hack_hero_dot}></div>
                    <div class={styles.hack_hero_dot}></div>
                    <div class={styles.hack_hero_dot}></div>
                  </div>
                </div>
                <div class={styles.hack_code_editor_bottom}>
                  <div class={styles.hack_code_editor_dots}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                  </div>
                  <div class={styles.hack_code_text_container}>
                    <div>
                      <span style={{ color: "#7ED321" }}>connext</span>
                      <span style={{ color: "#BD10E0" }}>.</span>
                      <span style={{ color: "#9013FE" }}>xcall</span>(
                      <span style={{ color: "#4A90E2" }}>XCallArgs</span>(
                    </div>
                    <div>
                      &nbsp;&nbsp;
                      {<span style={{ color: "#4A90E2" }}>CallParams</span>}(
                    </div>

                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span style={{ color: "#417505" }}>to</span>:
                      ‹recipient_or_contract›,
                    </div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span style={{ color: "#417505" }}>callData</span>:
                      ‹encoded_calldata›,
                    </div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span style={{ color: "#417505" }}>callback</span>:
                      ‹async_handler›,
                    </div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;...</div>
                    <div>&nbsp;&nbsp;),</div>
                    <div>
                      &nbsp;&nbsp;
                      <span style={{ color: "#417505" }}>transactingAsset</span>
                      : ‹ERC20›,
                    </div>
                    <div>
                      &nbsp;&nbsp;
                      <span style={{ color: "#417505" }}>
                        transactingAmount
                      </span>
                      : ‹funds_to_send›,
                    </div>
                    <div>));</div>
                  </div>
                </div>
              </div>
            </TwoRow>
          </div>
          {/* <StyledTitleImage
            alt="Docusaurus themed image"
            sources={{
              light: useBaseUrl("/img/grow.png"),
              dark: useBaseUrl("/img/grow2.png"),
            }}
          /> */}

          <Row>
            {actions.map((action) => (
              <Link
                style={{ textDecoration: "none" }}
                to={action.to}
                key={action.to}
              >
                <ShadowCard key={action.title}>
                  <TopSection>
                    <IconWrapper>
                      <action.icon
                        style={{ width: "24px" }}
                        color={action.color}
                      />
                    </IconWrapper>

                    <svg
                      style={{ width: "24px", opacity: 0.2 }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </TopSection>
                  <h3 style={{ marginBottom: ".75rem", color: action.color }}>
                    {action.title}
                  </h3>
                  <p style={{ marginBottom: "0.5rem" }}>{action.text}</p>
                </ShadowCard>
              </Link>
            ))}
          </Row>
        </DocsHeader>

        <TwoRow
          style={{
            gap: "56px",
            marginTop: "4rem",
          }}
        >
          <div>
            <h2>Getting Started</h2>
            <p>
              Explore these docs to start integrating the Connext Protocol in
              your dApp, smart contract or project.
            </p>
            <div>
              {Guides.map((action) => (
                <Link
                  style={{ textDecoration: "none" }}
                  key={action.title}
                  to={action.to}
                >
                  <Card key={action.title} style={{ marginBottom: "1rem" }}>
                    <LinkRow>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h3 style={{ marginBottom: "0rem" }}>{action.title}</h3>
                      </div>
                      <svg
                        style={{ width: "24px", opacity: 0.2 }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                      </svg>
                    </LinkRow>
                    <p style={{ marginBottom: "0rem" }}>{action.text}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2>Developer Links</h2>
            <p>
              The Connext codebase is comprised of an ecosystem of open source
              components.
            </p>
            {github.map((action) => (
              <Link style={{ textDecoration: "none" }} href={action.href}>
                <Card key={action.title} style={{ marginBottom: "1rem" }}>
                  <LinkRow>
                    <StyledGithubIcon
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 120.78 117.79"
                        style={{ width: "24px" }}
                      >
                        <defs></defs>
                        <title>Logo</title>
                        <g id="Layer_2" data-name="Layer 2">
                          <g id="Layer_1-2" data-name="Layer 1">
                            <path
                              className="cls-1"
                              d="M60.39,0A60.39,60.39,0,0,0,41.3,117.69c3,.56,4.12-1.31,4.12-2.91,0-1.44-.05-6.19-.08-11.24C28.54,107.19,25,96.42,25,96.42c-2.75-7-6.71-8.84-6.71-8.84-5.48-3.75.41-3.67.41-3.67,6.07.43,9.26,6.22,9.26,6.22,5.39,9.23,14.13,6.57,17.57,5,.55-3.9,2.11-6.56,3.84-8.07C36,85.55,21.85,80.37,21.85,57.23A23.35,23.35,0,0,1,28.08,41c-.63-1.52-2.7-7.66.58-16,0,0,5.07-1.62,16.61,6.19a57.36,57.36,0,0,1,30.25,0C87,23.42,92.11,25,92.11,25c3.28,8.32,1.22,14.46.59,16a23.34,23.34,0,0,1,6.21,16.21c0,23.2-14.12,28.3-27.57,29.8,2.16,1.87,4.09,5.55,4.09,11.18,0,8.08-.06,14.59-.06,16.57,0,1.61,1.08,3.49,4.14,2.9A60.39,60.39,0,0,0,60.39,0Z"
                            />
                            <path
                              className="cls-2"
                              d="M22.87,86.7c-.13.3-.6.39-1,.19s-.69-.61-.55-.91.61-.39,1-.19.69.61.54.91Z"
                            />
                            <path
                              className="cls-2"
                              d="M25.32,89.43c-.29.27-.85.14-1.24-.28a.92.92,0,0,1-.17-1.25c.3-.27.84-.14,1.24.28s.47,1,.17,1.25Z"
                            />
                            <path
                              className="cls-2"
                              d="M27.7,92.91c-.37.26-1,0-1.35-.52s-.37-1.18,0-1.44,1,0,1.35.51.37,1.19,0,1.45Z"
                            />
                            <path
                              className="cls-2"
                              d="M31,96.27A1.13,1.13,0,0,1,29.41,96c-.53-.49-.68-1.18-.34-1.54s1-.27,1.56.23.68,1.18.33,1.54Z"
                            />
                            <path
                              className="cls-2"
                              d="M35.46,98.22c-.15.47-.82.69-1.51.49s-1.13-.76-1-1.24.82-.7,1.51-.49,1.13.76,1,1.24Z"
                            />
                            <path
                              className="cls-2"
                              d="M40.4,98.58c0,.5-.56.91-1.28.92s-1.3-.38-1.31-.88.56-.91,1.29-.92,1.3.39,1.3.88Z"
                            />
                            <path
                              className="cls-2"
                              d="M45,97.8c.09.49-.41,1-1.12,1.12s-1.35-.17-1.44-.66.42-1,1.12-1.12,1.35.17,1.44.66Z"
                            />
                          </g>
                        </g>
                      </svg>
                      <h3 style={{ marginBottom: "0rem", marginLeft: "16px" }}>
                        {action.title}
                      </h3>
                    </StyledGithubIcon>
                    <svg
                      style={{ width: "24px", height: "24px", opacity: 0.2 }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </LinkRow>
                </Card>
              </Link>
            ))}
          </div>
        </TwoRow>

        <hr />
        <WideCard
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: "24px",
            maxWidth: "960px",
            margin: "1rem auto",
            width: "100%",
          }}
        >
          <TwoRow
            style={{
              gap: "48px",
              alignItems: "center",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <p
              style={{
                maxWidth: "640px",
                margin: "1rem ",
                fontWeight: 500,
                textAlign: "left",
              }}
            >
              <h1>At a Hackathon?</h1>
              <h2>Win faster with our Hackathon Starterkit</h2>
            </p>
            <div>
              <p></p>
              {hacker.map((action) => (
                <Link style={{ textDecoration: "none" }} href={action.href}>
                  <Card key={action.title} style={{ marginBottom: "1rem" }}>
                    <LinkRow>
                      <StyledGithubIcon
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <svg
                          width="36px"
                          height="36px"
                          viewBox="0 -100 700 700"
                        >
                          <g>
                            <path d="m491.87 177.16h-44.121v-14.934-31.562-4.0742c0-5.7695-4.4141-10.184-10.184-10.184l-175.8 0.003906c-5.4297 0-9.8438 4.0742-10.184 9.5039v0.67969 2.375 21.723 26.473l-44.797-0.003907c-1.3594 0-2.7148 0.67969-3.7344 1.6953-1.0195 1.0195-1.3594 2.375-1.3594 3.7344 1.0195 21.043 3.3945 36.656 7.8047 50.91 4.75 14.934 11.879 26.812 22.062 36.656 8.1445 7.8047 17.988 12.898 30.207 15.953 3.7344 7.8047 8.4844 15.273 14.594 22.062 3.0547 3.7344 6.1094 7.1289 9.5039 10.859 4.75 5.4297 9.5039 10.859 14.254 16.289 10.859 12.898 15.953 25.453 16.289 39.031v1.3594c-0.33984 0-0.67969 0.33984-1.6953 0.67969l-4.0742 1.3594c-9.8438 3.3945-19.684 6.4492-29.527 10.52-13.914 5.7695-25.793 13.574-34.957 23.418-3.7344 4.0742-8.1445 9.5039-10.52 17.309-1.0195 3.0547-0.33984 6.4492 1.6953 8.8242 2.0352 2.7148 5.0898 4.0742 8.1445 4.0742h208.73c3.3945 0 6.4492-1.6953 8.1445-4.4141 2.0352-2.7148 2.375-6.1094 1.3594-9.1641l-0.33984-0.67969c-0.33984-0.67969-0.67969-1.3594-0.67969-2.0352-5.7695-12.559-15.613-20.703-23.758-26.133-17.648-12.219-37.672-18.668-54.641-23.418-0.67969 0-1.0195-0.33984-1.3594-0.33984v-1.3594c0.33984-11.199 3.3945-21.043 9.5039-29.527 7.8047-10.184 16.289-21.043 26.133-31.562 7.4648-8.4844 13.574-17.309 18.328-27.152 22.062-5.4297 37.672-19.008 47.516-41.066 5.0898-11.199 8.1445-23.418 9.8438-36.992 0.67969-5.7695 1.3594-11.539 1.6953-17.309 0.33984-2.7148 0.33984-5.0898 0.67969-7.8047 0-1.3594-0.33984-2.7148-1.3594-4.0742-0.67578-1.0234-2.0352-1.7031-3.3906-1.7031zm-253.19 85.867c-8.8242-8.4844-15.273-19.008-19.344-32.242-3.7344-12.219-6.1094-25.793-7.1289-43.102h39.371v50.91c0 12.559 2.0352 24.438 5.4297 35.637-7.1289-2.7188-13.238-6.4531-18.328-11.203zm164.95 36.312c-9.8438 10.859-19.008 22.062-27.152 32.922-8.8242 11.879-13.238 25.453-13.574 41.066-0.33984 11.879 4.75 18.668 16.289 22.062 15.613 4.4141 33.262 10.184 48.535 20.703 2.7148 1.6953 5.0898 3.3945 6.7891 5.4297h-169.7c6.4492-5.7695 14.594-10.859 23.758-14.594 9.1641-3.7344 19.008-7.1289 28.168-10.184l4.0742-1.3594c10.859-3.7344 15.613-10.52 15.613-21.723-0.33984-18.328-7.1289-34.957-21.043-51.586-4.75-5.7695-9.8438-11.199-14.594-16.629-3.0547-3.3945-6.1094-7.1289-9.1641-10.52-13.574-15.613-20.023-34.277-20.023-56.68v-87.562-13.914h155.44v25.453 73.309c0.67578 25.117-7.4727 45.82-23.422 63.805zm82.473-109.62c-0.67969 5.7695-1.0195 11.199-1.6953 16.969-1.6953 12.559-4.75 23.758-9.1641 34.277-7.1289 16.629-17.988 27.492-33.262 32.922 4.0742-11.879 6.1094-24.777 5.7695-38.352v-48.195h38.691c-0.33984 0.67969-0.33984 1.3594-0.33984 2.3789z" />
                            <path d="m331.33 242.67-19.008-13.574 19.008-13.574c1.3594-1.0195 1.6953-2.7148 1.0195-4.0742l-2.375-5.4297c-0.33984-1.0195-1.3594-1.6953-2.375-1.6953-1.0195-0.33984-2.0352 0-2.7148 0.67969l-26.133 19.344c-1.0195 0.67969-1.3594 1.6953-1.3594 2.7148v5.0898c0 1.0195 0.67969 2.0352 1.3594 2.7148l26.133 19.008c0.67969 0.33984 1.3594 0.67969 2.0352 0.67969h0.67969c1.0195-0.33984 1.6953-1.0195 2.375-1.6953l2.7148-5.0898c0.67969-2.3828 0-4.082-1.3594-5.0977z" />
                            <path d="m365.95 174.45c-0.67969-1.0195-1.6992-1.3594-2.7148-1.3594h-5.4297c-1.6953 0-3.0547 1.0195-3.3945 2.7148l-22.062 97.746c-0.33984 1.0195 0 2.0352 0.67969 2.7148s1.6953 1.3594 2.7148 1.3594h5.4297c1.6953 0 3.0547-1.0195 3.3945-2.7148l22.062-97.746c0.33594-1.0195-0.003906-2.0352-0.67969-2.7148z" />
                            <path d="m400.23 223.66-26.133-19.344c-0.67969-0.67969-1.6992-0.67969-2.7148-0.67969-1.0195 0.33984-1.6953 1.0195-2.375 1.6953l-2.375 5.4297c-0.67969 1.3594-0.33984 3.0547 1.0195 4.0742l19.008 13.574-19.008 13.574c-1.3594 1.0195-1.6953 2.7148-1.0195 4.4141l2.7148 5.0898c0.33984 1.0195 1.3594 1.6953 2.375 1.6953h0.67969c0.67969 0 1.3594-0.33984 2.0352-0.67969l26.133-19.008c1.0195-0.67969 1.3594-1.6953 1.3594-2.7148v-5.0898c-0.003907-0.33203-0.67969-1.3516-1.6992-2.0312z" />
                          </g>
                        </svg>
                        <h3
                          style={{ marginBottom: "0rem", marginLeft: "16px" }}
                        >
                          {action.title}
                        </h3>
                      </StyledGithubIcon>
                      <svg
                        style={{ width: "24px", height: "24px", opacity: 0.2 }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                      </svg>
                    </LinkRow>
                  </Card>
                </Link>
              ))}
            </div>
          </TwoRow>
        </WideCard>

        {/* <hr /> */}

        <WideCard
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: "24px",
            maxWidth: "960px",
            margin: "1rem auto",
            width: "100%",
          }}
        >
          <TwoRow
            style={{
              gap: "48px",
              alignItems: "center",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <p
              style={{
                maxWidth: "640px",
                margin: "1rem ",
                fontWeight: 500,
                textAlign: "left",
              }}
            >
              <h1>Become a router</h1>
              <h2>
                Connext Routers form the backbone <br />
                of the network, relaying funds and data <br />
                between domains by providing liquidity
              </h2>
            </p>
            <div>
              <p></p>
              {hacker.map((action) => (
                <Link style={{ textDecoration: "none" }} href={action.href}>
                  <Card key={action.title} style={{ marginBottom: "1rem" }}>
                    <LinkRow>
                      <SwitchHorizontalIcon
                        style={{ width: "24px", height: "24px" }}
                      />
                      <h3 style={{ marginBottom: "0rem", marginLeft: "16px" }}>
                        {action.title}
                      </h3>
                      <svg
                        style={{ width: "24px", height: "24px", opacity: 0.2 }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                      </svg>
                    </LinkRow>
                  </Card>
                </Link>
              ))}
            </div>
          </TwoRow>
        </WideCard>

        <hr></hr>

        <Row>
          <Link
            style={{ textDecoration: "none" }}
            href={"https://discord.gg/ybKVQUWb4s"}
          >
            <CenterCard>
              <Discord style={{ width: "48px", height: "48px" }} />
              <div>
                <h3>Discord</h3>
                <p>Join us in #dev-hub to get realtime help.</p>
              </div>
            </CenterCard>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            href={"https://connext.org/"}
          >
            <CenterCard>
              <ChatIcon style={{ width: "48px", height: "48px" }} />
              <div>
                <h3>Academy</h3>
                <p>Learn more from Connext Academy</p>
              </div>
            </CenterCard>
          </Link>

          <Link
            style={{ textDecoration: "none" }}
            href={"https://github.com/Connext"}
          >
            <CenterCard>
              <StyledGithubIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 120.78 117.79"
                  style={{ width: "48px" }}
                >
                  <defs></defs>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        className="cls-1"
                        d="M60.39,0A60.39,60.39,0,0,0,41.3,117.69c3,.56,4.12-1.31,4.12-2.91,0-1.44-.05-6.19-.08-11.24C28.54,107.19,25,96.42,25,96.42c-2.75-7-6.71-8.84-6.71-8.84-5.48-3.75.41-3.67.41-3.67,6.07.43,9.26,6.22,9.26,6.22,5.39,9.23,14.13,6.57,17.57,5,.55-3.9,2.11-6.56,3.84-8.07C36,85.55,21.85,80.37,21.85,57.23A23.35,23.35,0,0,1,28.08,41c-.63-1.52-2.7-7.66.58-16,0,0,5.07-1.62,16.61,6.19a57.36,57.36,0,0,1,30.25,0C87,23.42,92.11,25,92.11,25c3.28,8.32,1.22,14.46.59,16a23.34,23.34,0,0,1,6.21,16.21c0,23.2-14.12,28.3-27.57,29.8,2.16,1.87,4.09,5.55,4.09,11.18,0,8.08-.06,14.59-.06,16.57,0,1.61,1.08,3.49,4.14,2.9A60.39,60.39,0,0,0,60.39,0Z"
                      />
                      <path
                        className="cls-2"
                        d="M22.87,86.7c-.13.3-.6.39-1,.19s-.69-.61-.55-.91.61-.39,1-.19.69.61.54.91Z"
                      />
                      <path
                        className="cls-2"
                        d="M25.32,89.43c-.29.27-.85.14-1.24-.28a.92.92,0,0,1-.17-1.25c.3-.27.84-.14,1.24.28s.47,1,.17,1.25Z"
                      />
                      <path
                        className="cls-2"
                        d="M27.7,92.91c-.37.26-1,0-1.35-.52s-.37-1.18,0-1.44,1,0,1.35.51.37,1.19,0,1.45Z"
                      />
                      <path
                        className="cls-2"
                        d="M31,96.27A1.13,1.13,0,0,1,29.41,96c-.53-.49-.68-1.18-.34-1.54s1-.27,1.56.23.68,1.18.33,1.54Z"
                      />
                      <path
                        className="cls-2"
                        d="M35.46,98.22c-.15.47-.82.69-1.51.49s-1.13-.76-1-1.24.82-.7,1.51-.49,1.13.76,1,1.24Z"
                      />
                      <path
                        className="cls-2"
                        d="M40.4,98.58c0,.5-.56.91-1.28.92s-1.3-.38-1.31-.88.56-.91,1.29-.92,1.3.39,1.3.88Z"
                      />
                      <path
                        className="cls-2"
                        d="M45,97.8c.09.49-.41,1-1.12,1.12s-1.35-.17-1.44-.66.42-1,1.12-1.12,1.35.17,1.44.66Z"
                      />
                    </g>
                  </g>
                </svg>{" "}
              </StyledGithubIcon>
              <div>
                <h3>GitHub</h3>
                <p>View all Connext repositories.</p>
              </div>
            </CenterCard>
          </Link>
        </Row>
      </Container>
    </Layout>
  );
}
