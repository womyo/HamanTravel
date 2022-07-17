<template>
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
                :latitude="35.2657835740339"
                :longitude="128.4503473084113"
                @onLoad="onLoadMarker($event)">
                </naver-marker>
            </naver-maps>
        </div>
    </div>
</template>

<style>
.outer {
    display: flex;
}
.map {
    margin: auto;
}
</style>

<script>
import { ref } from "vue";
import { NaverMaps, NaverMarker } from "vue3-naver-maps";

export default {
    components: {
        NaverMaps,
        NaverMarker
    },
    data() {
        const map = ref();
        const onLoadMap = (mapObject) => {
            map.value = mapObject; // map에 반환된 객체 저장
            map.value.setCenter(new window.naver.maps.LatLng(35.28577217913653, 128.4503580941007)); // 지도 중앙 변경

        };
        const marker = ref();
        const onLoadMarker = (markerObject) => {
            marker.value = markerObject;
            marker.value.setIcon({
                url: "https://i.postimg.cc/jjPRt9J8/sample-removebg-preview.png",
                size: new window.naver.maps.Size(50, 50),
                scaledSize: new window.naver.maps.Size(50, 50),
                origin: new window.naver.maps.Point(0, 0),
                anchor: new window.naver.maps.Point(25, 26)
            })
        };
        const bounds = {
            south: 35.16416340349245,
            north: 35.39422331054625,
            west: 128.27517793515406,
            east: 128.59121454032442,
        };
        const mapOptions = {
            // latitude: 35.3075, // 지도 중앙 위도
            // longitude: 128.406, // 지도 중앙 경도
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
            width: window.innerWidth -100+ 'px',
            height: window.innerHeight -100+ 'px',
            mapOptions,
            initLayers,
            onLoadMap,
            onLoadMarker,
        }
    },
    mounted() {
    },
    methods: {
    },

}
</script>