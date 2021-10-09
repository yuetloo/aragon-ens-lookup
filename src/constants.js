export const KNOWN_ADDRESSES = [
  { name: 'Agent', domain: 'agent.aragonpm.eth', type: 'app' },
  { name: 'Finance', domain: 'finance.aragonpm.eth', type: 'app' },
  { name: 'Survey', domain: 'survey.aragonpm.eth', type: 'app' },
  { name: 'Token Manager', domain: 'token-manager.aragonpm.eth', type: 'app' },
  { name: 'Vault', domain: 'vault.aragonpm.eth', type: 'app' },
  { name: 'Voting', domain: 'voting.aragonpm.eth', type: 'app' },

  {
    domain: 'dandelion-voting.aragonpm.eth',
    name: 'Dandelion Voting',
    type: 'app',
  },
  { domain: 'time-lock.aragonpm.eth', name: 'Time Lock', type: 'app' },
  {
    domain: 'token-balance-oracle.aragonpm.eth',
    name: 'Token Oracle',
    type: 'app',
  },
  { domain: 'token-request.aragonpm.eth', name: 'Token Request', type: 'app' },

  { domain: 'redemptions.aragonpm.eth', name: 'Redemptions', type: 'app' },
  { domain: 'address-book.aragonpm.eth', name: 'Address Book', type: 'app' },
  { domain: 'allocations.aragonpm.eth', name: 'Allocations', type: 'app' },
  { domain: 'discussions.aragonpm.eth', name: 'Discussions', type: 'app' },
  { domain: 'dot-voting.aragonpm.eth', name: 'Dot Voting', type: 'app' },
  { domain: 'projects.aragonpm.eth', name: 'Projects', type: 'app' },
  { domain: 'rewards.aragonpm.eth', name: 'Rewards', type: 'app' },

  {
    name: 'Company',
    domain: 'company-template.aragonpm.eth',
    type: 'template',
  },
  {
    name: 'Membership',
    domain: 'membership-template.aragonpm.eth',
    type: 'template',
  },
  {
    name: 'Reputation',
    domain: 'reputation-template.aragonpm.eth',
    type: 'template',
  },
  {
    name: 'Dandelion',
    domain: 'dandelion-org-template.aragonpm.eth',
    type: 'template',
  },
  {
    name: 'Open Enterprise',
    domain: 'open-enterprise-template.aragonpm.eth',
    type: 'template',
  },
  {
    name: 'Fundraising',
    domain: 'aragon-fundraising.aragonpm.eth',
    type: 'template',
  },
]

export const KNOWN_NETWORKS = new Map([
  [
    1,
    {
      ensRegistry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      name: 'Ethereum Mainnet',
      type: 'main',
    },
  ],
  [
    4,
    {
      ensRegistry: '0x98df287b6c145399aaa709692c8d308357bc085d',
      name: 'Ethereum Rinkeby Testnet',
      type: 'rinkeby',
    },
  ],
  [
    137,
    {
      ensRegistry: '0x3c70a0190d09f34519e6e218364451add21b7d4b',
      name: 'Polygon Mainnet',
      type: 'matic',
    },
  ],
  [
    80001,
    {
      ensRegistry: '0x431f0eed904590b176f9ff8c36a1c4ff0ee9b982',
      name: 'Polygon Mumbai Testnet',
      type: 'mumbai',
    },
  ],
])
