import React, { Component } from 'react'
import './Search.css'

const className = 'search'
class Search extends Component {
    constructor(){
        super()
        this.state={
            historylist:[]
        }
    }
    toSearch(){
        if(!this.refs.keyWorlds.value) return;
        let keyWorlds = this.refs.keyWorlds.value;       
        let ls = localStorage;
        if(ls.getItem('serchHistory')){
            let shArr = JSON.parse(ls.getItem('serchHistory'))
            if(shArr.indexOf(keyWorlds) > -1) return;
            console.log(shArr)
            shArr.push(keyWorlds)
            ls.setItem('serchHistory',JSON.stringify(shArr))
        }else{
            ls.setItem('serchHistory',JSON.stringify([keyWorlds]))
        }
        this.props.history.push('/index/result',{         
            key_words:keyWorlds
        })
    }
    toResult(keyWorlds){
        this.props.history.push('/index/result',{         
            key_words:keyWorlds
        })
    }
    cleanHistory(){
        localStorage.removeItem('serchHistory')
        this.setState({
            historylist:[]
        })
    }
    componentDidMount(){
        if(localStorage.getItem('serchHistory')){
            this.setState({
                historylist:JSON.parse(localStorage.getItem('serchHistory'))
            })
        }
    }
    render () {
        let {historylist} = this.state
        return (
            <div className={className}>
                <header><input type="text" ref='keyWorlds'/> <button onClick={this.toSearch.bind(this)}>搜索</button></header>
                <section className='recent-search'>
                    <p>最近搜索<span onClick={this.cleanHistory.bind(this)}> X </span></p>  
                    {historylist.length==0 ? <p>暂无搜索记录...</p> :
                        <ul className='search-ul'>
                            {
                                this.state.historylist.map((item,index)=>{
                                    return <li key={index} onClick={()=>{this.toResult(item)}}>{item}</li>
                                })
                            }
                        </ul>
                    }
                </section>
                <section className='common-search'>
                    <p>大家都在搜</p>
                    <ol className='search-ol'>
                        <li>123123</li>
                        <li>123123</li>
                        <li>123123</li>
                        <li>123123</li>
                        <li>123123</li>
                        <li>123123</li>
                    </ol>
                </section>
            </div>
        )
    }
}

export default Search