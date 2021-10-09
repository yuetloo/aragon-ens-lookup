import { Field } from '@aragon/ui'
import { Accordion } from '@aragon/ui'
import { EnsAddress } from './EnsAddress'
import { Versions } from './Versions'

export function Details({ apps, network, provider }) {
  return (
    <ol>
      {apps.map((app, index) => {
        return (
          <li key={index}>
            <Field label={app.name}>
              <Accordion
                items={[
                  [
                    <div>
                      {app.domain} ({' '}
                      <EnsAddress
                        error={app.error}
                        address={app.address}
                        networkType={network.type}
                      />
                      )
                    </div>,
                    <Versions
                      repo={app}
                      network={network}
                      provider={provider}
                    />,
                  ],
                ]}
              />
            </Field>
          </li>
        )
      })}
    </ol>
  )
}
