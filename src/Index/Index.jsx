import React, { Component } from 'react'
import './Index.css'
import $http from '../utils/http'
import {BrowserRouter,Switch,Route,NavLink} from 'react-router-dom'


const className = 'index'
class Index extends Component {

    render () {
        const {routes} = this.props
        return (
            <div className={className}>
            <div className='content'>
            
                    {
                        routes.map((item,index)=>{
                            return <Route key={index} path={item.path} render={(location)=>{
                                return <item.component {...location} routes={item.children}></item.component>
                            }}></Route>
                        })
                        
                    }
                    
            </div>
            <div className='nav'>
                <ul>
                    <NavLink to='/index/home' activeClassName='tab'>
                    <li>
                        <span className='iconfont icon-home'></span>
                        <span>首页</span>
                    </li>
                    </NavLink>
                    <NavLink to='/index/catagory'  activeClassName='tab'>
                    <li>
                        <span className='iconfont icon-ziyuan'></span>
                        <span>分类</span>
                    </li>
                    </NavLink>
                    <NavLink to='/index/shopcart' activeClassName='tab' >
                    <li>
                        <span className='iconfont icon-cart' ></span>
                        <span>购物车</span>
                    </li>
                    </NavLink>
                    <NavLink to='/index/mine' activeClassName='tab'>
                    <li>
                        <span className='iconfont icon-mine'></span>
                        <span>我的</span>
                    </li>
                    </NavLink>
                </ul>
            </div>
        </div>
        )
    }
    componentDidMount (){
        $http.get("/server/test.json",{id:2,name:"金宇航"})
            .then(data=>{console.log(data)})
            .catch(err=>{console.log(err)})
    }
}

export default Index