<template>
    <div class="rules">
        <p class="drop-down" v-if="dropDown">松手刷新数据</p>
        <div class="bscroll" ref="bscroll">
            <div class="bscroll-container">
                <ul>
                       <li v-for='(item,index) in list' :key='index'>
                          <img :src="require('@/assets/img/'+item.productImage)" alt="">
                      
                          <p>{{item.productName}}</p>
                          <h3>{{item.salePrice}}</h3>
                          <p @click="fn(index)">加入购物车</p>
                       </li>
                </ul>
            </div>
        </div>
        <p class="x" v-if='up'>加载更多...</p>
    </div>
</template>


<script>
import BScroll from 'better-scroll'
// import a from '../assets/data.json'
import b from '../assets/data2.json'
import axios from 'axios'
export default {
    data(){
        return{
            dropDown:false,
            up:false,
            list:[]
        }
    },

    created () {
        // console.log(a.result.list)
        // this.list=a.result.list;
      


    //   筛选功能开始
        axios.get('../static/data.json').then((msg)=>{
            console.log(msg.data.result.list)
            this.list=msg.data.result.list
        })


          $bus.$on('val',(msg)=>{
            // console.log(msg)
          axios.get('../static/data.json').then((val)=>{
                  console.log(val.data.result.list)
                this.list=val.data.result.list
        }).then(()=>{
                  this.list = this.list.filter((val)=>{
                // console.log(val)
                if(val.salePrice>=msg.di&&val.salePrice<=msg.gao){
                    return val
                }
            })
        })
        })

    },
    mounted(){
        this.scrollFn()



        
    //   价格排序开始
    $bus.$on('fn',(msg)=>{
      
      console.log(msg)
        this.list=this.list.sort((a,b)=>{
            if(msg){
                return a.salePrice-b.salePrice
            }else{
                 return b.salePrice-a.salePrice
            }
        })
    })

    },
    methods:{
    
        scrollFn(){
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.bscroll, {
                        click: true,
                        scrollY: true,
                        probeType: 3
                    });
                }else{
                    this.scroll.refresh();
                }
                this.scroll.on('scroll', (pos) => {
                    console.log(pos.y,this.dropDown)
                    //如果下拉超过50px 就显示下拉刷新的文字
                    if(pos.y>50){
                        this.dropDown = true
                    }else{
                        this.dropDown = false
                    }
                })
                //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
                this.scroll.on('touchEnd', (pos) => {
                    // 下拉动作
                    if(pos.y > 50){
                        console.log("下拉刷新成功")
                        this.dropDown = false
                    }
                    //上拉加载 总高度>下拉的高度+10 触发加载更多
                    if(this.scroll.maxScrollY>pos.y+20){
                        console.log("加载更多")
                        this.up=true;
                         setTimeout(()=>{
                        //使用refresh 方法 来更新scroll  解决无法滚动的问题
                         axios.get('../static/data2.json').then((msg)=>{
                             console.log(msg.data.result.list)
                             this.list.push(...msg.data.result.list)
                        })
                     
                        this.scroll.refresh();
                        this.up=false;
                        },1000)
                       
                    }
                    console.log(this.scroll.maxScrollY+"总距离----下拉的距离"+pos.y)
                })
                console.log(this.scroll.maxScrollY)
            });
        },
        fn(n){
             // 路由跳转开始
               this.$router.push({name:'myCart',params:{'add':this.list[n]}})
            
        }
        
          
       
    }
}
</script>
 

<style scoped>
.bscroll{
    width: 100%;
    height:500px;
    overflow: hidden;
}
.bscroll-container{
    background: palegreen;
}
.drop-down{
    position: absolute;
    top:0px;
    lefT:0px;
    width: 100%;
    height: 50px;
    line-height:50px;
    text-align: center;
    font-size:20px;
    color:#CCC;
}
.x{
     width: 100%;
    height: 50px;
    line-height:50px;
    text-align: center;
    font-size:20px;
    color:#CCC;
}

ul{
    width: 620px;
    margin-left: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
li{
   width: 22%;
   height: 300px;
}

li img{
    width: 100%;
    height: 200px;
}

button{
    width: 30px;
    height: 30px;
}
</style>
