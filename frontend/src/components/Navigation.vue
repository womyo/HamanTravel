<template>
    <div>
        <div class="head">
            <button class="btn btn-primary" @click='geofind'>최적 코스 검색</button>
            <p v-if="textContent !== ''"> {{textContent}} </p>
        </div>
        
        <div class="parent" v-for="(course, idx) in courseList">
            <div class="course">
                {{course}}
            </div>
            <div v-if="idx !== courseList.length-1">
                <b-icon-arrow-down></b-icon-arrow-down>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Navigation',
    components: {
    },
    data () {
        return {
            placeLatitude: '',
            placeLongitude: '',
            textContent: '',
            courseList: [],
        }
    },
    methods: {
        geofind() {
            // if(!("geolocation" in navigator)) {
            //     this.textContent = 'Geolocation is not available.';
            //     return;
            // }
            this.courseList = [];
            // this.textContent = '검색중...'

            let arr = [{"id":1,"name":"입곡군립공원","latitude":35.2658535740339,"longitude":128.4503113084113,"keyword":"봄,가을,코스","image":"https://www.haman.go.kr/_res/tour/img/sub/web07602_img10.jpg"},{"id":2,"name":"무진정","latitude":35.25545888834795,"longitude":128.42369801056833,"keyword":"봄,여름,코스","image":"https://www.haman.go.kr/_res/tour/img/sub/web07603_img10.jpg"},{"id":4,"name":"악양생태공원","latitude":35.33795176565001,"longitude":128.39803973219836,"keyword":"봄,가을,코스","image":"https://www.haman.go.kr/CmsMultiFile/view.do?multifileId=MF00002641&idx=4129"},{"id":5,"name":"함안 말이산고분군","latitude":35.26999916271107,"longitude":128.405846911568,"keyword":"봄,여름,코스","image":"https://www.haman.go.kr/_res/tour/img/sub/web07600_img10.jpg"},{"id":8,"name":"함안 연꽃테마파크","latitude":35.2804283938982,"longitude":128.39483003518964,"keyword":"여름,코스","image":"https://www.haman.go.kr/_res/tour/img/sub/web07604_img10.jpg"},{"id":9,"name":"강나루생태공원","latitude":35.39244071410651,"longitude":128.5088823965085,"keyword":"봄,코스","image":"https://www.haman.go.kr/_res/tour/img/sub/web07605_img02.png"}]

            // navigator.geolocation.getCurrentPosition(pos => {
            //     this.placeLatitude = pos.coords.latitude;
            //     this.placeLongitude = pos.coords.longitude;
                
            //     while (arr.length > 0) {
            //         let min = Infinity;
            //         let idx = 0;

            //         for (let i=0; i<arr.length; i++) {
            //             let distance = (arr[i].latitude - this.placeLatitude)**2 + (arr[i].longitude - this.placeLongitude)**2;
            //             if (distance < min) {
            //                 min = distance;
            //                 idx = i;
            //             }
            //         }

            //         this.placeLatitude = arr[idx].latitude;
            //         this.placeLongitude = arr[idx].longitude;
            //         this.courseList.push(arr[idx].name);
            //         arr.splice(idx, 1);
            //     };

            //     this.textContent = ""
            // }, err => {
            //     this.textContent = err.message;
            // })
            
            // https geolocation error occurs
            
            this.placeLatitude = 35.2538433;
            this.placeLongitude = 128.6402609;
            while (arr.length > 0) {
                let min = Infinity;
                let idx = 0;

                for (let i=0; i<arr.length; i++) {
                    let distance = (arr[i].latitude - this.placeLatitude)**2 + (arr[i].longitude - this.placeLongitude)**2;
                    if (distance < min) {
                        min = distance;
                        idx = i;
                    }
                }

                this.placeLatitude = arr[idx].latitude;
                this.placeLongitude = arr[idx].longitude;
                this.courseList.push(arr[idx].name);
                arr.splice(idx, 1);
            }
        }
    }
}
</script>

<style>
.head {
    margin-top: 5px;
    margin-bottom: 120px;
}
.parent {
    font-family: Georgia, "Malgun Gothic", serif;
    font-weight: bolder;
    text-shadow: -1px 0px FloralWhite , 0px 1px FloralWhite , 1px 0px FloralWhite , 0px -1px FloralWhite ;
}
</style>