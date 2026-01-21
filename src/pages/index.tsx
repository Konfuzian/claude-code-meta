import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/ecosystem/overview"
            style={{marginLeft: '1rem'}}>
            Explore Ecosystem
          </Link>
        </div>
      </div>
    </header>
  );
}

function QuickLinks() {
  const links = [
    {category: 'Getting Started', items: [
      {label: 'Installation', to: '/docs/getting-started/installation'},
      {label: 'First Session', to: '/docs/getting-started/first-session'},
      {label: 'Configuration', to: '/docs/getting-started/configuration'},
    ]},
    {category: 'Features', items: [
      {label: 'CLI Commands', to: '/docs/features/cli-commands'},
      {label: 'MCP Integrations', to: '/docs/features/mcp-integrations'},
      {label: 'IDE Integrations', to: '/docs/features/ide-integrations'},
      {label: 'Hooks', to: '/docs/features/hooks'},
      {label: 'Skills', to: '/docs/features/skills'},
      {label: 'GitHub Integration', to: '/docs/features/github-integration'},
    ]},
    {category: 'Best Practices', items: [
      {label: 'Workflow Tips', to: '/docs/best-practices/workflow-tips'},
      {label: 'Context Management', to: '/docs/best-practices/context-management'},
      {label: 'Security', to: '/docs/best-practices/security'},
      {label: 'TDD with Claude', to: '/docs/best-practices/tdd-with-claude'},
    ]},
    {category: 'Ecosystem', items: [
      {label: 'Overview', to: '/docs/ecosystem/overview'},
      {label: 'Agent Orchestrators', to: '/docs/ecosystem/agent-orchestrators'},
      {label: 'Safety Tools', to: '/docs/ecosystem/safety-tools'},
      {label: 'Skills Frameworks', to: '/docs/ecosystem/skills-frameworks'},
      {label: 'Awesome Resources', to: '/docs/ecosystem/awesome-resources'},
    ]},
  ];

  return (
    <section style={{padding: '2rem 0', backgroundColor: 'var(--ifm-color-emphasis-100)'}}>
      <div className="container">
        <Heading as="h2" style={{textAlign: 'center', marginBottom: '2rem'}}>
          All Pages
        </Heading>
        <div className="row">
          {links.map((section) => (
            <div key={section.category} className="col col--3">
              <Heading as="h3" style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>
                {section.category}
              </Heading>
              <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                {section.items.map((item) => (
                  <li key={item.to} style={{marginBottom: '0.25rem'}}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Community resource for Claude Code features, best practices, and ecosystem tools">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <QuickLinks />
      </main>
    </Layout>
  );
}
