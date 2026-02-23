const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')

const arcgisMap = document.querySelector('arcgis-map')

const hospitalesFL = new FeatureLayer({
  url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
})

const searchWebComponent = document.querySelector('arcgis-search')

searchWebComponent.addEventListener('arcgisReady', (customEvent) => {
  searchWebComponent.sources = [
    {
      layer: hospitalesFL,
      searchFields: ['Nombre', 'Municipio'],
      displayField: 'Nombre',
      // exactMatch: false,
      outFields: ['*'],
      suggestionTemplate: '{Nombre}, {Municipio}',
      placeholder: 'Hospital García Orcoyen, Estella-Lizarra'
    }
  ]
})
