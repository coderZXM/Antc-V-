import Login from "../page/Login";
import Main from "../page/mian";
import Columar from '../page/columnar'
import Drag from '../page/drag'
import Pie from  '../page/pie'
import {Navigate} from 'react-router-dom'





const routres:Array<any> = [
    {
        path:'/',
        element:<Navigate to='/login'/>

    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/main',
        element:<Main/>,
        children:[
            {
                path:'/main',
                element:<Navigate to='columnar'/>

            },
            {
                path:'columnar',
                element:<Columar/>
            },
            {
                path:'drag',
                element:<Drag/>
            },
            {
                path:'pie',
                element:<Pie/>
            }

        ]
    }


]


export default routres