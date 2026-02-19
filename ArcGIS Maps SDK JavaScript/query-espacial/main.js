// Imports

const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')
const Polygon = await $arcgis.import('@arcgis/core/geometry/Polygon.js')
const SimpleFillSymbol = await $arcgis.import(
  '@arcgis/core/symbols/SimpleFillSymbol.js'
)
const Graphic = await $arcgis.import('@arcgis/core/Graphic.js')
const GraphicsLayer = await $arcgis.import(
  '@arcgis/core/layers/GraphicsLayer.js'
)
const Query = await $arcgis.import('@arcgis/core/rest/support/Query.js')
const WebStyleSymbol = await $arcgis.import(
  '@arcgis/core/symbols/WebStyleSymbol.js'
)

// LLamamos al mapa

const arcgisMap = document.querySelector('arcgis-map')

// Creamos la capa

const hospitalesFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
})

// Creamos el polígono
// Geometría

const geometriaPoligono = new Polygon({
  rings: [
    [
      [-3.8, 40.45],
      [-3.6, 40.45],
      [-3.6, 40.38],
      [-3.8, 40.38],
      [-3.8, 40.45]
    ]
  ]
})

// Simbologia

const simbologiaPoligono = new SimpleFillSymbol({
  color: [0, 122, 194, 0],
  outline: {
    cap: 'round',
    color: [0, 122, 194, 1],
    join: 'round',
    miterLimit: 1,
    style: 'solid',
    width: 1
  },
  style: 'solid'
})

const poligonoGrafico = new Graphic({
  geometry: geometriaPoligono,
  symbol: simbologiaPoligono
})

const capaGraficaPoligono = new GraphicsLayer({
  graphics: [poligonoGrafico],
  title: 'Capa del Polígono'
})

// Hacemos la QUERY

const peticionHospitales = new Query({
  geometry: geometriaPoligono,
  returnGeometry: true,
  spatialRelationship: 'intersects',
  outFields: ['*']
})

// Hacer la peticion

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.map.add(capaGraficaPoligono)

  const resultadosQueryHospitales =
    hospitalesFL.queryFeatures(peticionHospitales)

  resultadosQueryHospitales.then((resultadosFeatureSet) => {
    const entidades = resultadosFeatureSet.features

    const simbologiaGorila = new WebStyleSymbol({
      name: 'Gorilla',
      styleUrl:
        'https://www.arcgis.com/sharing/rest/content/items/1fbb242c54e4415d9b8e8a343ca7a9d0/data'
    })

    const entidadesConSymbologia = entidades.map((entidadGrafico) => {
      entidadGrafico.symbol = simbologiaGorila
      return entidadGrafico
    })

    const capaGraficaResultado = new GraphicsLayer({
      title: 'Hospitales con Gorilas'
    })

    capaGraficaResultado.addMany(entidadesConSymbologia)

    arcgisMap.map.add(capaGraficaResultado)
  })
})
