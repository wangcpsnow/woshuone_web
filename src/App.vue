<template>
    <div id="app">
        <div class="header">
            <div class="content">
                <router-link to="/" exact>
                    <img class="logo" src="./assets/imgs/logo.png" alt="logo">
                </router-link>
                <nav>
                    <router-link to="/">首页</router-link>
                    <router-link to="/topics">发现</router-link>
                </nav>
            </div>
        </div>
        <div class="main">
            <div class="content">
                <router-view class="view"></router-view>
            </div>
        </div>
    </div>
</template>

<style lang="stylus">
    @import './assets/css/reset.css';
    body {
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif;
        background-color: #f7f8fa;
    }
    .header{
        background-color: #FFF;
        height: 30px;
        padding:10px 0;
        .logo {
            width:30px;
            vertical-align: middle;
        }
        nav {
            display: inline;
            margin-left: 10px;
            a {
                margin:0 10px;
            }
            a:hover {
                color: #333;
            }
        }
    }
    .content{
        width:1000px;
        margin:0 auto;
    }
</style>
