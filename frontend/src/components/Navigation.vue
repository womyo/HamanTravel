<template>
    <div>
        <button @click='geofind'>위치찾기</button>
        <p> {{textContent}} </p>
    </div>
</template>

<script>

export default {
    name: 'Navigation',
    components: {
    },
    data () {
        return {
            latitude: '',
            longitude: '',
            textContent: ''
        }
    },
    methods: {
        geofind() {
            if(!("geolocation" in navigator)) {
                this.textContent = 'Geolocation is not available.';
                return;
            }
            this.textContent = 'Locating...'
            
            let arr = [{"id":1,"name":"입곡군립공원","latitude":35.2658535740339,"longitude":128.4503113084113,"keyword":"봄,가을,코스","image":"https://www.haman.go.kr/_res/tour/img/sub/web07602_img10.jpg"},{"id":2,"name":"무진정","latitude":35.25545888834795,"longitude":128.42369801056833,"keyword":"봄,여름,코스","image":"https://www.haman.go.kr/_res/tour/img/sub/web07603_img10.jpg"},{"id":4,"name":"악양생태공원","latitude":35.33795176565001,"longitude":128.39803973219836,"keyword":"봄,가을,코스","image":"https://www.haman.go.kr/CmsMultiFile/view.do?multifileId=MF00002641&idx=4129"},{"id":5,"name":"함안 말이산고분군","latitude":35.26999916271107,"longitude":128.405846911568,"keyword":"봄,여름,코스","image":"https://www.haman.go.kr/_res/tour/img/sub/web07600_img10.jpg"},{"id":8,"name":"함안 연꽃테마파크","latitude":35.2804283938982,"longitude":128.39483003518964,"keyword":"여름,코스","image":"https://www.haman.go.kr/_res/tour/img/sub/web07604_img10.jpg"},{"id":9,"name":"강나루생태공원","latitude":35.39244071410651,"longitude":128.5088823965085,"keyword":"봄,코스","image":"https://www.haman.go.kr/_res/tour/img/sub/web07605_img02.png"}]
            let tmp = []
            navigator.geolocation.getCurrentPosition(pos => {
                this.latitude = pos.coords.latitude;
                this.longitude = pos.coords.longitude;
                
                arr.forEach(function(value, index){
                    let a = (value.latitude - pos.coords.latitude)**2 + (value.longitude - pos.coords.longitude)**2;
                    tmp.push([value.name, a])
                });

                tmp.sort(function(a,b){
                    return a[1] - b[1];
                });
                let a = ''
                for (let i=0; i<tmp.length; i++) {
                    a += tmp[i][0];
                }
                this.textContent = a;
            }, err => {
                this.textContent = err.message;
            })
        }
    }
}
</script>