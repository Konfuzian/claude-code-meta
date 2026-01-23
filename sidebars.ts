import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/first-session',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/cli-commands',
        'features/mcp-integrations',
        'features/ide-integrations',
        'features/hooks',
        'features/skills',
        'features/plugins',
        'features/github-integration',
      ],
    },
    {
      type: 'category',
      label: 'Best Practices',
      items: [
        'best-practices/workflow-tips',
        'best-practices/context-management',
        'best-practices/security',
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
