// Imports

const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')
const Query = await $arcgis.import('@arcgis/core/rest/support/Query.js')
const SimpleMarkerSymbol = await $arcgis.import(
  '@arcgis/core/symbols/SimpleMarkerSymbol.js'
)
const GraphicsLayer = await $arcgis.import(
  '@arcgis/core/layers/GraphicsLayer.js'
)

// Seleccionamos el mapa

const arcgisMap = document.querySelector('arcgis-map')

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  const hospitalesFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
  })

  // arcgisMap.map.add(hospitalesFL)

  const peticionQuery = new Query({
    where: "Provincia = 'Segovia' Or Provincia = 'Ávila'",
    returnGeometry: true,
    outFields: ['*']
  })

  // OJOOOO!!! RESULTADO ES PROMESA CUIDADIN!!!

  const resultadoQuery = hospitalesFL.queryFeatures(peticionQuery)

  resultadoQuery.then((resultadoFeatureSet) => {
    const entidades = resultadoFeatureSet.features

    console.log(entidades)

    const simbologiaPunto = new SimpleMarkerSymbol({
      angle: 0,
      color: [255, 255, 255, 0.25],
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

    const entidadesConSinbologia = entidades.map((grafico) => {
      grafico.symbol = simbologiaPunto
      return grafico
    })

    const capaGraficaGL = new GraphicsLayer()
    capaGraficaGL.addMany(entidadesConSinbologia)
    arcgisMap.map.add(capaGraficaGL)
  })

  console.log(resultadoQuery)
})
