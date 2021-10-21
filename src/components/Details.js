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
                      <div>{app.domain}</div>
                      <EnsAddress
                        provider={provider}
                        domain={app.domain}
                        networkType={network.type}
                      />
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
