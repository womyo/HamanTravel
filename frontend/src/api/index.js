import axios from 'axios'

const config = {
    baseUrl: "https://api.odcloud.kr/api/3035676/v1/uddi:be5da741-0aa4-4bfc-97f2-db66c7030a1c_201808021513"
}

const secretKey = 'cl47XS7A0i8vg0NZNiXYCR5%2B9Df0fCXMZ%2BtyIPdr%2Fva2clSHIMvlnzFeTqrmgZZtO8ARtV2qB8%2BR8bfVJmB9yQ%3D%3D'

function fetchRestaurantList() {
    return axios.get(`${config.baseUrl}?page=1&perPage=56&serviceKey=${secretKey}`)
}

export {
    fetchRestaurantList
}