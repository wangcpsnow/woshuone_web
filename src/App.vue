<template>
    <div id="app">
        <div class="header">
            <div class="content">
                <router-link to="/" exact style="margin-left: 1rem">
                    <img class="logo" src="./assets/imgs/logo.png" alt="logo">
                </router-link>
                <nav>
                    <router-link to="/">首页</router-link>
                    <router-link to="/topics">发现</router-link>
                    <router-link to="/admin" v-show="showAdmin">后台</router-link>
                </nav>
            </div>
        </div>
        <div class="main">
            <div class="backtop" :style="{backgroundColor: ishover ? '#d5dbe7' : '#e7eaf1'}" v-show='show' @click="backtop" @mouseover='backtop_in' @mouseout='backtop_out'>TOP</div>
            <div class="content">
                <transition :name="transitionName">
                    <router-view class="view"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'

export default {
    data () {
        return {
            show: false,
            ishover: false,
            transitionName: 'slide-right',
            showAdmin: false
        }
    },
    created () {
        var dict = this.$route.query;
        if (dict.admin) {
            this.showAdmin = true;
        }
        if(typeof window !== 'undefined') {
            var self = this;
            var oBody = document.body;
            oBody.onscroll = function () {
                if (oBody.scrollTop > 1000) {
                    self.show = true;
                }
                else {
                    self.show = false;
                }
            }
        }
    },
    watch: {
        '$route' (to, from) {
            if (to.path == '/') {
                this.transitionName = 'slide-left';
            }
            else {
                this.transitionName = 'slide-right';
            }
        }
    },
    methods: {
        backtop: function () {
            window.scrollTo(0,0);
        },
        backtop_in () {
            this.ishover = true;
        },
        backtop_out () {
            this.ishover = false;
        }
    }
}
</script>

<style lang="stylus">
    body {
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif;
        background-color: #f7f8fa;
        box-sizing: content-box;
        margin: 0;padding: 0;
    }
    a {
        color: #8590a6;
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
        width: 100%;
        max-width: 1000px;
        margin:0 auto;
    }
    .backtop {
        position: fixed;
        right: 30px; bottom: 80px;
        width: 50px; height: 50px;
        box-shadow: 0 1px 3px rgba(0,37,55,.05);
        cursor: pointer;
        text-align: center;
        line-height: 50px;
        color: #9aaabf;
    }


    .view {
        transition: all .5s cubic-bezier(.55,0,.1,1);
    }
    .slide-left-enter, .slide-right-leave-active {  
      opacity: 0;  
      -webkit-transform: translate(30px, 0);  
      transform: translate(30px, 0);  
    }
    .slide-left-leave-active, .slide-right-enter {  
      opacity: 0;  
      -webkit-transform: translate(-30px, 0);  
      transform: translate(-30px, 0);  
    }  
</style>
