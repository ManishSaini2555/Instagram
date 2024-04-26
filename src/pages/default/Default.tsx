import { React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Default () {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({
      pathname: '/summary'
    })
  }, [])

  return <div></div>
}

export default Default
