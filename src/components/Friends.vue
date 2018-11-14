<template>
    <div class="friends">
        <ul>
            <li>
                <a href='http://fex.baidu.com/' target="_blank">百度FEX</a>
            </li>
            <li>
                <a href='http://taobaofed.org/' target="_blank">淘宝FED</a>
            </li>
            <li>
                <a href='https://aotu.io/index.html' target="_blank">京东凹凸实验室</a>
            </li>
            <li>
                <a href='http://eux.baidu.com/' target="_blank">百度EUX</a>
            </li>
            <li>
                <a href='http://www.alloyteam.com/' target="_blank">腾讯 AlloyTeam</a>
            </li>
            <li>
                <a href='http://ued.ctrip.com/' target="_blank">携程UED</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    created() {

    },
    asyncData() {},
    methods: {

    }
}
</script>

<style lang="stylus" scoped>
    .friends {
        background-color: #fff;
        padding: 16px 20px;
        margin: 10px 0;
        ul {
            overflow: hidden;
            zoom: 1;
        }
        li {
            float: left;
            padding: 0 30px;
        }
        a:hover {
            color: #e8c34b;
        }
    }
</style>