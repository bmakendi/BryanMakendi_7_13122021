import { useState, useEffect } from 'react'

export const useSignup = (url, body) => {
  const [data, setData] = useState({})
  const [error, setError] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!url || !body) return
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type/': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await response.json()
        setData(data)
      } catch (err) {
        console.log(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url, body])
  return { isLoading, data, error }
}
