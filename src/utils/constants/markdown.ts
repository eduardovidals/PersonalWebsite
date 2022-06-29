import Images from "utils/images";

export const sortingVisualizerMarkdown = `
# Building a Sorting Visualizer
![Sorting Visualizer Website](${Images.sortingProject})

Thanks for exploring my page a bit more! This project was largely inspired by [Clément Mihailescu's sorting 
visualizer.](https://github.com/clementmihailescu/Sorting-Visualizer) 

The sorting visualizer was the beginning of a bigger project known as AlgoVisual, which aims to visualize common
sorting and pathfinding algorithms. 

The reason for starting the project was that I was always amazed by the beauty of algorithms and thought the best way
to deeply understand the algorithms was to create a website that visualizes them!

Now, at this time, I had finished a popular Coursera course offered by Princeton University, which is known as 
Algorithms Part I & II by Robert Sedgewich & Kevin Wayne.

The course was an amazing course that offered me ability to learn algorithms and data structures at a deeper level,
which would have not been possible to learn within my university's curriculum.

On top of that, I chose to learn web technologies such as HTML & CSS from freeCodeCamp and further enhanced my skills 
by learning a library such as React.

After extensive learning, I was able to implement a sorting visualizer that implemented algorithms such as:
Merge Sort, Quick Sort, & Heap Sort. 

Thanks for reading and feel free to read more about [my pathfinding visualizer!](../pathfinding-visualizer)

## Respective Links
- [AlgoVisual Website](https://eduardovidals.github.io/AlgoVisual)
- [Sorting Visualizer Source Code](https://github.com/eduardovidals/AlgoVisual/tree/main/src/AlgoVisual/Layout/Main/SortingVisualizer)
- [Clément Mihailescu's Sorting Visualizer](https://github.com/clementmihailescu/Sorting-Visualizer)
- [Responsive Web Design by freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design)
- [Algorithms Part I by Robert Sedgewick & Kevin Wayne](https://www.coursera.org/learn/algorithms-part1)
- [Algorithms Part II by Robert Sedgewick & Kevin Wayne](https://www.coursera.org/learn/algorithms-part2)
`

export const pathfindingVisualizerMarkdown = `
# Building a Pathfinding Visualizer
![Pathfinding Visualizer Website](${Images.pathfindingProject})

Hey! You probably already read about my process for [building a sorting visualizer.](../sorting-visualizer)

If not, no worries, this pathfinding visualizer project was part of a larger project known as AlgoVisual, which
aims to visualize common sorting and pathfinding algorithms. It was also largely inspired by [Clément Mihailescu's 
pathfinding visualizer.](https://github.com/clementmihailescu/Pathfinding-Visualizer)

After being able to sucessfully implement the sorting visualizer with React, I had to further challenge myself by
implementing the pathfinding visualizer. 

Now, the process behind building the visualizer involved a ton of hours of studying the underlying concepts behind
graphs, nodes, and the ways they use data structures to find the goal.

The pathfinding visualizer was an immense learning curve, as there were several features that I wanted to implement
for the visualizer, such as changing visualization speed, adding walls/weights, moving start/finish nodes, and being
able to clear the entire grid or just clearing the path that was found.

At first, I started with a basic implementation of the visualizer, which would visualize DFS using a simple button.
After getting the visualizer to succesfully animate both the searched and path nodes, I would continue
implementing the UI and features for the visualzier, and then implementing the functionality for walls & weights.

The most grueling task was implementing the actual pathfinding algorithms, as it is
necessary to fully understand them to know what nodes should be added as searched nodes or path nodes. Not only that, but
the actual intuition of the algorithms and implementations were also a challenge, such as Dijkstra & A*, which are
phenomenal algorithms when understood and are even better when visualized!

I would also implement Best-First Search after learning about the algorithm in my university's AI class, which was fun
to implement as it's very similar to A*!

After learning all the algorithms and understanding their underlying concepts, I was able to fully implement a
visualizer with the abilities to generate a maze, add walls, weights, and moving start/finish nodes within the grid. It
was a challenge but it was a phenomenal learning experience!

Thanks for reading and feel free to read more about my [other projects!](../../#projects)

## Respective Links
- [AlgoVisual Website](https://eduardovidals.github.io/AlgoVisual)
- [Clément Mihailescu's Pathfinding Visualizer](https://github.com/clementmihailescu/Pathfinding-Visualizer)
- [Responsive Web Design by freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design)
- [Algorithms Part I by Robert Sedgewick & Kevin Wayne](https://www.coursera.org/learn/algorithms-part1)
- [Algorithms Part II by Robert Sedgewick & Kevin Wayne](https://www.coursera.org/learn/algorithms-part2)
`

