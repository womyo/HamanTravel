<template>
  <div class="keywordTour">
    <DrawMap></DrawMap>
    <Footer></Footer>
  </div>
</template>

<script>
import DrawMap from '@/components/DrawMap'
import Footer from '@/components/Footer.vue';

export default {
  name: 'KeywordTour',
  components: {
    DrawMap,
    Footer
  }
}
</script>