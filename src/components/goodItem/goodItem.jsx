import React, { Component } from 'react'
import $http from '../../utils/http'
import './goodItem.css'
import Lazyload from 'react-lazyload'
import path from 'path'
import {getCookie} from '../../utils/utils'
import {ToastContainer,toast} from 'react-toastify'
import {connect} from 'react-redux'
import {ADD_CART} from './../../store/reducers'

class Placeholder extends Component{
    render(){
        return <img src={path.join(__dirname,'src/static/images/3.jpg')} alt=""/>
    }
}

class goodItem extends Component {
    constructor(){
        super()
    }
    render () {
        const {data} = this.props
        return (
            <div className='gooditem' onClick={()=>{this.toDetail(data.goods_id)}}>
                <dl>
                    <dt><Lazyload overflow once height ={'100%'} placeholder={<Placeholder></Placeholder>} debounce={200}><img src={"http://www.lb717.com/"+data.obj_data} alt=""/></Lazyload></dt>
                    <dd>
                        <p className='goods'>{data.goods_name}</p>
                        <p className='cart'><span className='pic'>{data.discount_price}</span><span className='iconfont icon-cart' onClick={this.addCart.bind(this)}></span></p>
                        <ToastContainer></ToastContainer>
                    </dd>
                </dl>
            </div>
        )
    }
    addCart(e){ //点击添加商品图标   阻止进入详情页 (阻止冒泡)
		e.stopPropagation()
		let {data} = this.props;
		if(getCookie('token')){  //有登录信息
			$http.post('http://localhost:9000/user/Cart/addCart',{
				goods_id:this.props.data.goods_id,
				goods_info:this.props.data,
				token:getCookie('token')
			})
			.then((res)=>{
                if(res==1){
                    toast.success('购物车添加成功',{
                        position:toast.POSITION.TOP_CENTER
                    })
                    this.props.dispatch({
                        type:ADD_CART,
                        data:{
                            ...data,
                            count:1
                        }
                    })
                }else{
                    toast.warn(res.info,{
                        position:toast.POSITION.TOP_CENTER,
                        className:css({
                            background:"black",
                            color:"#fff",
                        })
                    })
                }
			})
		}else{//没有登录信息
			let {history,location} = this.props;
			this.props.history.push('/login',{
				from:location.pathname
			})
		}
	}

    toDetail(goods_id){
        console.log(goods_id)
        this.props.history.push('/detail',{
            goods_id:goods_id
        })
    }
}

export default connect(null)(goodItem)