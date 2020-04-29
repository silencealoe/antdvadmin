<template>
    <div>
<!--        <p>-->
            <a-tag :color="colorEdit" @click="showColor">标签</a-tag>
            <chrome-picker v-show="colorShow" v-model="colorEdit" @input="updateColor"></chrome-picker>
<!--        </p>-->
    </div>
</template>
<script>
    import { Chrome } from 'vue-color'
    export default {
        name:'color',
        data(){
            return{
                colorShow:false,
                colorEdit:'pink'
            }
        },
        components:{
            'chrome-picker': Chrome
        },
        methods:{
            showColor(){
               this.colorShow=true
            },
            updateColor(val){
                console.log(val)
                this.colorEdit=val.hex
                this.colorShow=false
            }
        }
    }
</script>
