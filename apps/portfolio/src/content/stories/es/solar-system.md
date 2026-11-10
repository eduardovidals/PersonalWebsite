¡Hola! Este es uno de los proyectos que hice en mi clase de Computación Gráfica en NJCU. Podíamos usar cualquier tecnología, siempre que incorporara la terminología de la computación gráfica.

## React y Three.js

Elegí React y Three.js porque los conceptos de fondo ya están implementados en Three.js, y al usar React el código se simplifica en algo fácil de entender. Por ejemplo, este es el código final del Sistema Solar.

```jsx
function App() {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});
  return (
    <div id={'app'}>
      <Canvas camera={{ position: [-1500, 550, 120], fov: 60, far: 100000 }}>
        <Stars />
        <Sun />
        <Planets
          planetData={planetData}
          zoomToView={(focusRef) => {
            setZoom(!zoom);
            setFocus(focusRef);
          }}
        />
        <Lights />
        <FPSControls />
        {/* <Controls zoom={zoom} focus={focus} /> */}
      </Canvas>
    </div>
  );
}
```

El código es muy simple y fácil de entender, pero por debajo usa varios conceptos matemáticos, como el movimiento de las estrellas en el espacio y la eclíptica de cada planeta. También aprendimos conceptos como texturizado, rotaciones, escalado, sombras y movimiento de cámara.

Fue un proyecto muy pequeño, pero logré entender una buena cantidad de fundamentos de computación gráfica creando este Sistema Solar con React y Three.js.

Abajo hay una grabación recorriendo el espacio dentro del sistema solar.

![Demostración del Sistema Solar](/work/solar-system.mp4)

¡Gracias por leer! Si quieres, echa un vistazo a mis [otros proyectos](/projects/).

## Enlaces y referencias

- [Sitio web del Sistema Solar](https://eduardovidals.github.io/SolarSystem)
