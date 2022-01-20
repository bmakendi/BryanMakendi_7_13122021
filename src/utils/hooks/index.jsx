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

export const useFetchOneArticle = url => {
  const [article, setArticle] = useState([])
  useEffect(() => {
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setArticle(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [url])
  return { article }
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

export const useFormatDate = date => {
  const tempDate = date.slice(0, 10)
  const formattedYear = tempDate.slice(2, 4)
  const formattedMonth = tempDate.slice(5, 7)
  const formattedDay = tempDate.slice(8, 10)
  const formattedDate = `${formattedDay}-${formattedMonth}-${formattedYear}`
  return formattedDate
}
