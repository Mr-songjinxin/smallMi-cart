<template>
    <div>
        <span @click="add">正序-倒序</span>
        
    </div>
</template>

<script>
    export default {
        data(){
            return{
                bom:false
            }
        },
        methods: {
            add() {
                this.bom=!this.bom

                $bus.$emit('fn',this.bom)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>