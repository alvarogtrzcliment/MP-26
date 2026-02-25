const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')
const HeatmapRenderer = await $arcgis.import(
  '@arcgis/core/renderers/HeatmapRenderer.js'
)

const hospitalesRenderer = new HeatmapRenderer({
  colorStops: [
    { ratio: 0, color: 'rgba(255, 255, 255, 0)' },
    { ratio: 0.2, color: 'rgba(255, 255, 255, 1)' },
    { ratio: 0.5, color: 'rgba(255, 140, 0, 1)' },
    { ratio: 0.8, color: 'rgba(255, 140, 0, 1)' },
    { ratio: 1, color: 'rgba(255, 0, 0, 1)' }
  ],
  minDensity: 0,
  maxDensity: 0.1,
  radius: 10
})

const hospitalesFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0',
  renderer: hospitalesRenderer
})

const arcgisMap = document.querySelector('arcgis-map')

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.map.add(hospitalesFL)
})
