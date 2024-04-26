import React, { useEffect, useState } from 'react'
import './App.scss'
import Home from '@pages/home/Home'
import { useDispatch, useSelector } from 'react-redux'
import {
  setViewportInfo
} from '@redux/actions'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { type RootState } from './redux/reducers'

function App () {
  const dispatch = useDispatch()
  const [screenSize, setScreenSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    orientation: window.matchMedia('(orientation: portrait)').matches
      ? 'portrait'
      : 'landscape'
  })

  const currentWidth = useSelector(({ UI }: RootState) => UI.width)

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        orientation: window.matchMedia('(orientation: portrait)').matches
          ? 'portrait'
          : 'landscape'
      })
    }

    window.addEventListener('resize', handleResize)
    if (currentWidth !== screenSize.width) {
      dispatch(setViewportInfo(screenSize))
    }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [screenSize])

  useEffect(() => {
  }, [])

  return (
    <div className="App">
      <ToastContainer />
      <Home />
    </div>
  )
}

export default App
