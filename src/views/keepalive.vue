<template>
    <div class="keepalive">
        <p v-for="(item, index) in list" :key="index" @click="change(index)">{{item}}</p>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                list:['list1', 'list2']
            }
        },
        methods: {
            change(index){
                this.$router.push('/keepalive/'+(index+1))
            }
        },
        activated() {
            console.log('sdfgsdgsdg')
        }
    }

</script>
<style>
    .keepalive{
        color:white;
        padding:20px;
    }
    .keepalive p{
        width:100px;
        height: 40px;
        background: rgba(255,255,255,.2);
    }

</style>
