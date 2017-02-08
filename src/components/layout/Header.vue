<template>
    <md-toolbar class="md-dense">
        <md-button class="md-icon-button">
            <md-icon>menu</md-icon>
        </md-button>
        <md-layout class="md-title">
            管理系统
        </md-layout>
        <router-link to="/auth/login" tag="md-button">登陆</router-link>
    </md-toolbar>
</template>

<script lang="babel">
    export default{
        components:{},
        data(){
            return{
            }
        },
    }
</script>

<style lang="scss">
</style>
