import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import styles from './index.module.css'

const GET_ITEMS = gql`
  query GetItems {
    items {
      id
      name
    }
  }
`

interface ItemsData {
  items: { id: string; name: string }[]
}

export function Game() {
  const { data, loading, error } = useQuery<ItemsData>(GET_ITEMS)

  return (
    <main className={styles.landing}>
      {loading && <p role="status">Loading items</p>}
      {error && <p role="alert">Unable to load items. Please try again later.</p>}
      {!loading && !error && (
        data?.items.length ? (
          <ul>
            {data.items.map((item) => <li key={item.id}>{item.name}</li>)}
          </ul>
        ) : <p>No items found.</p>
      )}
    </main>
  )
}

export default Game
