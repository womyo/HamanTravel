<template>
    <div class="search">
        <form class="d-flex">
            <b-icon-info-circle @click="showKeyword"/>
            <b-container
                :toast="{root: true}"
                fluid="sm"
                position="position-fixed"
            >
            </b-container>
            <b-form-input class="inputKeyword" v-model="keyword" placeholder="Keyword" v-on:keydown.enter.prevent="searchKeyword"></b-form-input>
            <b-button class="searchButton" v-on:click="searchKeyword">Search</b-button>
        </form>
    </div>  
    <div class="outer">
        <div class="map">
            <naver-maps
                :width = width
                :height = height
                :mapOptions = "mapOptions"
                :initLayers = "initLayers"
                @onLoad="onLoadMap($event)"
            >   
            <DrawMarker v-bind:map="map" :keyword="keyword" ref="child"></DrawMarker>
            </naver-maps>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { NaverMaps, NaverMarker, NaverInfoWindow } from "vue3-naver-maps";
import {useToast} from 'bootstrap-vue-3'
import DrawMarker from "./DrawMarker.vue";

export default {
    components: {
        NaverMaps,
        NaverMarker,
        NaverInfoWindow,
        DrawMarker,
    },
    data() {
        const map = ref();

        const onLoadMap = (mapObject) => {
            map.value = mapObject;
            map.value.setCenter(new window.naver.maps.LatLng(35.31577217913653, 128.4403580941007));
            
            this.map = map.value;
        };
        const bounds = {
            south: 35.16416340349245,
            north: 35.39422331054625,
            west: 128.27517793515406,
            east: 128.59121454032442,
        };
        const mapOptions = {
            zoom: 12,
            zoomControl: true,
            zoomControlOptions: { 
                position: "TOP_RIGHT"
            },
            minZoom: 12,
            maxBounds: bounds
        }
        const initLayers = [
        "BACKGROUND",
        "BACKGROUND_DETAIL",
        "POI_KOREAN",
        "TRANSIT",
        "ENGLISH",
        ]

        return {
            width: window.innerWidth * 0.8 + 'px',
            height: window.innerHeight -200 + 'px',
            mapOptions,
            initLayers,
            keyword: '',
            map,
            toast: useToast(),
            onLoadMap,
        }
    },

    mounted() {
    },
    methods: {
        searchKeyword(){
            this.$refs.child.searchKeyword();
        },

        showKeyword() {
            this.toast.show({title: '키워드', body: '봄, 여름, 가을, 겨울, 체험, 유적지, 등산, 문화, 가볼만한곳'});
        }
    },

}
</script>

<style>
.search {
    margin-top: 1%;
    display: inline-block;
    text-align: center;
}
.outer {
    margin-top: 2%;
    display: flex;
}
.map {
    margin: auto;
}
.box {
    position: absolute;
    color: black;   
    width: auto;
    height: auto;
  }
.placeImage {
    max-width: 140px;
    max-height: 100px;
    width: auto;
    height: auto;
    vertical-align: bottom;
}
.infowindow-style {
  background-color: white;
  text-align: center;
  font-weight: 600;
  padding: 6px 8px;
}
</style>