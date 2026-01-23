import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'claude-code-meta',
  tagline: 'Community resource for Claude Code features, best practices, and ecosystem tools',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://konfuzian.github.io',
  baseUrl: '/claude-code-meta/',

  organizationName: 'Konfuzian',
  projectName: 'claude-code-meta',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Konfuzian/claude-code-meta/tree/main/',
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'claude-code-meta',
      logo: {
        alt: 'Claude Code Meta Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/ecosystem/overview',
          label: 'Ecosystem',
          position: 'left',
        },
        {to: "/docs/whats-new/", label: "What's New", position: 'left'},
        {
          href: 'https://github.com/Konfuzian/claude-code-meta',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Features',
              to: '/docs/features/cli-commands',
            },
            {
              label: 'Best Practices',
              to: '/docs/best-practices/workflow-tips',
            },
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {
              label: 'Agent Orchestrators',
              to: '/docs/ecosystem/agent-orchestrators',
            },
            {
              label: 'Skills Frameworks',
              to: '/docs/ecosystem/skills-frameworks',
            },
            {
              label: 'Awesome Resources',
              to: '/docs/ecosystem/awesome-resources',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Konfuzian/claude-code-meta',
            },
            {
              label: 'Anthropic',
              href: 'https://www.anthropic.com',
            },
            {
              label: 'Claude Code Docs',
              href: 'https://code.claude.com/docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} claude-code-meta. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
