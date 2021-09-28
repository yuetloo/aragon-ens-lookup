import { Field } from '@aragon/ui'
import { EnsAddress } from './EnsAddress'

export function Templates({ templates, network }) {
  return (
    <ol>
    {templates
      .map((app, index) => {
        return (
          <li key={index}>
            <Field label={app.name}>
              {app.domain} ({' '}
              <EnsAddress
                error={app.error}
                address={app.address}
                networkType={network.type}
              />
              )
            </Field>
          </li>
        )
      })}
    </ol>
  )
}