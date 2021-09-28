import { IdentityBadge } from '@aragon/ui'
import styled from 'styled-components'

const Error = styled.span`
  color: red;
`

export function EnsAddress({ error, address, networkType }) {
  return (
    <>
      {error ? (
        <Error>{error}</Error>
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
