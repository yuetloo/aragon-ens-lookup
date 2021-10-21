import { useState } from 'react'
import { Apm } from '../apm'
import { Tag, TextCopy, IdentityBadge } from '@aragon/ui'
import styled from 'styled-components'

export function Versions({ repo, provider, network }) {
  const [versions, setVersions] = useState(null)

  console.log('in versions', repo)
  useState(() => {
    let cancel = false

    async function getVersions() {
      const apm = new Apm(provider)
      try {
        const versionList = await apm.getAllVersions(repo.domain)
        console.log('versions', versionList)

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
    console.log('no version')
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
          <div>
            {item.content.provider}:
            <TextCopy value={item.content.location}></TextCopy>
          </div>
          <IdentityBadge
            shorten={false}
            entity={item.contractAddress}
            networkType={network.type}
          />
        </Box>
      ))}
    </div>
  )
}

const Box = styled.div`
  padding: 24px;
`
