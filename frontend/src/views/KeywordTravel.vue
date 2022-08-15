<template>
  <div class="keywordTravel">
    <DrawMap></DrawMap>
    <Footer></Footer>
  </div>
</template>

<script>
import DrawMap from '@/components/DrawMap'
import Footer from '@/components/Footer.vue';

export default {
  name: 'KeywordTravel',
  components: {
    DrawMap,
    Footer
},
}
</script>