
//main引用的是入口模块
import React,{Component} from 'react' //在es6模式下React模块 要求React必须在当前的作用域内
import ReactDOM from "react-dom";
import Router from './router/router.config.js'
import {BrowserRouter,Switch,Link,Route,Redirect} from 'react-router-dom'
import './static/font/iconfont.css'
import './css/common.css'
import './css/reset.css'
import Nomatch from './views/route404'
import {Provider} from 'react-redux'
import store from './store/store'

const {routes} = Router
console.log(routes)
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				{
					routes.map((item,index)=>{
						return <Route  key={index} path={item.path} render={(location)=>{
							return <item.component {...location} routes={item.children}></item.component>
						}}></Route>
					})
				}
				<Redirect from='/' to='/index/home'></Redirect>    
				<Route component={Nomatch}></Route>
			</Switch>
		</BrowserRouter>
	</Provider>,
    document.getElementById("root")
)
