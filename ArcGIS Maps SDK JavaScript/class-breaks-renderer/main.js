const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')
const ClassBreaksRenderer = await $arcgis.import(
  '@arcgis/core/renderers/ClassBreaksRenderer.js'
)

const arcgisMap = document.querySelector('arcgis-map')

const renderizadorPorClases = new ClassBreaksRenderer({
  field: 'F_POBLACION__Población'
})

renderizadorPorClases.addClassBreakInfo({
  minValue: 0,
  maxValue: 10000,
  symbol: {
    type: 'simple-fill',
    color: 'red'
  }
})

renderizadorPorClases.addClassBreakInfo({
  minValue: 10000,
  maxValue: 30000,
  symbol: {
    type: 'simple-fill',
    color: 'orange'
  }
})

renderizadorPorClases.addClassBreakInfo({
  minValue: 30000,
  maxValue: 90000,
  symbol: {
    type: 'simple-fill',
    color: 'yellow'
  }
})

const zonasBasicasFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/ZONAS_BASICAS_SALUD_MADRID/FeatureServer/0',
  renderer: renderizadorPorClases
})

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.map.add(zonasBasicasFL)
})
