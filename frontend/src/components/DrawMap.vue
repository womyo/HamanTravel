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
                :width = width
                :height = height
                :mapOptions = "mapOptions"
                :initLayers = "initLayers"
                @onLoad="onLoadMap($event)"
            >   
                <naver-marker
                    v-for="(place,idx) in places"
                    :latitude=place.latitude
                    :longitude=place.longitude
                    @onLoad="onLoadMarker($event)"
                    @click="zoomPlace(place.latitude, place.longitude)"
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
                <naver-marker
                    v-for="(food,idx) in foods"
                    :latitude=food.latitude
                    :longitude=food.longitude
                    @onLoad="onLoadFoodMarker($event)"
                    @mouseover="isFoodOpen = !isFoodOpen, foodIndex = idx, getFoodInfo(idx)"
                    @mouseout="isFoodOpen = !isFoodOpen"
                >
                </naver-marker>
                <naver-info-window
                    @onLoad="onLoadFoodInfoWindow($event)"
                    :marker="foodMarkers[foodIndex]"
                    :isOpen="isFoodOpen"
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
        const foodMarker = ref();
        const foodInfoWindow = ref();

        const onLoadMap = (mapObject) => {
            map.value = mapObject;
            map.value.setCenter(new window.naver.maps.LatLng(35.31577217913653, 128.4403580941007));
            
            this.map = map.value;
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

        const onLoadFoodMarker = (markerObject) => {
            foodMarker.value = markerObject;
            foodMarker.value.setIcon({
                // url: "https://cdn.pixabay.com/photo/2018/08/30/16/57/coffee-3642712_1280.png",
                url: "https://cdn.pixabay.com/photo/2021/05/25/02/03/restaurant-6281067_1280.png",
                size: new window.naver.maps.Size(30, 30),
                scaledSize: new window.naver.maps.Size(30, 30),
                origin: new window.naver.maps.Point(0, 0),
                anchor: new window.naver.maps.Point(15, 16)
            })
            this.foodMarkers.push(this.foodMarker);
        };

        const onLoadInfoWindow = (infoWindowObject) => {
            infoWindow.value = infoWindowObject;
            this.infoWindow = infoWindow;
        };

        const onLoadFoodInfoWindow = (infoWindowObject) => {
            foodInfoWindow.value = infoWindowObject;
            this.foodInfoWindow = foodInfoWindow;
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
            width: window.innerWidth - 200 + 'px',
            height: window.innerHeight -200 + 'px',
            mapOptions,
            initLayers,
            places: [],
            foods: [],
            keyword: '',
            isOpen: false,
            isFoodOpen: false,
            map,
            marker,
            foodMarker,
            markers: [],
            foodMarkers: [],
            index: null,
            foodIndex: null,
            infoWindow,
            foodInfoWindow,
            onLoadMap,
            onLoadMarker,
            onLoadInfoWindow,
            onLoadFoodMarker,
            onLoadFoodInfoWindow,
        }
    },
    mounted() {
        axios.get('/api/place')
            .then(res => {
                this.places = res.data
            })
        
        
    },
    methods: {
        searchKeyword(){
            if (this.keyword !== '') {
                this.places = []
                const url = `/api/place/keyword/${this.keyword}`
                axios.get(url)
                    .then(res => {
                        this.places = res.data
                    })
                if (this.places.length === 0){
                    this.markers = []
                }
            }
            
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

                this.infoWindow.setContent(divParent)
            })
        },
        async getFoodInfo(index) {
            await this.$nextTick(function(){
                const divParent = document.createElement('div')
                divParent.className = "box"
                const divTag = document.createElement('div')
                divTag.innerHTML = this.foods[index].name
                divTag.className = "infowindow-style"

                divParent.appendChild(divTag)

                this.foodInfoWindow.setContent(divParent)
            })
        },
        zoomPlace(latitude, longitude) {
            const zoomLevel = 15;
            this.map.morph({lat: latitude, lng: longitude}, zoomLevel)
            this.foods = []
            this.foodMarkers = []
            const url = `/api/restaurant/type/cafe/latitude/${latitude}/longitude/${longitude}`
                axios.get(url)
                    .then(res => {
                        this.foods = res.data
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