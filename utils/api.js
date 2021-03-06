import {EXPO_GEOCODE_PUBLIC_KEY} from '@env'

export const geocode = async address => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + `.json?access_token=${EXPO_GEOCODE_PUBLIC_KEY}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const results = await response.json()

  const coord = {
    longitude: results.features[0].center[0],
    latitude: results.features[0].center[1],
  }
  
  return coord
}