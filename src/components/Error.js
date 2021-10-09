export function Error({ message }) {
  return (
    <div style={{ color: 'red', overflowWrap: 'anywhere', display: 'inline' }}>
      {message}
    </div>
  )
}
