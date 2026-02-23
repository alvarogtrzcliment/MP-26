const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')

const arcgisMap = document.querySelector('arcgis-map')

const capaEditableFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/MPSkeshhtFz9vjCL/arcgis/rest/services/Capa_Editable_/FeatureServer'
})

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.map.add(capaEditableFL)
})
