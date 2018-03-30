import React, { Component } from 'react'
import $http from '../../utils/http'

const className = 'register'
class Register extends Component {
    constructor(){
        super()
    }
    render () {
        return (
            <div className={className}>
                <h1>注册</h1>
                <p><input type="text" className='username' ref='username'/></p>
                <p><input type="password" className='password' ref='password' /></p>
                <p><button onClick={this.toRegister.bind(this)}>注册</button></p>
            </div>
        )
    }
    toRegister(){
        let {username,password} = this.refs

        $http.post('http://localhost:9000/user/register',{
            username:username.value,
            password:password.value
        })
        .then(res=>{
            if(res.success == 1){
                this.props.history.push('/login')
            }
        })
    }
}

export default Register