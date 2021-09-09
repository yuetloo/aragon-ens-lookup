import { ensResolve } from '@aragon/wrapper'
import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Header,
  Main,
  Field,
  SearchInput,
  IdentityBadge,
} from '@aragon/ui'
import { KNOWN_ADDRESSES, KNOWN_NETWORKS } from './constants'
import Web3 from 'web3'
import styled from 'styled-components'

function EnsAddress({ error, address, networkType }) {
  return (
    <>
      {error ? (
        <Error>{error}</Error>
      ) : (
        <IdentityBadge entity={address} networkType={networkType} />
      )}
    </>
  )
}

function App() {
  const [provider, setProvider] = useState(null)
  const [domain, setDomain] = useState('yuetloo.aragonid.eth')
  const [result, setResult] = useState({})
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
          setProvider(web3)
          setNetwork(KNOWN_NETWORKS.get(id) || {})
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

    async function fetchDomainAddress() {
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
    }

    fetchDomainAddress()

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
        <Field label="address for">
          <SearchInput wide value={domain} onChange={handleChange} />
        </Field>

        <div>
          <EnsAddress
            error={result.error}
            address={result.address}
            networkType={network.type}
          />
        </div>
      </Box>
      <Box heading="Known Apps:">
        <ol>
          {knownAddresses
            .filter((m) => m.type === 'app')
            .map((app, index) => {
              return (
                <li key={index}>
                  <Field label={app.name}>
                    {app.domain} ({' '}
                    <EnsAddress
                      error={app.error}
                      address={app.address}
                      networkType={network.type}
                    />
                    )
                  </Field>
                </li>
              )
            })}
        </ol>
      </Box>
      <Box heading="Known Templates:">
        <ol>
          {knownAddresses
            .filter((m) => m.type === 'template')
            .map((app, index) => {
              return (
                <li key={index}>
                  <Field label={app.name}>
                    {app.domain} ({' '}
                    <EnsAddress
                      error={app.error}
                      address={app.address}
                      networkType={network.type}
                    />
                    )
                  </Field>
                </li>
              )
            })}
        </ol>
      </Box>
    </Main>
  )
}

const Error = styled.span`
  color: red;
`
export default App
