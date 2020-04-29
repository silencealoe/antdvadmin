<template>
    <div>
        <iframe id="grafana" name="grafana" src="http://10.1.70.23:3000/d/KzNCj60Wk/xi-tong-jian-kong?orgId=1&refresh=5s&from=1585113967752&to=1585124767752" width="100%" height="900px" frameborder="0" align="center"></iframe>
    </div>

</template>
<script>
    export default {
        data(){
            return{}
        },
        mounted() {
            // document.getElementById('grafana').src=document.getElementById('grafana').src
            this.$nextTick(()=>{
                // const list = document.getElementById('grafana')
                // console.log(document.getElementById('grafana').contentDocument)
                // console.log('dsgjhsadf', window.frames['grafana'].document)
                // console.log('dom', document.getElementById("grafana").contentWindow.document)
                // console.log('dom', document.getElementById("grafana").contentWindow.document.body)
                // const frameDocument =  document.getElementById("iframe")[0].contentWindow.document
                // const sideMenu = frameDocument.getElementsByTagName('body')
                // console.log(sideMenu)
                // const list = document.getElementsByClassName('sidemenu')
            })
        }
    }
</script>
<style>
    #grafana{
        margin-left:-60px;
        margin-top:-54px;
    }
</style>
