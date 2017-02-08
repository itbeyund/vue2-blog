<template>
    <md-layout md-align="center">
        <form @submit.prevent="onSubmit">
            <md-card>
                <md-card-content>
                    <md-input-container>
                        <label>邮箱</label>
                        <md-input type="email" v-model.trim="form.email" required />
                    </md-input-container>
                    <md-input-container md-has-password>
                        <label>密码</label>
                        <md-input type="password" v-model.trim="form.password" required />
                    </md-input-container>
                </md-card-content>
                <md-card-actions>
                    <md-button type="submit">登陆</md-button>
                </md-card-actions>
            </md-card>
        </form>
    </md-layout>
</template>

<script lang="babel">
    export default{
        components:{},
        data(){
            return{
                form: {}
            }
        },
        methods:{
            onSubmit(){
                console.log(this.form)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-layout{
        padding-top: 20vh;
    }

    .md-card{
        width: 320px;
    }
</style>
