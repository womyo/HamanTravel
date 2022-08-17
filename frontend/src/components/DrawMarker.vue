<template>
    <naver-marker
        v-for="(place,idx) in places"
        :latitude=place.latitude
        :longitude=place.longitude
        @onLoad="onLoadMarker($event, 'place', placeIcon, 50)"
        @click="isOpen = !isOpen, index = idx, getInfo(places, idx, 'place'), zoomPlace(place.latitude, place.longitude)"
    >
    </naver-marker>
    <naver-info-window
        @onLoad="onLoadInfoWindow($event, 'place')"
        :marker="markers[index]"
        :isOpen="isOpen"
    >
    </naver-info-window>
    <naver-marker
        v-if="map !== undefined && map.getZoom() >= 15"
        v-for="(restaurant,idx) in restaurants"
        :latitude=restaurant.latitude
        :longitude=restaurant.longitude
        @onLoad="onLoadMarker($event, 'restaurant', restaurantIcon, 30)"
        @click="isRestaurantOpen = !isRestaurantOpen, restaurantIndex = idx, getInfo(restaurants, idx, 'restaurant')"
    >
    </naver-marker>
    <naver-info-window
        @onLoad="onLoadInfoWindow($event, 'restaurant')"
        :marker="restaurantMarkers[restaurantIndex]"
        :isOpen="isRestaurantOpen"
    >
    </naver-info-window>
    <naver-marker
        v-if="map !== undefined && map.getZoom() >= 15"
        v-for="(cafe,idx) in cafes"
        :latitude=cafe.latitude
        :longitude=cafe.longitude
        @onLoad="onLoadMarker($event, 'cafe', cafeIcon, 30)"
        @click="isCafeOpen = !isCafeOpen, cafeIndex = idx, getInfo(cafes, idx, 'cafe')"
    >
    </naver-marker>
    <naver-info-window
        @onLoad="onLoadInfoWindow($event, 'cafe')"
        :marker="cafeMarkers[cafeIndex]"
        :isOpen="isCafeOpen"
    >
    </naver-info-window>
</template>

<script>
import { ref } from "vue";
import { NaverMaps, NaverMarker, NaverInfoWindow } from "vue3-naver-maps";
import axios from 'axios';
import {useToast} from 'bootstrap-vue-3'

export default {
    components: {
        NaverMaps,
        NaverMarker,
        NaverInfoWindow,
    },
    props: ["map", "keyword"],
    data() {
        const marker = ref();
        const infoWindow = ref();
        const restaurantMarker = ref();
        const restaurantInfoWindow = ref();
        const cafeMarker = ref();
        const cafeInfoWindow = ref();
        let markerValue;

        const onLoadMarker = (markerObject, type, icon, size) => {
            if (type === 'place') {
                marker.value = markerObject;
                markerValue = marker.value;
                this.markers.push(this.marker);
            }
            else if (type === 'restaurant') {
                restaurantMarker.value = markerObject;
                markerValue = restaurantMarker.value;
                this.restaurantMarkers.push(this.restaurantMarker);
            }
            else if (type === 'cafe') {
                cafeMarker.value = markerObject;
                markerValue = cafeMarker.value;
                this.cafeMarkers.push(this.cafeMarker);
            }
            markerValue.setIcon({
                    url: icon,
                    size: new window.naver.maps.Size(size, size),
                    scaledSize: new window.naver.maps.Size(size, size),
                    origin: new window.naver.maps.Point(0, 0),
                    anchor: new window.naver.maps.Point(size/2, size/2)
                })
        };

        const onLoadInfoWindow = (infoWindowObject, windowType) => {
            if (windowType === 'place') {
                infoWindow.value = infoWindowObject;
                this.infoWindow = infoWindow;
            }
            else if (windowType === 'restaurant') {
                restaurantInfoWindow.value = infoWindowObject;
                this.restaurantInfoWindow = restaurantInfoWindow;
            }
            else if (windowType === 'cafe') {
                cafeInfoWindow.value = infoWindowObject;
                this.cafeInfoWindow = cafeInfoWindow;
            }
        };

        return {
            places: [],
            restaurants: [],
            cafes: [],
            isOpen: false,
            isRestaurantOpen: false,
            isCafeOpen: false,
            marker,
            restaurantMarker,
            cafeMarker,
            markers: [],
            restaurantMarkers: [],
            cafeMarkers: [],
            index: null,
            restaurantIndex: null,
            cafeIndex: null,
            infoWindow,
            restaurantInfoWindow,
            cafeInfoWindow,
            toast: useToast(),
            placeIcon: "https://i.postimg.cc/jjPRt9J8/sample-removebg-preview.png",
            restaurantIcon: "https://cdn.pixabay.com/photo/2021/05/25/02/03/restaurant-6281067_1280.png",
            cafeIcon: "https://cdn.pixabay.com/photo/2018/08/30/16/57/coffee-3642712_1280.png",
            markerValue,
            onLoadMarker,
            onLoadInfoWindow,
        }
    },

    async mounted() {
        await axios.get('/api/place')
            .then(res => {
                this.places = res.data;
            });
    },
    methods: {
        searchKeyword(){
            if (this.keyword !== '') {
                this.places = [];
                const url = `/api/place/keyword/${this.keyword}`;
                axios.get(url)
                    .then(res => {
                        this.places = res.data;
                    });
                if (this.places.length === 0){
                    this.markers = [];
                }
            }
        },

        async getInfo(type, index, t) {
            await this.$nextTick(function(){
                const divParent = document.createElement('div');
                divParent.className = "box";
                const divTag = document.createElement('div');
                divTag.innerHTML = type[index].name;
                divTag.className = "infowindow-style";

                if ((type[index].image !== undefined)){
                    const imageTag = document.createElement('img');
                    imageTag.className = "placeImage";
                    imageTag.src = type[index].image;
                    divParent.appendChild(imageTag);
                }
                divParent.appendChild(divTag);
                
                if (t === 'place') {
                    this.infoWindow.setContent(divParent);
                }
                else if (t === 'restaurant') {
                    this.restaurantInfoWindow.setContent(divParent);
                }
                else if (t === 'cafe') {
                    this.cafeInfoWindow.setContent(divParent);
                }
            })
        },

        zoomPlace(latitude, longitude) {
            const zoomLevel = 15;
            this.map.morph({lat: latitude, lng: longitude}, zoomLevel);
            this.restaurants = [];
            this.restaurantMarkers = [];
            this.cafes = [];
            this.cafeMarkers = [];
            const cafeUrl = `/api/restaurant/type/cafe/latitude/${latitude}/longitude/${longitude}`;
            const restaurantUrl = `/api/restaurant/type/restaurant/latitude/${latitude}/longitude/${longitude}`;
            axios.get(cafeUrl)
                .then(res => {
                    this.cafes = res.data;
                });
            axios.get(restaurantUrl)
                .then(res => {
                    this.restaurants = res.data;
                });
        },
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

}