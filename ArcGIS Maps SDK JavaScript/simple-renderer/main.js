const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')
const SimpleRenderer = await $arcgis.import(
  '@arcgis/core/renderers/SimpleRenderer.js'
)
const SimpleMarkerSymbol = await $arcgis.import(
  '@arcgis/core/symbols/SimpleMarkerSymbol.js'
)

const arcgisMap = document.querySelector('arcgis-map')

// const hospitalesRenderer = new SimpleRenderer({
//   symbol: new SimpleMarkerSymbol({
//     color: 'red',
//     outline: {
//       color: [128, 128, 128, 0.5],
//       width: '0.5px'
//     }
//   })
// })

const hospitalesRenderer = {
  type: 'simple',
  symbol: {
    type: 'simple-marker',
    color: 'red',
    outline: {
      color: [128, 128, 128, 0.5],
      width: '0.5px'
    }
  }
}

const hospitalesFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0',
  renderer: hospitalesRenderer
})

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.map.add(hospitalesFL)
})
