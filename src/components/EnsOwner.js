import { IdentityBadge } from '@aragon/ui'
import { Contract, utils } from 'ethers'
import { useState, useEffect } from 'react'

const ensAbi = ['function owner(bytes32 node) external view returns (address)']

export function EnsOwner({ provider, domain, networkType }) {
  const [owner, setOwner] = useState(null)

  useEffect(() => {
    let cancel = false
    async function getOwner() {
      if (!domain || !networkType) {
        setOwner(null)
        return
      }

      try {
        const network = await provider.getNetwork()
        if (!network.ensAddress) {
          if (!cancel) {
            setOwner(null)
          }
          return
        }

        const ens = new Contract(network.ensAddress, ensAbi, provider)
        const domainHash = utils.namehash(domain)
        const domainOwner = await ens.owner(domainHash)
        if (!cancel) setOwner(domainOwner)
      } catch (err) {
        if (!cancel) setOwner(null)
      }
    }

    getOwner()

    return () => {
      cancel = true
    }
  }, [provider, domain, networkType])

  if (!owner) {
    return null
  }

  return (
    <IdentityBadge shorten={false} entity={owner} networkType={networkType} />
  )
}
