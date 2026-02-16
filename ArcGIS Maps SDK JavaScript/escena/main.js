// Imports

const SceneLayer = await $arcgis.import('@arcgis/core/layers/SceneLayer.js')
const SnowyWeather = await $arcgis.import(
  '@arcgis/core/views/3d/environment/SnowyWeather.js'
)

const arcgisScene = document.querySelector('arcgis-scene')

arcgisScene.addEventListener('arcgisViewReadyChange', () => {
  const edificiosSL = new SceneLayer({
    portalItem: {
      id: 'c444b24b184c4523a5dc96248bfea4e1'
    }
  })

  arcgisScene.map.add(edificiosSL)

  arcgisScene.view.environment.weather = new SnowyWeather()
})

// Funcionalidad boton

const botonViaje = document.querySelector('.boton-viaje')

botonViaje.addEventListener('click', () => {
  arcgisScene.view.goTo({
    center: [-126, 49]
  })
})
