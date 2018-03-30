import React, { Component } from 'react'
import SwiperComp from '../../components/swiper'
import './Home.css'
import path from 'path'
import $http from '../../utils/http'
import GoodItem from '../../components/goodItem'

const className = 'home'
class Home extends Component {
    constructor(){
        super()
        this.toSearch =this.toSearch.bind(this)
        this.state={
            goodslist:[],
            channel_id:3,
            flag:true,
        }
    }
    toSearch(){
        const {history} = this.props
        history.push('/index/search')
    }
    render () {
        return (
            <div className={className} onScroll={this.scrolls.bind(this)} ref='scroller'>
                <div ref='doc'>
                <header><input type="text" onFocus={this.toSearch}/></header>
                <div>
                    <SwiperComp></SwiperComp>
                </div>
                <section>
                    <ul>
                        <li>
                            <span><img src={path.join(__dirname,'src/static/images/1.jpg')} alt=""/></span>
                            <span>家乡美食</span>
                        </li>
                        <li>
                            <span><img src={path.join(__dirname,'src/static/images/1.jpg')} alt=""/></span>
                            <span>家乡美食</span>
                        </li>
                        <li>
                            <span><img src={path.join(__dirname,'src/static/images/1.jpg')} alt=""/></span>
                            <span>家乡美食</span>
                        </li>
                        <li>
                            <span><img src={path.join(__dirname,'src/static/images/1.jpg')} alt=""/></span>
                            <span>家乡美食</span>
                        </li>
                        <li>
                            <span><img src={path.join(__dirname,'src/static/images/1.jpg')} alt=""/></span>
                            <span>家乡美食</span>
                        </li>
                        <li>
                            <span><img src={path.join(__dirname,'src/static/images/1.jpg')} alt=""/></span>
                            <span>家乡美食</span>
                        </li>
                        <li>
                            <span><img src={path.join(__dirname,'src/static/images/1.jpg')} alt=""/></span>
                            <span>家乡美食</span>
                        </li>
                        <li>
                            <span><img src={path.join(__dirname,'src/static/images/1.jpg')} alt=""/></span>
                            <span>家乡美食</span>
                        </li>
                    </ul>
                </section>
                <div className='goods-list'>
                    {
                        this.state.goodslist.map((item,index)=>{
                            return <GoodItem key={index} data={item} history={this.props.history} location={this.props.location}></GoodItem>
                        })
                    }
                </div>
                <p>我是有底线的。。。。</p>
                </div>
            </div>
        )
    }
    componentDidMount(){
		$http.post('http://localhost:9000/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
		.then(res=>{
			this.setState({
				goodslist:JSON.parse(res).data.data
			})
		})
	}
    scrolls(){
        if(this.state.channel_id>9) return;
        if(!this.state.flag) return;
        const {scroller,doc} = this.refs
        let st = scroller.scrollTop
        let sw = scroller.offsetHeight
        let dh = doc.offsetHeight

        if(dh-(st+sw)<50){
            this.setState({
                flag:false,
                channel_id:++this.state.channel_id
            })
            $http.post('http://localhost:9000/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
            .then(res=>{
                this.setState({
                    goodslist:[...this.state.goodslist,...JSON.parse(res).data.data],
                    flag:true
                })
            })
        }
        
    }
    
}

export default Home