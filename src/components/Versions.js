import { useState } from 'react'
import APM from '@aragon/apm'
import { utils } from 'ethers'
import { Tag, TextCopy } from '@aragon/ui'
import { EnsAddress } from './EnsAddress'
import styled from 'styled-components'

export function Versions({ repo, provider, network }) {
  const [versions, setVersions] = useState(null)

  useState(() => {
    async function getVersions() {
      const apm = await APM(provider, {
        ensRegistryAddress: network.ensRegistry,
      })

      const appId = utils.namehash(repo.domain)
      try {
        const versionList = await apm.getAllVersions(appId)
        setVersions(versionList.reverse())
      } catch (_) {
        setVersions([])
      }
    }

    getVersions()
  }, [repo, network])

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
          <div>
            {item.content.provider}:
            <TextCopy value={item.content.location}></TextCopy>
          </div>
          <EnsAddress
            address={item.contractAddress}
            networkType={network.type}
          ></EnsAddress>
        </Box>
      ))}
    </div>
  )
}

const Box = styled.div`
  padding: 24px;
`
