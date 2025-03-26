import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

document.getElementById("root").innerHTML =
    "<my-react-app ws-gateway-url='wss://ws.coincap.io/prices?assets=bitcoin'></my-react-app>";