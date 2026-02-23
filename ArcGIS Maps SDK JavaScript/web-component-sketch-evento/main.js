const GraphicsLayer = await $arcgis.import(
  '@arcgis/core/layers/GraphicsLayer.js'
)
const Query = await $arcgis.import('@arcgis/core/rest/support/Query.js')
const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')
const SimpleMarkerSymbol = await $arcgis.import(
  '@arcgis/core/symbols/SimpleMarkerSymbol.js'
)

const arcgisMap = document.querySelector('arcgis-map')

const sketch = document.querySelector('arcgis-sketch')

const hospitalesFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
})

const capaGraficaResultados = new GraphicsLayer()
const capaGraficaHospitalesResultados = new GraphicsLayer()

const simbologiaPunto = new SimpleMarkerSymbol({
  angle: 0,
  color: [0, 255, 145, 1],
  outline: {
    cap: 'round',
    color: [0, 122, 194, 1],
    join: 'round',
    miterLimit: 1,
    style: 'solid',
    width: 1
  },
  path: 'undefined',
  size: 12,
  style: 'circle',
  xoffset: 0,
  yoffset: 0
})

sketch.addEventListener('arcgisReady', () => {
  sketch.layer = capaGraficaResultados
})

sketch.addEventListener('arcgisCreate', (customEvent) => {
  console.log(customEvent)

  if (
    customEvent.detail.state === 'complete' &&
    customEvent.detail.tool === 'point'
  ) {
    capaGraficaHospitalesResultados.removeAll()
    const geometriaPunto = customEvent.detail.graphic.geometry

    console.log(geometriaPunto)

    const parametrosQuery = new Query({
      geometry: geometriaPunto,
      spatialRelationship: 'intersects',
      distance: 10,
      units: 'kilometers',
      returnGeometry: true,
      outFields: ['*']
    })

    const resultadoQuery = hospitalesFL.queryFeatures(parametrosQuery)

    // ESTO ES UNA PROMESA!!!!!!

    resultadoQuery.then((resultadoFeatureSet) => {
      const entidades = resultadoFeatureSet.features
      const entidadesConSimbologia = entidades.map((hospital) => {
        hospital.symbol = simbologiaPunto
        return hospital
      })

      capaGraficaHospitalesResultados.addMany(entidadesConSimbologia)
    })
  }
})

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.map.add(capaGraficaResultados)
  arcgisMap.map.add(capaGraficaHospitalesResultados)
})
