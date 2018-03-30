import React, { Component } from 'react'

const className = 'detail'
class Detail extends Component {
    constructor(){
        super()
    }
    render () {
        return (
            <div className={className}>Detail</div>
        )
    }
    componentDidMount(){
        console.log(this.props)
    }
}

export default Detail