export const propsMarkdown = `
# Props
![Props Ad](${Images.propsAd})

Hey! So first, let me explain the idea behind Props, which is an app made by Smarttwigs. 

Props is a platform that allows employees, parents, and teachers to enforce best behaviors for their team by choosing
strategic awards and giving props in ways for their teams to emulate.

There was a mobile app and website built for Props, and most of my work would consist of implementing REST APIs, 
building the app with React Native, and creating a website to process payments.

Throughout the time in the internship with Smarttwigs, I was able to learn the process behind working in an Agile 
environment and important concepts such as fetching data, handling global state, REST APIs, and database design.

# Building REST APIs
Before the internship, I was absolutely clueless about REST APIs and had always wondered why it was such a prevalent
idea in example resumes of other software engineers. 

However, only a few weeks into the internship I was tasked implemented several functionalities in the back-end, which
followed RESTful standards. I had **no idea** where to start, but eventually became familiar with terms such as path
parameters, query parameters, request body, HTTP protocols, and naming conventions for REST API endpoints. 

All of this was an amazing learning experience as I finally got to understand the importance of REST APIs and
how they can be such a crucial part of a resume.

In my time with Smarttwigs, I was able to build and enhance several services for Props, such as refactoring the entire
codebase to follow RESTful conventions and building new functionalities such as a leaderboard system for Props given
in a particular team and allowing users to see if they have similar teams to one another.

I absolutely enjoyed working in the backend as its a crucial part in building the functionality of the app, but I would
have also worked in React Native to build the mobile app for Props. 

# Using React Native
I would also work in part with the front-end team to build Props. I would work with a small team of developers and
a product manager in charge of keeping track of our progress in the app. In terms of learning anything new, I only
learned a few concepts needed from React Native, since it is essentially React but with components that allow you
to build your app onto iOS, Android, and other native platforms.

I would work on the functionality of many screens, such as the sign up screen, which would have many import features
such as social logins and creating the user in the back-end and editing your profile.
| Sign Up                                             | Edit Profile                                            |
| :---:                                               | :---:                                                   |
| ![Sign Up Screen for Props](${Images.propsSignUp})  | ![Edit Profile for Props](${Images.propsEditProfile})   |

More importantly, I also worked on the screen that allowed in-app purchases for the subscriptions. 
| Props Subscriptions                             |
| :---:                                           | 
| ![Subscriptions for Props](${Images.propsIAP})  |

However, as a result of Apple taking a cut of in-app purchases, a website was built to process payments of the subscription that
a user wanted to purchase. A user would be allowed to go to the website, login, and choose a subscription of their
choice.
![Props Website](${Images.propsWebsite})

Now, making the front-end screens was relatively simple, but making the actual endpoint for processing purchases was
much more difficult as we had to account for important fields needed when processing a payment of a subscription. I
would use Stripe's API to account for payments made through the web and store relevant information into the database.

Overall though, I learned a lot of fundamental knowledge in terms of front-end, back-end, and databases.

Once development with Props was finished, I decided to apply my knowledge to the next project I worked on with
Smarttwigs — [Benev.](../benev)
`

