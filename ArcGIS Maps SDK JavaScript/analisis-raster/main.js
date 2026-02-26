const ImageryTileLayer = await $arcgis.import(
  '@arcgis/core/layers/ImageryTileLayer.js'
)

const { bandArithmeticNDVI, colormap } = await $arcgis.import(
  '@arcgis/core/layers/support/rasterFunctionUtils.js'
)

const ndviRF = bandArithmeticNDVI({
  nirBandId: 7,
  redBandId: 3,
  scientificOutput: false
})

const colormapRF = colormap({
  colorRampName: 'NDVI3',
  raster: ndviRF
})

const incendioITL = new ImageryTileLayer({
  url: 'https://tiledimageservices1.arcgis.com/MPSkeshhtFz9vjCL/arcgis/rest/services/Imagen_Incendio_Canarias___Sentinel_2/ImageServer',
  rasterFunction: colormapRF
})

const arcgisMap = document.querySelector('arcgis-map')

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.map.add(incendioITL)
})
