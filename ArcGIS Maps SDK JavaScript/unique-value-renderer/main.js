const FeatureLayer = await $arcgis.import('@arcgis/core/layers/FeatureLayer.js')

const redNaturaFL = new FeatureLayer()

redNaturaFL.url =
  'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Red_Natura_2000/FeatureServer'

redNaturaFL.renderer = {
  type: 'unique-value',
  field: 'TIPO_NUEVO',
  uniqueValueInfos: [
    {
      value: 'LIC',
      symbol: {
        type: 'simple-fill',
        color: 'green'
      }
    },
    {
      value: 'ZEPA',
      symbol: {
        type: 'simple-fill',
        color: 'red'
      }
    },
    {
      value: 'LIC/ZEPA',
      symbol: {
        type: 'simple-fill',
        color: 'yellow'
      }
    }
  ]
}

const arcgisMap = document.querySelector('arcgis-map')

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  arcgisMap.map.add(redNaturaFL)
})
