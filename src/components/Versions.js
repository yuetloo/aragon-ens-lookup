import { useState } from 'react'
import { Apm } from '../apm'
import { Tag, Link, IdentityBadge, Field } from '@aragon/ui'
import styled from 'styled-components'

function toIpfsLink(cid) {
  return `https://ipfs.io/ipfs/${cid}`
}

export function Versions({ repo, provider, network }) {
  const [versions, setVersions] = useState(null)

  useState(() => {
    let cancel = false

    async function getVersions() {
      const apm = new Apm(provider)
      try {
        const versionList = await apm.getAllVersions(repo.domain)

        if (!cancel) setVersions(versionList.reverse())
      } catch (err) {
        console.log('error', err)
        if (!cancel) setVersions([])
      }
    }

    getVersions()

    return () => {
      cancel = true
    }
  }, [repo, provider])

  if (!versions) {
    return null
  }

  if (versions.length === 0) {
    return <Box>No versions</Box>
  }

  return (
    <div>
      {versions.map((item) => (
        <Box key={item.version}>
          <Tag mode="new">{item.version}</Tag>
          <Field label="Contract">
            <IdentityBadge
              shorten={false}
              entity={item.contractAddress}
              networkType={network.type}
            />
          </Field>
          <Field label="Content">
            <Link href={toIpfsLink(item.content.location)}>
              {toIpfsLink(item.content.location)}
            </Link>
          </Field>
        </Box>
      ))}
    </div>
  )
}

const Box = styled.div`
  padding: 24px;
`