export const benevMarkdown = `
# Benev
![Benev](${Images.benevLogo})

The next project that I would work on with Smarttwigs was Benev. A platform that is dedicated to connecting brands,
non-profits, and influencers to promoting social change.

In case you missed it, the previous project I worked on with Smarttwigs was [Props.](../props) 

I would use my learned knowledge from Props and apply it to the Benev website.

Now, the mobile app for Benev was in development, but my task was to build a responsive website from scratch. 
I would also be the only developer working on the website, so I decided to develop React-Redux website that 
utilized Styled Components, which would make it really use for future developers to use once I set the foundation
for the project.

The initial screen of the website would allow users to sign up or login into their account, it has wonderful, sleek
animations that modernizes the experience to the user, which can be seen in the GIF below.

![Benev Sign Up Flow](${Images.benevSignUpFlow})

## Benev Subscriptions Carousel
The other important aspect of the website is that I would work on allowing users to purchase subscription plans from
the website.
![Benev Subscriptions Carousel](${Images.benevPayments})

The UI to the website heavily resembles the design of Props, but the code in Props would only allow for the carousel
to have three plans. As a result, I had to refactor the existing code to allow for the carousel to allow any number of
card elements and as well making it a component to allow for easy changes in the future. As a result, the following
code was made possible: 

\`\`\`tsx
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
            <PlanCard planJson={businessPlans.entrepreneurLite}/>
            <PlanCard planJson={businessPlans.premium}/>
            <PlanCard planJson={businessPlans.enterprise}/>
          </Carousel>
        );
      case 'School':
        return (
          <Carousel planType={planType} setPlanType={setPlanType} key={planType}>
            <PlanCard planJson={schoolPlans.premiere}/>
            <PlanCard planJson={schoolPlans.elite}/>
            <PlanCard planJson={schoolPlans.superStar}/>
          </Carousel>
        );
      case 'Family':
        return (
          <Carousel planType={planType} setPlanType={setPlanType} key={planType}>
            <PlanCard planJson={familyPlans.familyPlan}/>
          </Carousel>
        )
    }

    return <PlanCard planJson={familyPlans.familyPlan}/>
  }

  return (
    <>
      <ChoosePlansNavBar/>

      <ChoosePlansContainer>
        <ChoosePlansHeadersContainer>
          <ChoosePlansHeader>BENEV</ChoosePlansHeader>
          <ChoosePlansSubText>ORGANIZATION PLANS</ChoosePlansSubText>
        </ChoosePlansHeadersContainer>

        {showPlans(planType)}
      </ChoosePlansContainer>
    </>
  )
}
\`\`\`

As shown above, the code is simplified with the help of styled-components and the generalization of components such
as PlanCard and Carousel. Not only that, but instead of specifying multiple props to a component, a JSON object with
all the predefined fields are passed to the component, which makes it extremely easy to read the code and make changes.

## Benev Checkout
However, that's not the only thing, as I would get Stripe's Payment Element to work on the website, which required
me to change things both in the front-end and back-end.

The following is the result of the checkout screen when choosing a subscription plan from the carousel.
![Benev Checkout](${Images.benevCheckout})

All in all, I created the Benev website with the cleanest code possible to allow future developers to easily work
on the website and not be confused by the conventions set forth by me.
 
The internship was an amazing experience and my next exciting opportunity was getting a position at PGIM as a 
Software Engineer Intern!

Thanks for reading and feel free to read more about my [other projects!](../../#projects)
`

export const threeJSSortingVisualizerMarkdown = `
# Building a 3D Sorting Visualizer using React and Three.js
![3D Sorting Visualizer Website](${Images.threeJSSortingVisualizer})

Hey! So, this is one of the projects made in my Computer Graphics class at NJCU. We were allowed to use any
technologies as long as it incorporated terminology within Computer Graphics.

Now, this sorting visualizer was extremely easy to implement because I already implemented the sorting visualizer in
a [previous project!](../sorting-visualizer)

As a result, most of the logic stayed the same and I only had to apply the terminology from Computer Graphics and
Three.js within my project.

I would have to focus on concepts such as shadows, meshes, materials, and camera movement.

I was successfully able to implement a sorting visualizer that allowed you to move using the AWSD keys, which
can be seen in the GIF below.
![3D Sorting Visualizer Demonstration](${Images.threeJSSortingVisualizerLive})

Thanks for reading and feel free to read more about my [other projects!](../../#projects)

## Respective Links
- [3D Sorting Visualizer Website](https://eduardovidals.github.io/3DSortingVisualizer)
`

export const solarSystemMarkdown = `
# Building a Solar System using React and Three.js 
![Solar System Website](${Images.solarSystem})

Hey! So, this is one of the projects made in my Computer Graphics class at NJCU. We were allowed to use any
technologies as long as it incorporated terminology within Computer Graphics.

## React & Three.js
Now, I chose to use React & Three.js because the underlying concepts are already implemented in Three.js, but when
React is used, it simplifies the code into something that is easily understandable, for example, here's the final code
of the Solar System.

\`\`\`jsx
function App() {
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})
  return (
    <div id={"app"}>
      <Canvas camera={{position: [-1500, 550, 120], fov: 60, far: 100000}}>
        <Stars/>
        <Sun/>
        <Planets planetData={planetData} zoomToView={(focusRef) => {
          setZoom(!zoom);
          setFocus(focusRef);
        }}/>
        <Lights/>
        <FPSControls/>
        {/* <Controls zoom={zoom} focus={focus} /> */}
      </Canvas>
    </div>
  );
}
\`\`\`

The code is very simple and easy to understand, but the underlying code would use several mathematical concepts,
such as having stars moving within space and the ecliptics for each planet. We would also learn concepts such as
texturing, rotations, scaling, shadows, and camera movement.

This project was very small but I was able to grasp a good amount of fundamentals from Computer Graphics by creating
this Solar System with React & Three.js.

Below is a GIF of moving around space in the solar system.
![Solar System Demonstration](${Images.solarSystemLive}) 

Thanks for reading and feel free to read more about my [other projects!](../../#projects)

## Respective Links
- [Solar System Website](https://eduardovidals.github.io/SolarSystem)
`
