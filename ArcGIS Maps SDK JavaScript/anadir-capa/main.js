// Imports

const Map = await $arcgis.import('@arcgis/core/Map.js')
const MapView = await $arcgis.import('@arcgis/core/views/MapView.js')
const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')

// Creo el mapa

const mapa = new Map({
  basemap: 'topo-vector'
})

// Creo la vista

const vistaMapa = new MapView({
  container: 'viewDiv',
  map: mapa
})

// Creo la capa

const hospitalesFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
})

const hospitalesPortalItemFL = new FeatureLayer({
  portalItem: {
    id: '68745a7fb7a348b6b0d722c8517790af'
  }
})

// Añadir la capa al mapa

mapa.add(hospitalesPortalItemFL)
