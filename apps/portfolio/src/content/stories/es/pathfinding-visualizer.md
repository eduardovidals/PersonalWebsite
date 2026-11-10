¡Hola! Seguramente ya leíste sobre cómo [construí un visualizador de ordenamiento.](/projects/sorting-visualizer/)

Si no, no te preocupes: este visualizador de búsqueda de rutas formaba parte de un proyecto más grande llamado AlgoVisual, que busca visualizar algoritmos comunes de ordenamiento y de búsqueda de rutas. También se inspiró en gran parte en el [visualizador de búsqueda de rutas de Clément Mihailescu.](https://github.com/clementmihailescu/Pathfinding-Visualizer)

Después de implementar con éxito el visualizador de ordenamiento con React, quise ponerme un reto mayor con el visualizador de búsqueda de rutas.

Construir el visualizador me llevó muchísimas horas de estudio de los conceptos detrás de los grafos, los nodos y la forma en que usan estructuras de datos para llegar al objetivo.

El visualizador de búsqueda de rutas fue una curva de aprendizaje enorme, porque quería implementar varias funciones, como cambiar la velocidad de la visualización, agregar muros/pesos, mover los nodos de inicio/fin y poder limpiar toda la cuadrícula o solo el camino encontrado.

Al principio empecé con una implementación básica del visualizador, que mostraba DFS con un simple botón. Cuando logré que el visualizador animara tanto los nodos explorados como los del camino, seguí implementando la interfaz y las funciones del visualizador, y después la funcionalidad de muros y pesos.

La tarea más agotadora fue implementar los algoritmos de búsqueda de rutas en sí, porque hay que entenderlos por completo para saber qué nodos se deben marcar como explorados o como parte del camino. Además, entender la intuición detrás de algoritmos como Dijkstra y A* y sus implementaciones también fue un reto. ¡Son algoritmos fenomenales cuando los entiendes, y todavía mejores cuando los ves en acción!

También implementé Best-First Search después de conocer el algoritmo en mi clase de IA en la universidad. ¡Fue divertido implementarlo porque se parece mucho a A*!

Después de aprender todos los algoritmos y entender sus conceptos de fondo, logré implementar por completo un visualizador capaz de generar un laberinto, agregar muros y pesos, y mover los nodos de inicio/fin dentro de la cuadrícula. Fue un reto, ¡pero también una experiencia de aprendizaje fenomenal!

¡Gracias por leer! Si quieres, echa un vistazo a mis [otros proyectos](/projects/).

## Enlaces y referencias

- [Sitio web de AlgoVisual](https://eduardovidals.github.io/AlgoVisual)
- [Visualizador de búsqueda de rutas de Clément Mihailescu](https://github.com/clementmihailescu/Pathfinding-Visualizer)
- [Responsive Web Design, de freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design)
- [Algorithms Part I, de Robert Sedgewick y Kevin Wayne](https://www.coursera.org/learn/algorithms-part1)
- [Algorithms Part II, de Robert Sedgewick y Kevin Wayne](https://www.coursera.org/learn/algorithms-part2)
