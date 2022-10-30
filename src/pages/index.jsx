import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

import styles from "./index.module.css";

import styled from "@emotion/styled";

import DiscordLogo from "/static/img/discord_logo.svg";

import GithubLogo from "/static/img/github_logo.svg";

import ConnextLogo from "/static/img/connext_Logo.svg";

import XCallSnippet from "/static/img/xcall_snippet.png"

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

export const Actions = [
  {
    title: "Core Concepts",
    href: "#",
    icon: InformationCircleIcon,
    to: "./core-concepts/understanding-connext",
    text: `Review core concepts of bridging and the Connext Protocol.`,
  },
  {
    title: "Developer Guides",
    href: "#",
    icon: LinkIcon,
    to: "./developers/guides/xcall-status",
    text: `Learn how to use xcall, the cross-chain primitive.`,
  },
  {
    title: "Run a Router",
    href: "#",
    icon: BookOpenIcon,
    to: "./routers/routers-intro",
    text: `Become a core participant in the network and earn fees.`,
  },
  {
    title: "Contract Deployments",
    href: "#",
    icon: BookOpenIcon,
    to: "./resources/deployments",
    text: `Deployed contract addresses on mainnet and testnet.`,
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-bottom: 2rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  justify-content: center;
  margin: 0 auto;
  padding: 3rem 0;
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

const LongRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 16px;
  justify-content: center;
  margin: 0 auto;
  max-width: 960px;

  @media (max-width: 1250px) {
    grid-template-columns: 1fr 1fr;
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
  padding: 1rem 0;

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
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 20px;
  border: 1px solid var(--ifm-color-emphasis-200);
  border-color: rgba(140, 127, 148, 0.5);

  &:hover {
    border: 1px solid var(--ifm-color-emphasis-400);
    border-color: #9c62f9;
  }

  @media (max-width: 960px) {
    width: 100%;
  }
`;

const CTACard = styled.div`
  display: flex;
  width: 200px;
  margin-bottom: 1rem;
  color: #9c62f9;
  max-height: 250px;
  padding: 1rem;
  margin-top: 2rem;
  font-size: 20px;
  font-weight: 600;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border-radius: 20px;
  border: 3px solid var(--ifm-color-emphasis-200);
  border-color: rgba(140, 127, 148, 0.5);

  &:hover {
    border: 3px solid var(--ifm-color-emphasis-400);
    border-color: #9c62f9;
  }

  @media (max-width: 960px) {
    width: 100%;
  }
`;

const CenterCard = styled(Card)`
  width: 100%;
  min-width: 250px;
  margin: 1rem 0rem;
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

const FixedCard = styled(Card)`
  backdrop-filter: blur(10px);
  min-height: 200px;
  max-width: 300px;
  min-width: 300px;
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

              <p
                style={{
                  maxWidth: "800px",
                  margin: "2rem",
                  fontWeight: 500,
                  textAlign: "left",
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                  align: "left",
                }}
              >
                Turn your dApp into a xApp with just a few lines of code. 
              </p>

              <div>
                <img src={XCallSnippet} alt="xCall Snippet" style={{borderRadius: "20px", width: "400px"}}  />
              </div>

              <Link 
                style={{ textDecoration: "none" }}
                to="./developers/quickstart"
              >
                <CTACard>
                   Get Started!
                </CTACard>
              </Link>
          </div>

          <LongRow>
            {Actions.map((action) => (
              <Link
                style={{ textDecoration: "none" }}
                to={action.to}
                key={action.to}
              >
                <FixedCard key={action.title}>
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
                </FixedCard>
              </Link>
            ))}
          </LongRow>
        </DocsHeader>

        <TwoRow
          style={{
            gap: "56px",
            marginTop: "4rem",
          }}
        >
          <div>
            <h2>Ecosystem</h2>
            <p>
              Explore the Connext ecosystem.
            </p>
            <div>
              <Link
                style={{ textDecoration: "none" }}
                href={"https://discord.gg/zZGTd9wT"}
              >
                <CenterCard>
                  <DiscordLogo style={{ width: "48px", height: "48px" }} />
                  <div>
                    <h3>Discord</h3>
                    <p>Join us in #dev-hub to get realtime help.</p>
                  </div>
                </CenterCard>
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                href={"https://connext.network/"}
              >
                <CenterCard>
                  <ConnextLogo style={{ width: "48px", height: "48px" }} />
                  <div>
                    <h3>Connext Homepage</h3>
                    <p>Learn more about Connext.</p>
                  </div>
                </CenterCard>
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                href={"https://discord.gg/zZGTd9wT"}
              >
                <CenterCard>
                  <ConnextLogo style={{ width: "48px", height: "48px" }} />
                  <div>
                    <h3>Connext Academy</h3>
                    <p>Community-run knowledge base.</p>
                  </div>
                </CenterCard>
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                href={"https://medium.com/connext/"}
              >
                <CenterCard>
                  <ConnextLogo style={{ width: "48px", height: "48px" }} />
                  <div>
                    <h3>Blog</h3>
                    <p>Read about events, updates, and news.</p>
                  </div>
                </CenterCard>
              </Link>

            </div>
          </div>

          <div>
            <h2>Developers and Users</h2>
            <p>
              Resources for developers and users of the protocol.
            </p>
              <Link
                style={{ textDecoration: "none" }}
                href={"https://bridge.connext.network/"}
              >
                <CenterCard>
                  <ConnextLogo style={{ width: "48px", height: "48px" }} />
                  <div>
                    <h3>Bridge</h3>
                    <p>The official Connext bridge UI.</p>
                  </div>
                </CenterCard>
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                href={"https://connextscan.io/"}
              >
                <CenterCard>
                  <ConnextLogo style={{ width: "48px", height: "48px" }} />
                  <div>
                    <h3>Connextscan</h3>
                    <p>Explore transactions and liquidity data.</p>
                  </div>
                </CenterCard>
              </Link>
              <Link 
                style={{ textDecoration: "none" }}
                href={"https://github.com/nxtp"}
              >
                <CenterCard>
                  <GithubLogo />
                  <div>
                    <h3>nxtp</h3>
                    <p>Monorepo with contracts and offchain agents.</p>
                  </div>
                </CenterCard>
              </Link>
              <Link 
                style={{ textDecoration: "none" }}
                href={"https://github.com/xapp-starter"}
              >
                <CenterCard>
                  <GithubLogo />
                  <div>
                    <h3>xapp-starter</h3>
                    <p>Starter kit for xApps.</p>
                  </div>
                </CenterCard>
              </Link>
          </div>
        </TwoRow>
      </Container>
    </Layout>
  );
}
