<template>
  <div class="place">
    <RestaurantsVue></RestaurantsVue>
  </div>
</template>

<script>
import RestaurantsVue from '@/components/Restaurants'

export default {
  name: 'PlaceView',
  components: {
    RestaurantsVue
  },
}
</script>