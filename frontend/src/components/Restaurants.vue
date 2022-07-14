<template>
    <div>
        <ul>
            <li v-for="restaurant in restaurants">{{restaurant.업소명}}</li>
        </ul>
    </div>
</template>

<script>
import { fetchRestaurantList } from '@/api/index'

export default {
  name: 'Restaurants',
  data() {
    return {
        restaurants: null,
    }
  },
  components: {
  },
  created() {
    fetchRestaurantList()
    .then((response) => (
        console.log(response.data.data),
        this.restaurants = response.data.data
        ))
  }
}

</script>