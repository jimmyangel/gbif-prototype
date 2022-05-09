<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<style lang="scss" scoped>

  #map {
    width: 100%;
    height: 70vh;
  }

</style>

<script>
  import Vue from 'vue'
  import Maplibre from 'maplibre-gl'
  import { ResetViewControl } from '~/utils/map'
  import { stripePattern } from '~/utils/misc'
  import { mapConfig } from '~/utils/config'

  export default {
    name: 'InteractiveMap',
    props: {
      isMapVisible: { type: Boolean, required: false }
    },
    data() {
      return {
      }
    },
    components: {
    },
    mounted() {
      if (process.isClient) {
        this.map = new Maplibre.Map({
          container: 'map',
          style: mapConfig.styles[0].uri,
          center: mapConfig.mapCenter,
          zoom: mapConfig.mapZoom,
          bearing: mapConfig.mapBearing,
          pitch: mapConfig.mapPitch,
          maxBounds: mapConfig.maxBounds,
          maxZoom: mapConfig.maxZoom
        })
        this.map.on('load',( () => {
          this.map.addControl(new Maplibre.NavigationControl(), 'top-right')
          const resetView = new ResetViewControl({
            center: mapConfig.mapCenter,
            zoom: mapConfig.mapZoom,
            bearing: mapConfig.mapBearing,
            pitch: mapConfig.mapPitch
          })
          this.map.addControl(resetView, 'top-right')
          this.map.addControl(new Maplibre.ScaleControl())
          this.addLayers()
          this.map.on('styledata',() => {
            this.addLayers()
          })
        }))
      }
    },
    methods: {
      addLayers: function() {
        if (!this.map.getLayer('venezuela')) {
          this.map.addSource('venezuela', {
            type: 'vector',
            maxzoom: 10,
            tiles: [mapConfig.vectorTilesBaseUrl + 'venezuela' + '/{z}/{x}/{y}.pbf'],
            attribution: 'IGVSB'
          })
          this.map.addLayer({
            id: 'venezuela',
            type: 'line',
            source: 'venezuela',
            'source-layer': 'venezuela',
            layout: {},
            paint: {
              'line-color': '#504f54',
              'line-dasharray': [2, 3],
              'line-width': 2
            }
          })
        }
      },
      mapClickHandler: function(e) {
        let features = this.map.queryRenderedFeatures(e.point)
        if (features.length) {
          console.log('features')
        }
      }
    },
    computed: {

    },
    beforeDestroy () {
      // Save map view before leaving

    },
    watch: {
      isMapVisible(isV) {
        console.log(isV)
        if (isV) window.dispatchEvent(new Event('resize'))
      }
    }
  }

</script>
