El siguiente proyecto en el que trabajé con Smarttwigs fue Benev, una plataforma dedicada a conectar marcas, organizaciones sin fines de lucro e influencers para impulsar el cambio social.

Por si te lo perdiste, el proyecto anterior en el que trabajé con Smarttwigs fue [Props.](/projects/props/)

Tomé lo que aprendí en Props y lo apliqué al sitio web de Benev.

La app móvil de Benev estaba en desarrollo, pero mi tarea era construir un sitio web responsivo desde cero. Además, iba a ser el único desarrollador del sitio, así que decidí hacerlo con React-Redux y Styled Components, para que a futuros desarrolladores les resultara más fácil trabajar en él una vez que yo sentara las bases del proyecto.

La pantalla inicial del sitio permitía a los usuarios registrarse o iniciar sesión en su cuenta, y tiene animaciones fluidas y elegantes que modernizan la experiencia, como puedes ver en la grabación de abajo.

![Flujo de registro de Benev](/work/benev-signup-flow.mp4)

## Carrusel de suscripciones de Benev

El otro aspecto importante del sitio fue que trabajé en permitir que los usuarios compraran planes de suscripción desde la web.

![Carrusel de suscripciones de Benev](/work/benev-payments.webp)

La interfaz del sitio se parece mucho al diseño de Props, pero el código de Props solo permitía que el carrusel tuviera tres planes. Por eso tuve que refactorizar el código existente para que el carrusel aceptara cualquier número de tarjetas, y además lo convertí en un componente para que fuera fácil de cambiar en el futuro. Gracias a eso, fue posible escribir el siguiente código:

```tsx
function ChoosePlans() {
  const [planType, setPlanType] = useState('Business');

  // show plans by type
  // NOTE: DO NOT DELETE, each plan should have their own carousel with a
  // UNIQUE key to prevent the animations from transitioning from the previous
  // state of another carousel component, the key tells React that it is a
  // new instance of the component, rather than the same instance
  const showPlans = (planType: string) => {
    switch (planType) {
      case 'Business':
        return (
          <Carousel planType={planType} setPlanType={setPlanType} key={planType}>
            <PlanCard planJson={businessPlans.entrepreneurLite} />
            <PlanCard planJson={businessPlans.premium} />
            <PlanCard planJson={businessPlans.enterprise} />
          </Carousel>
        );
      case 'School':
        return (
          <Carousel planType={planType} setPlanType={setPlanType} key={planType}>
            <PlanCard planJson={schoolPlans.premiere} />
            <PlanCard planJson={schoolPlans.elite} />
            <PlanCard planJson={schoolPlans.superStar} />
          </Carousel>
        );
      case 'Family':
        return (
          <Carousel planType={planType} setPlanType={setPlanType} key={planType}>
            <PlanCard planJson={familyPlans.familyPlan} />
          </Carousel>
        );
    }

    return <PlanCard planJson={familyPlans.familyPlan} />;
  };

  return (
    <>
      <ChoosePlansNavBar />

      <ChoosePlansContainer>
        <ChoosePlansHeadersContainer>
          <ChoosePlansHeader>BENEV</ChoosePlansHeader>
          <ChoosePlansSubText>ORGANIZATION PLANS</ChoosePlansSubText>
        </ChoosePlansHeadersContainer>

        {showPlans(planType)}
      </ChoosePlansContainer>
    </>
  );
}
```

Como se ve arriba, el código se simplifica gracias a styled-components y a la generalización de componentes como PlanCard y Carousel. Además, en lugar de pasarle varias props a un componente, se le pasa un objeto JSON con todos los campos predefinidos, lo que hace que el código sea muy fácil de leer y de cambiar.

## Pago en Benev

Pero eso no fue todo: también hice funcionar el Payment Element de Stripe en el sitio, lo que me obligó a hacer cambios tanto en el front-end como en el back-end.

Este es el resultado de la pantalla de pago al elegir un plan de suscripción en el carrusel.

![Pago en Benev](/work/benev-checkout.webp)

En resumen, creé el sitio web de Benev con el código más limpio posible, para que futuros desarrolladores pudieran trabajar en él fácilmente sin confundirse con las convenciones que yo establecí.

La pasantía fue una experiencia increíble, ¡y mi siguiente gran oportunidad fue conseguir un puesto en PGIM como pasante de ingeniería de software!

¡Gracias por leer! Si quieres, echa un vistazo a mis [otros proyectos](/projects/).
