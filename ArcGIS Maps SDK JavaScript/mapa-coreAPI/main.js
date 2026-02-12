// Importamos las librerias

const Map = await $arcgis.import('@arcgis/core/Map.js')
const MapView = await $arcgis.import('@arcgis/core/views/MapView.js')

const miMapa = new Map({
  basemap: 'topo-vector'
})

const vistaMapa = new MapView({
  container: 'viewDiv',
  map: miMapa
})
