<template>
    <div>
         <ul>
             <li v-for="(item,index) in list" :key="index" :class="{bg:tip==index}" @click="fn(index)">
                   {{item.a}}-{{item.b}}
             </li>
         </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                list:[
                    {a:'0.00',b:'5000.00'},
                    {a:'0.00',b:'100.00'},
                    {a:'100.00',b:'500.00'},
                    {a:'500.00',b:'1000.00'},
                    {a:'1000.00',b:'2000.00'},
                                     
                ],
                 tip:'all'

            }
        },
        methods: {
            fn(n) {
               this.tip=n  
               var obj={}
               obj.di=this.list[n].a
               obj.gao=this.list[n].b

               $bus.$emit('val',obj)

            }
        },
    }
</script>

<style lang="scss" scoped>
ul{
    width: 150px;

}

li{
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
}

.bg{
    color: palegreen;
    border: 1px solid palegreen;
}
</style>