const arcgisMap = document.querySelector('arcgis-map')

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  const vistaMapa = arcgisMap.view

  const eventoClickMapa = vistaMapa.on('click', (eventoClick) => {
    const geometriaPunto = eventoClick.mapPoint
    console.log('Geometria', geometriaPunto)
    const resultadoMovimiento = vistaMapa.goTo(geometriaPunto)
    console.log(resultadoMovimiento)

    // El movimiento sale bien

    resultadoMovimiento.then(() => {
      vistaMapa.zoom = 18
    })

    // El movimiento sale mal

    resultadoMovimiento.catch((error) => {
      console.log(error)
    })
  })
})
