import React, { Component } from 'react'
import $http from '../../utils/http'
import {Link} from 'react-router-dom'
const className = 'login'
class Login extends Component {
    constructor(){
        super()
    }
    render () {
        return (
            <div className={className}>
                <h1>请登录</h1>
                <p><Link to='/register'>注册</Link></p>
                <p><input type="text" className='username' ref='username'/></p>
                <p><input type="password" className='password' ref='password'/></p>
                <p><button onClick={this.toLogin.bind(this)}>登录</button></p>
            </div>
        )
    }
    toLogin(){
        let {username,password} = this.refs

        $http.post('http://localhost:9000/user/login',{
            username:username.value,
            password:password.value
        })
        .then(res=>{
            console.log(res)
            if(res.success == 1){
                let from = this.props.location.state ? this.props.location.state.from : 'index/home'
                document.cookie = "token="+res.token;
                this.props.history.push(from)
            }else{
                alert(res.info)
            }
        })
    }
}

export default Login