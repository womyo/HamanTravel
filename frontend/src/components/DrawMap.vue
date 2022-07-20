<template>
    <div class="search">
        <form class="d-flex">
            <b-col>
                <b-form-input class="inputKeyword" v-model="keyword" placeholder="Keyword" v-on:keydown.enter.prevent="searchKeyword"></b-form-input>
            </b-col>
            <b-button class="searchButton" v-on:click="searchKeyword">Search</b-button>
        </form>
    </div>  
    <div class="outer">
        <div class="map">
            <naver-maps
                :width = this.width
                :height = this.height
                :mapOptions = "mapOptions"
                :initLayers = "initLayers"
                @onLoad="onLoadMap($event)"
            >   
                <naver-marker
                    v-for="(place,idx) in places"
                    :latitude=place.latitude
                    :longitude=place.longitude
                    @onLoad="onLoadMarker($event)"
                    @click="clicked(place.name)"
                    @mouseover="isOpen = !isOpen, index = idx, getInfo(idx)"
                    @mouseout="isOpen = !isOpen"
                >
                </naver-marker>
                <naver-info-window
                    @onLoad="onLoadInfoWindow($event)"
                    :marker="markers[index]"
                    :isOpen="isOpen"
                >
                </naver-info-window>
            </naver-maps>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { NaverMaps, NaverMarker, NaverInfoWindow } from "vue3-naver-maps";
import axios from 'axios';

export default {
    components: {
        NaverMaps,
        NaverMarker,
        NaverInfoWindow
    },
    data() {
        const map = ref();
        const marker = ref();
        const infoWindow = ref();
        const isOpen = ref(false);

        const onLoadMap = (mapObject) => {
            map.value = mapObject;
            map.value.setCenter(new window.naver.maps.LatLng(35.31577217913653, 128.4303580941007));

        };
        const onLoadMarker = (markerObject) => {
            marker.value = markerObject;
            marker.value.setIcon({
                url: "https://i.postimg.cc/jjPRt9J8/sample-removebg-preview.png",
                size: new window.naver.maps.Size(50, 50),
                scaledSize: new window.naver.maps.Size(50, 50),
                origin: new window.naver.maps.Point(0, 0),
                anchor: new window.naver.maps.Point(25, 26)
            })
            
            this.markers.push(this.marker);
        };
        const onLoadInfoWindow = (infoWindowObject) => {
            infoWindow.value = infoWindowObject;
            this.infoWindow = infoWindow
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
            zoomControlOptions: { position: "TOP_RIGHT" },
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
            width: window.innerWidth - 200 + 'px',
            height: window.innerHeight -200 + 'px',
            mapOptions,
            initLayers,
            onLoadMap,
            onLoadMarker,
            onLoadInfoWindow,
            places: null,
            keyword: '',
            isOpen,
            marker,
            markers: [],
            index: null,
            infoWindow,
        }
    },
    mounted() {
        axios.get('/api/places')
            .then(res => {
                this.places = res.data
            })
    },
    methods: {
        searchKeyword(){
            if (this.keyword !== '') {
                this.places = []
                const url = `/api/places/keyword/${this.keyword}`
                axios.get(url)
                    .then(res => {
                        this.places = res.data
                    })
                if (this.places.length === 0){
                    this.markers = []
                }
            }
            
        },
        clicked(name) {
            console.log(name);
        },
        async getInfo(index) {
            await this.$nextTick(function(){
                const divParent = document.createElement('div')
                divParent.className = "box"
                const divTag = document.createElement('div')
                divTag.innerHTML = this.places[index].name
                divTag.className = "infowindow-style"

                const imageTag = document.createElement('img')
                imageTag.className = "placeImage"
                imageTag.src = this.places[index].image

                divParent.appendChild(imageTag)
                divParent.appendChild(divTag)
                // const imageTag = `<img class="coverImg" :src=/Users/leeinho/project/Travel/frontend/src/assets/logo.png>`
                // const divTag = `<div class="infowindow-style" id="infowindow-style">${this.places[index].name}</div>`
                // divParent.appendChild(imageTag)
                // divParent.appendChild(divTag)
                this.infoWindow.setContent(divParent)
            })
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
  /* font-size: 20px; */
  padding: 6px 8px;
}
</style>