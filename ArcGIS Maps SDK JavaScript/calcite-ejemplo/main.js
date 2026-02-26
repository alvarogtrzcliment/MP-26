const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')

const hospitalesFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
})

const addLayerButton = document.getElementById('add-layer')

console.log(addLayerButton)

const arcgisMap = document.querySelector('arcgis-map')

addLayerButton.addEventListener('click', () => {
  arcgisMap.map.add(hospitalesFL)
})
