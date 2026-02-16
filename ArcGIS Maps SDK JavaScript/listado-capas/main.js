const arcgisMap = document.querySelector('arcgis-map')

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
  const capas = arcgisMap.map.allLayers.items

  console.log(arcgisMap.map)

  const div = document.createElement('div')
  div.id = 'div-capas'

  for (let capa of capas) {
    const parrafo = document.createElement('p')
    parrafo.innerText = capa.title
    div.appendChild(parrafo)
  }

  document.body.appendChild(div)
})
