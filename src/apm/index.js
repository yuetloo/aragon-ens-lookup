import { Contract, utils } from 'ethers'

const repoAbi = [
  'function getVersionsCount() public view returns (uint256)',
  'function getByVersionId(uint _versionId) public view returns (uint16[3] semanticVersion, address contractAddress, bytes contentURI)',
]

export class Apm {
  constructor(provider) {
    this.provider = provider
  }

  async getRepository(domain) {
    const address = await this.provider.resolveName(domain)
    return new Contract(address, repoAbi, this.provider)
  }

  async getAllVersions(domain) {
    const repository = await this.getRepository(domain)
    const versionCount = await repository.getVersionsCount()

    const versionsPromises = []
    for (let i = 1; i <= versionCount; i++) {
      versionsPromises.push(repository.getByVersionId(i))
    }
    const versions = await Promise.all(versionsPromises)
    return versions.map(({ semanticVersion, contractAddress, contentURI }) => {
      const contentURIString = utils.toUtf8String(contentURI)
      const [provider, location] = contentURIString.split(/:(.+)/)
      return {
        version: semanticVersion.join('.'),
        contractAddress,
        content: { provider, location },
      }
    })
  }
}
