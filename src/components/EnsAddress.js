import { IdentityBadge, useViewport } from '@aragon/ui'
import { useState, useEffect } from 'react'
import { Error } from './Error'

export function EnsAddress({ provider, domain, networkType }) {
  const { below } = useViewport()
  const [address, setAddress] = useState('')
  const [error, setError] = useState()

  const shortenAddress = below('medium')

  useEffect(() => {
    let cancel = false
    async function getAddress() {
      try {
        const domainAddress = await provider.resolveName(domain)
        if (!cancel) setAddress(domainAddress)
      } catch (err) {
        console.log('error', err)
        if (!cancel) setError(err.message)
      }
    }

    getAddress()

    return () => {
      cancel = true
    }
  }, [provider, domain])

  if (error) {
    return <Error message={error} />
  }

  if (address) {
    return (
      <IdentityBadge
        shorten={shortenAddress}
        entity={address}
        networkType={networkType}
      />
    )
  }

  return null
}
