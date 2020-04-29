<template>
    <div>
        <a @click="handleLink">keepalive</a>
        <h2>二级菜单</h2>
        <ul>
            <li v-for="item in datalist" :key="item.id" @click.self="handleClick(item)" class="one">
                <span>{{item.name}}</span>
                <ul v-if="item.isShow">
                    <li v-for="ite in item.children" :key="ite.id" class="two">
                        <span>{{ite.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name:'home',
        data(){
            return {
                datalist:[
                    {
                        name:'title 1',
                        id:1,
                        isShow:false,
                        children:[
                            {
                                name:'title 1-1',
                                id:2
                            },{
                                name:'title 1-2',
                                id:3
                            }
                        ]
                    },
                    {
                        name:'title 2',
                        id:4,
                        isShow:false,
                        children:[
                            {
                                name:'title 2-1',
                                id:5
                            },{
                                name:'title 2-2',
                                id:6
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            handleLink(){
                // console.log(this)
                this.$router.push('/keepalive')
            },
            handleClick(item){
                console.log('assadad ', ~1)
                if(item.children.length){
                    item.isShow = !item.isShow
                }
            }
        }
    }
</script>
<style>
    .one{
        background: bisque;
    }
    .two{
        background: aliceblue;
    }
    ul{
        width:200px;
        margin:0 auto;
    }
    li{
        width:200px;
        min-height:50px;
        line-height: 50px;
        list-style: none;
        background: bisque;
        border-bottom:1px solid black;
        cursor: pointer;
    }
</style>
