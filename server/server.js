const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken') //加密的包


const app = express()

app.use(bodyParser.json())

app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Content-Type")
    res.header("Content-type","application/json;charset=utf-8")
    next()
})

//商品列表接口
const options = {
    hostname:'www.lb717.com',
    port:80,
    path:'/mall/index/getGoodsChannel',
    method:'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    }
}
const http =require('http')
const querystring = require('querystring')
app.post('/mall/index/getGoodsChannel',function(req,res){
    let data='';
    let request = http.request(options,(respon) =>{
        respon.setEncoding('utf8')
        respon.on('data',(chunk) =>{
            data += chunk
        })
        respon.on('end',()=>{
            res.end(JSON.stringify(data))
        })
    })
    request.write(querystring.stringify(req.body))
    request.end()
    
})

const fs = require('fs')

//注册接口
app.post('/user/register',function(req,res){
    console.log(JSON.stringify(req.body))
    let users = fs.readFileSync('server/user.json',{encoding:'utf-8'})
    users = JSON.parse(users)
    users.push(req.body)
    fs.writeFile('server/user.json',JSON.stringify(users),function(){
        res.end(JSON.stringify({
            "success":1,
            "info":"regist is success"
        })) 
    })
    
})

//登录借口

app.post('/user/login',function(req,res){
    let users = fs.readFileSync('server/user.json',{encoding:'utf-8'});
    users = JSON.parse(users)
    let login = req.body
    let resInfo ={
        success:0,
        info:'用户名或密码错误',
        token:''
    }
    users.forEach(use =>{
        if(use.username==login.username && use.password==login.password){
            resInfo.success=1;
            resInfo.info='loginsuccess'
        }
    })
    if(resInfo.success == 1){
        resInfo.token = jwt.sign(login,"1203624",{
            expiresIn:60*60
        })
    }
    res.end(JSON.stringify(resInfo))
})

//添加购物车
app.post('/user/Cart/addCart', function(req, res) {
	console.log(req.body)
	jwt.verify(req.body.token, "1203624", (err, decoded) => {
		console.log(err)
		if (err) {
			res.end(JSON.stringify({
                info: '登录过期，请重新登录',
                detail:err.TokenExpiredError
			}))
		} else {
			let cartInfo = JSON.parse(fs.readFileSync(__dirname + "/cart_info.json", {
				encoding: 'utf-8'
			}))
			if (cartInfo[decoded.username]) {
				cartInfo[decoded.username].push(req.body.goods_info)
			} else {
				cartInfo[decoded.username] = [req.body.goods_info]
			}
			fs.writeFile(__dirname + "/cart_info.json", JSON.stringify(cartInfo), function() {
				res.end("1")
			})
		}
	})
})

//分类接口
app.get('/mobile/Category/CategorySon',function(req,res){
    console.log(req.query)
    res.json('1')
})


app.listen(9000,function(){
    console.log('server listen 9000')
})