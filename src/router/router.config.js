import React,{Component} from 'react'
import Home from '../views/Home'
import Mine from '../views/Mine'
import Shopcart from '../views/Shopcart'
import Catagory from '../views/Catagory'
import Detail from '../views/Detail'
import Index from '../Index/Index'
import Login from '../views/Login'
import Register from '../views/Register'
import Search from '../views/Search'
import Sraechresult from '../views/Result'

let router = {
    routes : [
        {
            path:"/index",
            component:Index,
            //exact:true,  
            children : [
                {
                    path:"/index/home",
                    component:Home
                },{
                    path:"/index/mine",
                    component:Mine
                },{
                    path:"/index/shopcart",
                    component:Shopcart
                },{
                    path:"/index/catagory",
                    component:Catagory
                },{
                    path:"/index/search",
                    component:Search
                },{
                    path:"/index/result",
                    component:Sraechresult
                }
            ]
        },{
            path:"/detail",
            component:Detail
        },{
            path:"/detail",
            component:Detail
        },{
            path:"/login",
            component:Login
        },{
            path:"/register",
            component:Register
        }
    ]
} 

export default router