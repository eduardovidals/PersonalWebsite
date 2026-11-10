¡Hola! Primero, déjame explicarte la idea detrás de Props, una app creada por Smarttwigs.

Props es una plataforma que permite a empleados, padres y maestros reforzar los mejores comportamientos en su equipo, eligiendo premios estratégicos y dando props (reconocimientos) de maneras que sus equipos puedan imitar.

Props tenía una app móvil y un sitio web, y la mayor parte de mi trabajo consistía en implementar APIs REST, construir la app con React Native y crear un sitio web para procesar pagos.

Durante mi pasantía en Smarttwigs, aprendí cómo se trabaja en un entorno Agile y conceptos importantes como la obtención de datos, el manejo del estado global, las APIs REST y el diseño de bases de datos.

## Construyendo APIs REST

Antes de la pasantía, no sabía absolutamente nada de APIs REST y siempre me había preguntado por qué aparecían tanto en los currículums de ejemplo de otros ingenieros de software.

Sin embargo, a las pocas semanas de empezar la pasantía, me encargaron implementar varias funcionalidades en el back-end que seguían los estándares RESTful. No tenía **ni idea** de por dónde empezar, pero con el tiempo me familiaricé con términos como parámetros de ruta, parámetros de consulta, cuerpo de la solicitud, protocolos HTTP y convenciones de nombres para los endpoints de una API REST.

Todo esto fue una experiencia de aprendizaje increíble, porque por fin entendí la importancia de las APIs REST y por qué pueden ser una parte tan clave de un currículum.

Durante mi tiempo en Smarttwigs, construí y mejoré varios servicios para Props, como refactorizar todo el código para seguir las convenciones RESTful y crear funcionalidades nuevas, por ejemplo, una tabla de clasificación de los props dados dentro de un equipo y la opción de que los usuarios vieran si tienen equipos en común.

Disfruté muchísimo trabajar en el backend, ya que es una parte crucial de la funcionalidad de la app, pero también trabajé con React Native para construir la app móvil de Props.

## Usando React Native

También trabajé en parte con el equipo de front-end para construir Props. Trabajaba con un pequeño equipo de desarrolladores y un gerente de producto encargado de darle seguimiento a nuestro avance en la app. En cuanto a cosas nuevas, solo tuve que aprender algunos conceptos de React Native, ya que es básicamente React, pero con componentes que te permiten llevar tu app a iOS, Android y otras plataformas nativas.

Trabajé en la funcionalidad de muchas pantallas, como la de registro, que tenía funciones importantes como el inicio de sesión con redes sociales y la creación del usuario en el back-end, y la de edición del perfil.

![Pantalla de registro de Props](/work/props-signup.webp) ![Edición del perfil en Props](/work/props-edit-profile.webp)

Algo todavía más importante: también trabajé en la pantalla que permitía comprar las suscripciones dentro de la app.

![Suscripciones de Props](/work/props-iap.webp)

Sin embargo, como Apple se queda con una parte de las compras dentro de la app, se creó un sitio web para procesar el pago de la suscripción que el usuario quisiera comprar. El usuario podía entrar al sitio, iniciar sesión y elegir la suscripción que prefiriera.

![Sitio web de Props](/work/props-website.webp)

Hacer las pantallas del front-end fue relativamente sencillo, pero crear el endpoint que procesaba las compras fue mucho más difícil, porque teníamos que tener en cuenta los campos importantes para procesar el pago de una suscripción. Usé la API de Stripe para gestionar los pagos hechos desde la web y guardar la información relevante en la base de datos.

En general, aprendí muchísimos fundamentos de front-end, back-end y bases de datos.

Cuando terminó el desarrollo de Props, decidí aplicar lo aprendido en el siguiente proyecto que hice con Smarttwigs, [Benev.](/projects/benev/)
