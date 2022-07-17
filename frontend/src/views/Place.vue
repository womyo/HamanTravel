<template>
  <div class="place">
    <Restaurants></Restaurants>
  </div>
</template>

<script>
import Restaurants from '@/components/Restaurants'

export default {
  name: 'PlaceView',
  components: {
    Restaurants
  },
}
</script>