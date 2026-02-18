// Imports

// Geometrias

const Point = await $arcgis.import('@arcgis/core/geometry/Point.js')
const Polyline = await $arcgis.import('@arcgis/core/geometry/Polyline.js')

// Simbologias

const SimpleMarkerSymbol = await $arcgis.import(
  '@arcgis/core/symbols/SimpleMarkerSymbol.js'
)
const SimpleLineSymbol = await $arcgis.import(
  '@arcgis/core/symbols/SimpleLineSymbol.js'
)

// Graphic y Graphics Layer

const Graphic = await $arcgis.import('@arcgis/core/Graphic.js')
const GraphicsLayer = await $arcgis.import(
  '@arcgis/core/layers/GraphicsLayer.js'
)

// Creamos el código!

// Geometrias

const geometriaPunto = new Point({
  latitude: 41,
  longitude: -4
})

const geometriaLinea = new Polyline({
  paths: [
    [41, -3],
    [41, -2]
  ]
})

const geometriaPoligono = {
  type: 'polygon',
  rings: [
    [42, -3],
    [42, -2],
    [41, -1]
  ]
}

// Simbologias

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

const simbologiaLinea = new SimpleLineSymbol({
  cap: 'round',
  color: [0, 122, 194, 1],
  join: 'round',
  miterLimit: 1,
  style: 'solid',
  width: 1
})

const simbologiaPoligono = {
  type: 'simple-fill',
  color: [0, 122, 194, 1],
  outline: {
    cap: 'round',
    color: [0, 122, 194, 1],
    join: 'round',
    miterLimit: 1,
    style: 'solid',
    width: 1
  },
  style: 'solid'
}

// Creamos los graficos

const graficoPunto = new Graphic({
  geometry: geometriaPunto,
  symbol: simbologiaPunto
})

const graficoLinea = new Graphic({
  geometry: geometriaLinea,
  symbol: simbologiaLinea
})

const graficoPoligono = new Graphic({
  geometry: geometriaPoligono,
  symbol: simbologiaPoligono
})

// Creamos las capas

const capaPuntos = new GraphicsLayer({
  graphics: [graficoPunto]
})

const capaPolilinea = new GraphicsLayer()
capaPolilinea.add(graficoLinea)

const capaPoligono = new GraphicsLayer()
capaPoligono.add(graficoPoligono)

// Añadimos la capa al mapa

const arcgisMap = document.querySelector('arcgis-map')

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.map.addMany([capaPoligono, capaPolilinea, capaPuntos])
})
