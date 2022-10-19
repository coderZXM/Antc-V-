import React, { memo } from 'react'
import Login from './page/Login'
import routres from './router'
import 'antd/dist/antd.min.css'

import {useRoutes} from 'react-router-dom'

const App:React.FC = memo(() => {
  return (
    <div>
     { useRoutes(routres)}
    </div>
  )
})

export default App
