import Axios from 'axios' 

//配置根url
//Axios.defaults.baseURL=""

//服务器域
const serverUrl='http://localhost:3001/api/v1'
//后端api
const loginUrl=`${serverUrl}/login`         //用户登录
const registerUrl=`${serverUrl}/register`   //注册
const tokenCheckUrl=`${serverUrl}/token`    //token验证
const categoryUrl=`${serverUrl}/categories/`             //获取次级分类列表，参数：id
const ReviewUrl=`${serverUrl}/review`                    //发布评论
const shopReviewUrl=`${serverUrl}/shopReview/`           //获取shop评论数据,参数：shopId
const goodsLoadsUrl=`${serverUrl}/goodsLoad`             //user商品发表
const userGoodsUrl=`${serverUrl}/userGoods`              //user商品发表

const carouselImgUrl=""     //Carousel图片url

//高德服务key
const gouldKey="key=1f0f58420e42d9e693be2030786a4db3"
//高德url
const locationUrl=`https://restapi.amap.com/v3/ip?${gouldKey}`                              //ip定位
const keyWordUrl=`https://restapi.amap.com/v3/place/text?${gouldKey}&citylimit=true`        //关键字查询，限制城市
const idQueryUrl=`https://restapi.amap.com/v3/place/detail?${gouldKey}`                     //id查询
const shopLocationUrl=`https://restapi.amap.com/v3/staticmap?${gouldKey}`                   //shop定位，返回静态地图
const districtUrl=`https://restapi.amap.com/v3/config/district?${gouldKey}`                 //行政区域查询


//Carousel图片获取
export function carouselImg(){
   return Axios.get(carouselImgUrl).then(res=>res.data)
}

//高德api
//ip定位
export function ipLocation(){
    return Axios.get(locationUrl).then(res=>res.data)
}
//关键字查询
export function ShopSearch(category,city){
    return Axios.get(`${keyWordUrl}&keywords=${category}&city=${city}`).then(res=>res.data.pois)
}
export function typeSearch(type,city){
    return Axios.get(`${keyWordUrl}&types=${type}&city=${city}`).then(res=>res.data.pois)
}
//id查询
export function shopMess(id){
    return Axios.get(`${idQueryUrl}&id=${id}`)
}
export function shopLocation(){
    return shopLocationUrl
}
//行政区域查询
export function district(adcode){
    return Axios.get(`${districtUrl}&keywords=${adcode}&subdistrict=3`)
}


//后端
//获取分类列表
export function categories(){
    return Axios.get(categoryUrl)
}
export function secondCategory(id){
    return Axios.get(`${categoryUrl}${id}`)
}
//登录
export function Login(userLogin){
    return Axios.post(loginUrl, {
        username:userLogin.username,
        password:userLogin.password
      })
}
export function register(userInfo){
    return Axios.post(registerUrl,{
        email:userInfo.email,
        username:userInfo.registerName,
        password:userInfo.registerPass
    })
}
export function tokenCheck(token){
    return Axios.get(tokenCheckUrl,{
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
}
//评论
export function userReview(data){
    return Axios.post(ReviewUrl,{
        userName:data.userName,
        shopId:data.shopId,
        review:data.review
    })
}
export function shopReview(shopId){
    return Axios.get(`${shopReviewUrl}${shopId}`)
}
//发表
export function goodsLoad(userName,serveForm){
    return Axios.post(goodsLoadsUrl,{
        userName:userName,
        serveForm:serveForm
    })
}
//用户服务获取
export function userGoods(userName){
    return Axios.get(userGoodsUrl,{
        params: {
            userName: userName
          }
    })
}
