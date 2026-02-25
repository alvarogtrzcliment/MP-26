const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')

const arcgisMap = document.querySelector('arcgis-map')

const poblacionFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/YFraetVkEAF1lMag/arcgis/rest/services/Nivel_estudios_y_poblaci%C3%B3n_por_CCAA_2021/FeatureServer',
  renderer: {
    type: 'simple',
    symbol: {
      type: 'simple-marker',
      color: 'blue'
    },
    visualVariables: [
      {
        type: 'size',
        field: 'Poblacion',
        minDataValue: 63000,
        maxDataValue: 7500000,
        minSize: 8,
        maxSize: 40
      }
    ]
  }
})

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.map.add(poblacionFL)
})
