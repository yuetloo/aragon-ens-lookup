import { IdentityBadge } from '@aragon/ui'
import { useState, useEffect } from 'react'
import { Error } from './Error'

function Paranthesis({ encloseWithParathesis, children }) {
  return (
    <>
      {encloseWithParathesis ? '(' : ''}
      {children}
      {encloseWithParathesis ? ')' : ''}
    </>
  )
}

export function EnsAddress({
  provider,
  domain,
  networkType,
  encloseWithParathesis,
}) {
  const [address, setAddress] = useState('')
  const [error, setError] = useState()

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
    return (
      <Paranthesis encloseWithParathesis={encloseWithParathesis}>
        <Error message={error} />
      </Paranthesis>
    )
  }

  if (address) {
    return (
      <Paranthesis encloseWithParathesis={encloseWithParathesis}>
        <IdentityBadge
          shorten={false}
          entity={address}
          networkType={networkType}
        />
      </Paranthesis>
    )
  }

  return null
}
