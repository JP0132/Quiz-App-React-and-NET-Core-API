import React from 'react'
import useStateContext from '../hooks/useStateContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function Authenticate() {
    //Retrieving the state context of the application
    const {context} = useStateContext()

  //If the particpantID is not 0
  //Then navigate them to the main screen
  //Otherwise back to login
  return (
    context.particpantId ==! 0
        ? <Navigate to="/" />
        : <Outlet/>
  )
}
