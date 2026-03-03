import './App.css'
import AplicacionArcGIS from './components/AplicacionArcGIS/AplicacionArcGIS'

function App() {
  return (
    <div>
      <AplicacionArcGIS
        titulo={'Experience Builder'}
        descripcion={'Descripcion de Experience Builder'}
        enlace={'Enlace a Experience Builder'}
        direccionEnlace={
          'https://react.dev/reference/rules/components-and-hooks-must-be-pure'
        }
      ></AplicacionArcGIS>
      <AplicacionArcGIS
        titulo={'Story Maps'}
        descripcion={'Descripcion de Story Maps'}
        enlace={'Enlace a Story Maps'}
        direccionEnlace={
          'https://react.dev/reference/rules/components-and-hooks-must-be-pure'
        }
      ></AplicacionArcGIS>
    </div>
  )
}

export default App
