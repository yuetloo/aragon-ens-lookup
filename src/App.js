import { useCallback, useEffect, useState } from 'react'
import { Box, Header, Main, Field, SearchInput } from '@aragon/ui'
import { KNOWN_ADDRESSES } from './constants'
import { SUPPORTED_NETWORKS } from './networks'
import { providers } from 'ethers'
import { Details } from './components/Details'
import { EnsAddress } from './components/EnsAddress'
import { EnsOwner } from './components/EnsOwner'
import { MetamaskNotInstalled } from './components/MetamaskNotInstalled'

const knownAddresses = []
for (const addr of KNOWN_ADDRESSES.values()) {
  knownAddresses.push(addr)
}

function App() {
  const [provider, setProvider] = useState(null)
  const [domain, setDomain] = useState('aragonpm.eth')
  const [network, setNetwork] = useState({})

  useEffect(() => {
    if (window.ethereum) {
      let cancel = false
      function handleChainChanged(chainId) {
        console.log('chainChanged', chainId)
        window.location.reload()
      }

      async function fetchNetwork() {
        const ethersProvider = new providers.Web3Provider(window.ethereum)
        try {
          const ethersNetwork = await ethersProvider.getNetwork()
          if (!cancel) {
            const { chainId } = ethersNetwork
            const supportedNetwork = SUPPORTED_NETWORKS.get(chainId)
            if (supportedNetwork) {
              ethersNetwork.ensAddress = supportedNetwork.ensRegistry
              ethersNetwork.name = supportedNetwork.name
            } else {
              console.log('unsupported network', ethersNetwork)
            }
            setProvider(
              new providers.Web3Provider(window.ethereum, ethersNetwork)
            )
            setNetwork(supportedNetwork || {})
          }
        } catch (err) {}
      }

      window.ethereum.on('chainChanged', handleChainChanged)
      fetchNetwork()

      return () => {
        cancel = true
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('chainChanged', handleChainChanged)
        }
      }
    }
  }, [])

  const handleChange = useCallback((val) => {
    setDomain(val)
  }, [])

  if (!provider) {
    return <MetamaskNotInstalled />
  }

  return (
    <Main>
      <Header
        primary="Aragon ENS"
        secondary={network.name || 'Unsupported network'}
      />
      <Box>
        <Field label="Lookup ENS name">
          <SearchInput wide value={domain} onChange={handleChange} />
        </Field>

        <div>
          <Field label="address">
            <EnsAddress
              provider={provider}
              domain={domain}
              networkType={network.type}
            />
          </Field>
          <Field label="owner">
            <EnsOwner
              provider={provider}
              domain={domain}
              networkType={network.type}
            />
          </Field>
        </div>
      </Box>
      <Box heading="Known Apps:">
        <Details
          apps={knownAddresses.filter((m) => m.type === 'app')}
          network={network}
          provider={provider}
        />
      </Box>
      <Box heading="Known Templates:">
        <Details
          apps={knownAddresses.filter((m) => m.type === 'template')}
          network={network}
          provider={provider}
        />
      </Box>
    </Main>
  )
}

export default App
