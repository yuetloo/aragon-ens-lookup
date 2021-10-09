import { IdentityBadge } from '@aragon/ui'
import { Error } from './Error'

export function EnsAddress({ error, address, networkType }) {
  return (
    <>
      {error ? (
        <Error message={error} />
      ) : (
        <IdentityBadge
          shorten={false}
          entity={address}
          networkType={networkType}
        />
      )}
    </>
  )
}
