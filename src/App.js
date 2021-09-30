import { ensResolve } from '@aragon/wrapper'
import { useCallback, useEffect, useState } from 'react'
import { Box, Header, Main, Field, SearchInput } from '@aragon/ui'
import { KNOWN_ADDRESSES, KNOWN_NETWORKS } from './constants'
import Web3 from 'web3'
import { KnownApps } from './components/KnownApps'
import { EnsAddress } from './components/EnsAddress'
import { Templates } from './components/Templates'

async function getDomainOwner(provider, domain) {
  return provider.eth.ens.registry.getOwner(domain)
}

function App() {
  const [provider, setProvider] = useState(null)
  const [domain, setDomain] = useState('aragonpm.eth')
  const [result, setResult] = useState({})
  const [owner, setOwner] = useState({})
  const [knownAddresses, setKnownAddresses] = useState([])
  const [network, setNetwork] = useState({})

  useEffect(() => {
    if (window.ethereum) {
      let cancel = false
      function handleChainChanged(chainId) {
        console.log('chainChanged', chainId)
        window.location.reload()
      }

      async function fetchNetwork() {
        const web3 = new Web3(window.ethereum)
        const id = await web3.eth.getChainId()
        if (!cancel) {
          const connectedNetwork = KNOWN_NETWORKS.get(id)
          if (connectedNetwork) {
            web3.eth.ens.registryAddress = connectedNetwork.ensRegistry
          }
          setProvider(web3)
          setNetwork(connectedNetwork || {})
        }
      }

      fetchNetwork()
      window.ethereum.on('chainChanged', handleChainChanged)

      return () => {
        cancel = true
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('chainChanged', handleChainChanged)
        }
      }
    }
  }, [])

  useEffect(() => {
    let cancel = false

    if (!provider || !network.ensRegistry) return

    async function fetchKnownAddresses() {
      const addresses = await Promise.all(
        KNOWN_ADDRESSES.map(async (app) => {
          let address
          let error
          try {
            address = await ensResolve(app.domain, {
              provider: provider.currentProvider,
              registryAddress: network.ensRegistry,
            })
          } catch (e) {
            error = e.message
          }

          return { ...app, address, error }
        })
      )

      if (!cancel) {
        setKnownAddresses(addresses)
      }
    }

    fetchKnownAddresses()

    return () => {
      cancel = true
    }
  }, [provider, network])

  useEffect(() => {
    let cancel = false
    if (!provider || !domain || !network.ensRegistry) return

    async function fetchDomainData() {
      try {
        const address = await ensResolve(domain, {
          provider: provider.currentProvider,
          registryAddress: network.ensRegistry,
        })

        if (!cancel) {
          setResult({ address })
        }
      } catch (error) {
        if (!cancel) setResult({ error: error.message })
      }

      try {
        const domainOwner = await getDomainOwner(provider, domain)
        if (!cancel) {
          setOwner({ address: domainOwner })
        }
      } catch (err) {
        if (!cancel) setOwner({ error: err.message })
      }
    }

    fetchDomainData()

    return () => {
      cancel = true
    }
  }, [domain, provider, network])

  const handleChange = useCallback((val) => {
    console.log('value', val)
    setDomain(val)
  }, [])

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
              error={result.error}
              address={result.address}
              networkType={network.type}
            />
          </Field>
          <Field label="owner">
            <EnsAddress
              error={owner.error}
              address={owner.address}
              networkType={owner.type}
            />
          </Field>
        </div>
      </Box>
      <Box heading="Known Apps:">
        <KnownApps
          apps={knownAddresses.filter((m) => m.type === 'app')}
          network={network}
          provider={provider}
        />
      </Box>
      <Box heading="Known Templates:">
        <Templates
          templates={knownAddresses.filter((m) => m.type === 'template')}
          network={network}
        />
      </Box>
    </Main>
  )
}

export default App
