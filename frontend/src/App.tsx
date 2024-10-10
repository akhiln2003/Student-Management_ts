import {Route , Routes} from 'react-router-dom'
import Dashbord from './Dashbord'


function App() {


  return (
    <>
    <Routes>
        <Route path='/' element={< Dashbord /> }/>
    </Routes>
     
    </>
  )
}

export default App
