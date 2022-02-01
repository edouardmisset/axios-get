import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const GITHUB_API_ENDPOINT = `https://api.github.com/search/repositories?q=stars:>1+language:javascript&sort=stars&order=desc&type=Repositories`

function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  async function fetchData() {
    setLoading(true)
    try {
      const result = await axios.get(GITHUB_API_ENDPOINT)
      console.log(result)
      setData(result.data.items)
      setLoading(false)
      setError(false)
    } catch (error) {
      console.error('error: ', error)
      setError(`${error}`)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <p>Loading ...</p>
  if (error)
    return (
      <p>
        There was an error loading the repos.{' '}
        <button onClick={fetchData}>Try again</button>
      </p>
    )
  return (
    <div>
      <h1>Top Github repos</h1>
      {data.map((repo, index) => (
        <p key={repo.id}>
          {index + 1}. <a href={repo.url}>{repo.name}</a> (
          {repo.stargazers_count.toLocaleString()} ⭐️)
        </p>
      ))}
    </div>
  )
}

export default App
