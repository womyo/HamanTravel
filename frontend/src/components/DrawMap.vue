<template>
    <div class="search">
        <form class="d-flex">
            <b-icon-info-circle @click="showKeyword"/>
            <b-container
                class="keywordContainer"
                :toast="{root: true}"
                fluid="sm"
                position="position-fixed"
            >
            </b-container>
            <b-form-input class="inputKeyword" v-model="keyword" placeholder="키워드" v-on:keydown.enter.prevent="searchKeyword"></b-form-input>
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
                <div v-if="!flag" class="countryside">
                    <b-button class="bt" pill variant="outline-dark" @click="flagChange">지역별</b-button>
                </div>
                <div v-else class="btn-group-vertical btn-group-sm" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary" @click="changeCenter(1)">함안/산인</button>
                    <button type="button" class="btn btn-secondary" @click="changeCenter(2)">군북/법수</button>
                    <button type="button" class="btn btn-secondary" @click="changeCenter(3)">대산/칠서</button>
                </div>
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
            zoomControl: false,
            zoomControlOptions: { 
                position: 9,
            },
            minZoom: 12,
            // maxBounds: bounds
        }
        const initLayers = [
        "BACKGROUND",
        "BACKGROUND_DETAIL",
        "POI_KOREAN",
        "TRANSIT",
        "ENGLISH",
        ]

        return {
            width: window.innerWidth + 'px',
            height: window.innerHeight - 110 + 'px',
            mapOptions,
            initLayers,
            keyword: '',
            map,
            flag: false,
            toast: useToast(),
            onLoadMap,
        }
    },

    mounted() {
    },
    methods: {
        searchKeyword(){
            this.map.morph({lat: 35.31577217913653, lng: 128.4403580941007}, 12);
            this.$refs.child.searchKeyword();
        },

        showKeyword() {
            this.toast.show({title: '키워드', body: '봄, 여름, 가을, 겨울, 체험, 유적지, 등산, 문화, 가볼만한곳'});
        },

        flagChange() {
            this.flag = !this.flag;
        },

        changeCenter(id) {
            if (id === 1) {
                this.map.morph({lat: 35.25545888834795, lng: 128.42369801056833}, 12);
            }
            else if (id === 2) {
                this.map.morph({lat: 35.30030480797324, lng: 128.30109950813097}, 12);
            }
            else if (id === 3) {
                this.map.morph({lat: 35.36386282268127, lng: 128.47801374929467}, 12);
                this.flag = !this.flag;
            }
            this.$refs.child.searchKeyword();
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
.keywordContainer {
    width: 10px;
}
.countryside {
    position: absolute;
    float: left;
    z-index: 1;
}
.btn-group-vertical {
    position: absolute;
    float: left;
    z-index: 1;
}
</style>