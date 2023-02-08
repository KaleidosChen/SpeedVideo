//引入
import request from "./request.js"; 
import qs from 'qs'

// 根据phone查询用户信息
export const queryPhone=(phone)=>{
    return request({
        url:`/getUserInfo/phone/${phone}`,
        method:'get',
        
    })
}
//通过id查询用户信息
export const queryId=(id)=>{
    return request({
        url:`/getUserInfo/id/${id}`,
        method:'get',
    })
}

// 用户登录
export const loginAPI = (params) => {
    return request({
        url: "/login",
        method: "post" ,   
        data: qs.stringify( params)
    })
}

// 用户注册
export const registerAPI = (params) => {
    return request({
        url: "/register",
        method: "post" ,   
        data:qs.stringify( params)
    })
}

// 获取全部视频列表
export const getVideoList=()=>{
    return request({
        url:'/video/get',
        method:'get',
    })
}

// 通过author获取视频列表
export const getVideoListByAuthor=(author)=>{
    return request({
        url:`/video/get/author/${author}`,
        method:'get',
    })
}
// 通过author id获取视频列表
export const getVideoListByAuthorId=(id)=>{
    return request({
        url:`/video/get/authorId/${id}`,
        method:'get',
    })
}

// 通过视频id获取视频信息
export const getVideoById=(id)=>{
    return request({
        url:`/video/get/id/${id}`,
        method:'get',
    })
}

// 通过视频id获取作者user信息
export const getUserByVideoId=(id)=>{
    return request({
        url:`/getUserInfo/videoId/${id}`,
        method:'get',
    })
}

