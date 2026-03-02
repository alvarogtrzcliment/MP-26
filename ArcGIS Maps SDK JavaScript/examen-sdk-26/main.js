const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')
const Query = await $arcgis.import('@arcgis/core/rest/support/Query.js')
const SimpleMarkerSymbol = await $arcgis.import(
  '@arcgis/core/symbols/SimpleMarkerSymbol.js'
)
const Graphic = await $arcgis.import('@arcgis/core/Graphic.js')
const GraphicsLayer = await $arcgis.import(
  '@arcgis/core/layers/GraphicsLayer.js'
)
const Polyline = await $arcgis.import('@arcgis/core/geometry/Polyline.js')
const SimpleLineSymbol = await $arcgis.import(
  '@arcgis/core/symbols/SimpleLineSymbol.js'
)
const PopupTemplate = await $arcgis.import('@arcgis/core/PopupTemplate.js')

// LLamo al mapa

const arcgisMap = document.querySelector('arcgis-map')

// Capa de mercados

// En primer lugar el popup

const plantillaPopup = new PopupTemplate({
  title: '{BUSCA}',
  content: [
    {
      type: 'fields',
      fieldInfos: [
        {
          fieldName: 'DIRECCION',
          label: 'Dirección'
        },
        {
          fieldName: 'MUNICIPIO',
          label: 'Municipio'
        }
      ]
    }
  ]
})

const mercadosFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Comercios_de_la_Comunidad_de_Madrid_WFL1/FeatureServer/5',
  popupTemplate: plantillaPopup
})

// Capa de Hipermercados con su renderizador por valores únicos

const hipermercadosFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Comercios_de_la_Comunidad_de_Madrid_WFL1/FeatureServer/3',
  effect: 'bloom(1.5,0.5px,0)'
})

hipermercadosFL.renderer = {
  type: 'unique-value',
  field: 'ETIQUETA',
  uniqueValueInfos: [
    {
      value: 'Carrefour',
      symbol: {
        type: 'simple-marker',
        color: 'green'
      }
    },
    {
      value: 'Alcampo',
      symbol: {
        type: 'simple-marker',
        color: 'red'
      }
    },
    {
      value: 'Hipercor',
      symbol: {
        type: 'simple-marker',
        color: 'yellow'
      }
    },
    {
      value: 'E-Leclerc',
      symbol: {
        type: 'simple-marker',
        color: 'orange'
      }
    },
    {
      value: 'Costco',
      symbol: {
        type: 'simple-marker',
        color: 'blue'
      }
    }
  ]
}

// Capa de mercadillos, la query para insertar los mercadillos que se encuentran en madrid esta abajo

const mercadillosFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Comercios_de_la_Comunidad_de_Madrid_WFL1/FeatureServer/4'
})

// Capas Gráficas

const capaGraficaMadridGL = new GraphicsLayer({
  title: 'Mercadillos de Madrid'
})
const capaPuntoClicado = new GraphicsLayer({
  title: 'Capa para guardar el punto clicado por el usuario'
})
const capalineas = new GraphicsLayer({
  title: 'Capa de líneas a los mercados',
  effect: 'bloom(1.5,0.5px,0)'
})

// Query para añadir los mercadillos de Madrid

const peticionQuery = new Query({
  where: "MUNICIPIO = 'Madrid'",
  returnGeometry: true,
  outFields: ['*']
})

const resultadoQuery = mercadillosFL.queryFeatures(peticionQuery)

resultadoQuery.then((resultadoFeatureSet) => {
  const entidades = resultadoFeatureSet.features

  console.log(entidades)

  const simbologiaPunto = new SimpleMarkerSymbol({
    angle: 0,
    color: [255, 0, 255, 1],
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

  capaGraficaMadridGL.addMany(entidadesConSinbologia)
})

// Funcionalidad custom, evento click!

// Primero las simbologías que utilizo, para punto y para línea

const simbologiaPunto = new SimpleMarkerSymbol({
  angle: 0,
  color: [15, 255, 143, 1],
  outline: {
    cap: 'round',
    color: [0, 122, 194, 1],
    join: 'round',
    miterLimit: 1,
    style: 'solid',
    width: 4
  },
  path: 'undefined',
  size: 12,
  style: 'x',
  xoffset: 0,
  yoffset: 0
})

const lineSymbol = {
  type: 'simple-line', // autocasts as SimpleLineSymbol()
  color: [226, 119, 40],
  width: 4
}

// Evento de click, lo podemos poner sobre el arcgis-map o sobre el arcgis-map.view

arcgisMap.addEventListener('arcgisViewClick', (eventoClick) => {
  capaPuntoClicado.removeAll()
  capalineas.removeAll()

  const puntoClicado = eventoClick.detail.mapPoint

  const puntoClicadoGrafico = new Graphic({
    geometry: puntoClicado,
    symbol: simbologiaPunto
  })

  capaPuntoClicado.add(puntoClicadoGrafico)

  const peticionMercados = new Query({
    geometry: puntoClicado,
    distance: 2,
    units: 'kilometers',
    returnGeometry: true,
    spatialRelationship: 'intersects',
    outFields: ['*']
  })

  const resultadoMercado = mercadosFL.queryFeatures(peticionMercados)

  resultadoMercado.then((mercadosFeatureSet) => {
    const mercadosEntidades = mercadosFeatureSet.features
    console.log(mercadosEntidades)

    mercadosEntidades.map((mercado) => {
      const mercadoGeometria = {
        x: mercado.geometry.longitude,
        y: mercado.geometry.latitude
      }

      console.log(mercadoGeometria)

      const lineaPuntoMercado = {
        type: 'polyline',
        paths: [
          [puntoClicado.longitude, puntoClicado.latitude],
          [mercadoGeometria.x, mercadoGeometria.y]
        ]
      }

      const lineaGrafico = new Graphic({
        geometry: lineaPuntoMercado,
        symbol: lineSymbol
      })

      capalineas.add(lineaGrafico)
    })
  })

  console.log(puntoClicado)
})

// Añadimos todas las capas al mapa!

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.map.add(mercadosFL)
  arcgisMap.map.add(hipermercadosFL)
  arcgisMap.map.add(capaPuntoClicado)
  arcgisMap.map.add(capalineas)
  arcgisMap.map.add(capaGraficaMadridGL)
})
