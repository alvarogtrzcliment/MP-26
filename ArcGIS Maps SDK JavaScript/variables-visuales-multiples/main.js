const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')
const ClassBreaksRenderer = await $arcgis.import(
  '@arcgis/core/renderers/ClassBreaksRenderer.js'
)

const arcgisMap = document.querySelector('arcgis-map')

const estacionesMeteorologicasFL = new FeatureLayer({
  url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/weather_stations_010417/FeatureServer/0',
  renderer: new ClassBreaksRenderer({
    field: 'TEMP',
    classBreakInfos: [
      {
        minValue: 2,
        maxValue: 32,
        symbol: {
          type: 'simple-marker',
          path: 'M14.5,29 23.5,0 14.5,9 5.5,0z',
          color: '#9878ff',
          outline: {
            color: [0, 0, 0, 0.7],
            width: 0.5
          }
        }
      },
      {
        minValue: 33,
        maxValue: 83,
        symbol: {
          type: 'simple-marker',
          path: 'M14.5,29 23.5,0 14.5,9 5.5,0z',
          color: '#ff6888',
          outline: {
            color: [0, 0, 0, 0.7],
            width: 0.5
          }
        }
      }
    ],
    visualVariables: [
      {
        type: 'size',
        field: 'WIND_SPEED',
        minDataValue: 0,
        maxDataValue: 60,
        minSize: 8,
        maxSize: 50
      },
      {
        type: 'rotation',
        field: 'WIND_DIRECT',
        rotationType: 'geographic'
      }
    ]
  })
})

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.map.add(estacionesMeteorologicasFL)
})
