<template>
    <div class="app">
        <transition leave-active-class="animated fadeOut">
            <div v-if="is_show_loading" class="loading">
                <md-spinner md-indeterminate></md-spinner>
            </div>
        </transition>
        <div class="fixed-top">
            <md-toolbar class="md-dense">
                <md-button class="md-icon-button">
                    <md-icon>menu</md-icon>
                </md-button>
                <md-layout class="md-title">
                    {{ title }}
                </md-layout>
                <md-button class="md-icon-button">
                    <md-icon>favorite</md-icon>
                </md-button>
            </md-toolbar>
        </div>
        <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
            <router-view class="wrapper-container"></router-view>
        </transition>
        <div class="fixed-bottom">
            <md-bottom-bar>
                <md-bottom-bar-item md-icon="history" md-active>Recents</md-bottom-bar-item>
                <md-bottom-bar-item md-icon="favorite">Favorites</md-bottom-bar-item>
                <md-bottom-bar-item md-icon="near_me">Nearby</md-bottom-bar-item>
            </md-bottom-bar>
        </div>
    </div>
</template>

<script lang="babel">
    import { mapGetters } from 'vuex'
//    import Loaders from './components/widget/Loaders.vue'

    export default {
        components: {
//            Loaders
        },
        data(){
            return {
                is_show_loading: true,
            }
        },
        computed: {
            ...mapGetters([
                'current'
            ]),
            title(){
                const current = this.$store.getters.current;
                if(current.addressComponent){
                    const addressComponent = current.addressComponent;
                    if(addressComponent.building){
                        return addressComponent.building;
                    }
                    return addressComponent.street + addressComponent.streetNumber
                }
                return '定位中……';
            }
        },
        watch: {},
        created(){
            this.location();
        },
        methods: {
            location(){
                let self = this;
                AMap.service(['AMap.Geolocation'], ()=>{
                    let geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true,        //显示定位按钮，默认：true
                        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });

                    geolocation.getCurrentPosition();
                    geolocation.watchPosition();

                    AMap.event.addListener(geolocation, 'complete', (e)=>{
                        if(this.is_show_loading) this.is_show_loading = false;
                        if (e.formattedAddress && e.formattedAddress != this.current.formattedAddress){
                            self.$store.commit('add', e);
                        }
                    });
                    AMap.event.addListener(geolocation, 'error', (err)=>{
                        console.log(err);
                    });
                });
            }
        }
    }
</script>

<style lang="scss">
    .app {
        .fixed-top, .fixed-bottom {
            position: fixed;
            left: 0;
            width: 100%;
            z-index: 1;
        }
        .fixed-top {
            top: 0;
        }

        .fixed-bottom {
            bottom: 0;
        }

        .wrapper-container {
            padding: 48px 0 56px 0;
        }
    }
</style>
