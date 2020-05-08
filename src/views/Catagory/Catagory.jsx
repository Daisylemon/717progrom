import React, { Component } from 'react'
import './catagory.css'
import $http from '../../utils/http'

const className = 'catagory'
class Catagory extends Component {
    constructor(){
        super()
        this.state={
            activeIndex:0,
            catagorydata:[]
        }
    }
    render () {
        let catList = ['家乡味道1','进口食品2','牛奶乳品3','休闲零食','生鲜果蔬','米面粮油','调味调料','酒水饮料']
        return (
            <div className={className}>
                <header><input type="text"/></header>
                <div className='catagory-wrap'>
                    <div className='left-side'>
                        <ul>
                            {
                                catList.map((item,index)=>{
                                    return <li className={this.state.activeIndex==index?'active':''} key={index} onClick={()=>{this.toActive(index)}}>{item}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className='right-side'>
                        {
							this.state.catagorydata.map((item,index)=>{
								return <li key={index}>{item.text}</li>
							})
						}
                    </div>
                </div>
                
            </div>
        )
        
    }
    toActive(idx){
        fetch('../../../server/catagory.json').then(res=>res.json()).then(res=>{
			res.map((item,ind)=>{
				if(idx == item.id){
					this.setState({
						catagorydata:item.name
					})
				}
			})
		})
        this.setState({
            activeIndex:idx
        }) 
    }
} 

export default Catagory 