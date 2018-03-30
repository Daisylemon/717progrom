import React, { Component } from 'react'

const className = 'result'
class Result extends Component {
    render () {
        return (
            <div className={className}>Result</div>
        )
    }
    componentDidMount(){
        let {location} = this.props
        console.log(location.state)
    }
}

export default Result