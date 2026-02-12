// Imports
const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')

const arcgisMap = document.querySelector('arcgis-map')

arcgisMap.addEventListener('arcgisViewReadyChange', (eventoViewReadyChange) => {
  // Este evento se ejucta cuando se carga la vista del Mapa
  // Creamos la capa

  const hospitalesFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
  })

  arcgisMap.map.add(hospitalesFL)
})
