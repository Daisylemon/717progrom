import React, { Component } from 'react'
import Swiper from 'swiper'
import path from 'path'
import 'swiper/dist/css/swiper.css'
import './swiperComp.css'

class SwiperComp extends Component {
    render () {
        return (
            <div className="swipwe-container" ref="scDom">
                <div className="swiper-wrapper">
                    <div className='swiper-slide'><img src={path.join(__dirname,'src/static/images/1.jpg')} alt=""/></div>
                    <div className='swiper-slide'><img src={path.join(__dirname,'src/static/images/2.jpg')} alt=""/></div>
                    <div className='swiper-slide'><img src={path.join(__dirname,'src/static/images/3.jpg')} alt=""/></div>
                    <div className='swiper-slide'><img src={path.join(__dirname,'src/static/images/4.jpg')} alt=""/></div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        new Swiper(this.refs.scDom,{
            autoplay:true,
            loop:true
        })
    }
}

export default SwiperComp