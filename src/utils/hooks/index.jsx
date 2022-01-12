import { useState, useEffect } from 'react'

export const useFetchArticles = url => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError(true)
      })
  }, [url])
  return { isLoading, data, error }
}

export const useFetchUser = url => {
  const [user, setUser] = useState([])
  const [userError, setUserError] = useState(false)
  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    setUserLoading(true)
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setUser(data)
        setUserLoading(false)
      })
      .catch(err => {
        console.log(err)
        setUserError(true)
      })
  }, [url])
  return { userLoading, user, userError }
}

export const useFetchComments = url => {
  const [comments, setComments] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setComments(data)
      })
      .catch(err => {
        console.log(err)
        setError(true)
      })
  }, [url])
  return { comments, error }
}
