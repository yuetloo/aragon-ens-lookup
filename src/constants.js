export const KNOWN_ADDRESSES = [
  { name: 'Agent', domain: 'agent.aragonpm.eth', type: 'app' },
  { name: 'Finance', domain: 'finance.aragonpm.eth', type: 'app' },
  {
    name: 'Fundraising',
    domain: 'aragon-fundraising.aragonpm.eth',
    type: 'app',
  },
  { name: 'Survey', domain: 'survey.aragonpm.eth', type: 'app' },
  { name: 'TokenManager', domain: 'token-manager.aragonpm.eth', type: 'app' },
  { name: 'Vault', domain: 'vault.aragonpm.eth', type: 'app' },
  { name: 'Voting', domain: 'voting.aragonpm.eth', type: 'app' },

  {
    name: 'Company',
    domain: 'company-template.aragonpm.eth',
    type: 'template',
  },
  {
    name: 'Dandelion',
    domain: 'dandelion-org-template.aragonpm.eth',
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
]

export const KNOWN_ENS_REGISTRIES = new Map([
  [1, '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'],
  [4, '0x98df287b6c145399aaa709692c8d308357bc085d'],
  [137, '0x3c70a0190d09f34519e6e218364451add21b7d4b'],
  [80001, '0x431f0eed904590b176f9ff8c36a1c4ff0ee9b982'],
])

export const KNOWN_NETWORKS = new Map([
  [
    1,
    {
      ensRegistry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      name: 'Ethereum Mainnet',
    },
  ],
  [
    4,
    {
      ensRegistry: '0x98df287b6c145399aaa709692c8d308357bc085d',
      name: 'Ethereum Rinkeby Testnet',
    },
  ],
  [
    137,
    {
      ensRegistry: '0x3c70a0190d09f34519e6e218364451add21b7d4b',
      name: 'Polygon Mainnet',
    },
  ],
  [
    80001,
    {
      ensRegistry: '0x431f0eed904590b176f9ff8c36a1c4ff0ee9b982',
      name: 'Polygon Mumbai Testnet',
    },
  ],
])
