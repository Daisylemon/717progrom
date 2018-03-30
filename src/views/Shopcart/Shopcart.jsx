import React, { Component } from 'react'
import {connect} from 'react-redux'
import mapStateToProps from './state'
const className = 'shopcart'
class Shopcart extends Component {
    comp
    render () {
        return (
            <div className={className}>Shopcart</div>
        )
    }
    componentDidMount(){
        console.log(this.props)
    }
    
}

export default connect(mapStateToProps)(Shopcart)