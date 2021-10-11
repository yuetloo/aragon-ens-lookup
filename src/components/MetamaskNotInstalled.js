import { EmptyStateCard } from '@aragon/ui'

export function MetamaskNotInstalled() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div style={{ alignSelf: 'center' }}>
        <EmptyStateCard
          illustration={
            <img
              width="200px"
              src={`/aragon-ens-lookup/aragon-ui/48526b4ed811c6ff.png`}
              alt="metamask not found"
            />
          }
          text="Opps! Metamask is not installed!"
        ></EmptyStateCard>
      </div>
    </div>
  )
}
