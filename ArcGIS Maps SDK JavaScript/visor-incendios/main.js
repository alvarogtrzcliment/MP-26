const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')
const Query = await $arcgis.import('@arcgis/core/rest/support/Query.js')
const PictureMarkerSymbol = await $arcgis.import(
  '@arcgis/core/symbols/PictureMarkerSymbol.js'
)
const GraphicsLayer = await $arcgis.import(
  '@arcgis/core/layers/GraphicsLayer.js'
)

const arcgisMap = document.querySelector('arcgis-map')

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  const paisesFL = new FeatureLayer({
    url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries/FeatureServer/0'
  })

  const incendiosFL = new FeatureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/MODIS_Thermal_v1/FeatureServer/1'
  })

  const capaIncendiosGL = new GraphicsLayer({
    title: 'Incendios'
  })

  const simbologiaIncendio = new PictureMarkerSymbol({
    height: 32,
    url: 'https://cdn-icons-png.flaticon.com/512/1172/1172477.png?w=740&t=st=1686904179~exp=1686904779~hmac=88debfe6e746b67f6d5ea14f8b3de9cda0bb4863f2853270d04519720ffda663',
    width: 32
  })

  // PRIMERA QUERY!!!

  const peticionEspana = new Query({
    where: "ISO_CC = 'ESP'",
    returnGeometry: true
  })

  const resultadoEspana = paisesFL.queryFeatures(peticionEspana)

  resultadoEspana.then((resultadoFeatureSet) => {
    const poligonosEspana = resultadoFeatureSet.features

    poligonosEspana.map((poligono) => {
      const geometriaPoligono = poligono.geometry

      // Segunda Query

      const incendiosQuery = new Query({
        geometry: geometriaPoligono,
        returnGeometry: true,
        spatialRelationship: 'intersects'
      })

      const resultadoQueryIncendios = incendiosFL.queryFeatures(incendiosQuery)

      resultadoQueryIncendios.then((resultadoFeatureSetIncendios) => {
        const incendios = resultadoFeatureSetIncendios.features

        const incendiosConSimbologia = incendios.map((incendioGraphic) => {
          incendioGraphic.symbol = simbologiaIncendio
          return incendioGraphic
        })

        capaIncendiosGL.addMany(incendiosConSimbologia)
      })
    })

    arcgisMap.map.add(capaIncendiosGL)
  })
})
