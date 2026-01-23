import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: "What's New",
      items: [
        'whats-new/index',
        'whats-new/changelog',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/first-session',
        'getting-started/configuration',
        'getting-started/comparison',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/cli-commands',
        'features/ide-integrations',
        'features/mcp-integrations',
        'features/github-integration',
        'features/hooks',
        'features/skills',
        'features/plugins',
      ],
    },
    {
      type: 'category',
      label: 'Best Practices',
      items: [
        'best-practices/workflow-tips',
        'best-practices/security',
        'best-practices/context-management',
        'best-practices/tdd-with-claude',
      ],
    },
    {
      type: 'category',
      label: 'Ecosystem',
      items: [
        'ecosystem/overview',
        'ecosystem/agent-orchestrators',
        'ecosystem/safety-tools',
        'ecosystem/skills-frameworks',
        'ecosystem/awesome-resources',
      ],
    },
  ],
};

export default sidebars;
