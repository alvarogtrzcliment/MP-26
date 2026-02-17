// Import

const Point = await $arcgis.import('@arcgis/core/geometry/Point.js')
const SimpleMarkerSymbol = await $arcgis.import(
  '@arcgis/core/symbols/SimpleMarkerSymbol.js'
)
const Graphic = await $arcgis.import('@arcgis/core/Graphic.js')
const GraphicsLayer = await $arcgis.import(
  '@arcgis/core/layers/GraphicsLayer.js'
)

// Añadir puntos al mapa

// Geometría

const geometriaPunto = new Point({
  latitude: 41.4,
  longitude: -4
})

console.log('Geometría', geometriaPunto)

// Simbologia

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

// Unimos Geometría y Simbologia

const graficoPunto = new Graphic({
  geometry: geometriaPunto,
  symbol: simbologiaPunto
})

// Creo una capa gráfica para los gráficos que creo

const capaGraficaGL = new GraphicsLayer()

capaGraficaGL.add(graficoPunto)

// Accedemos al Mapa

const arcgisMap = document.querySelector('arcgis-map')

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.map.add(capaGraficaGL)
})
