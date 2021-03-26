### MIT 6.00 Simulating Virus Population Dynamics

## An interactive implementation of Problem Set 12 the MIT 6.00 course Introduction to computer science and programming

# Problem description
Here's the beginning of the [orginal problem description](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-00-introduction-to-computer-science-and-programming-fall-2008/assignments/pset12.pdf): "There are medications for the treatment of infection by viruses; however, viruses may become resistant to one drug, sometimes to multiple drugs due to mutations. Despite not having gone to medical school (or maybe because of this), you can still decide on a good drug treatment regimen by observing how the virus population responds to the introduction of different drugs. We have been unable to reserve a bio lab for 6.00, so you will have to simulate the virus population dynamics with Python and reach conclusions based on the simulation results."
I decided to write an implementation of this simulation using TypeScript rather than Python and to use patterns from functional programming rather than the class based approach of the MIT course. All the datastructures are immutable and each time a virus or a patient changes a new version is created. The simulation uses closures for information hiding, the ramda library for its map and mapAccum functions and pure functions whenever possible. This approach leads to a more maintable code base and less mental overload, compared to an object oriented approach that uses shared mutable state.
# Check the live version
Click the link to see the [deployment of the code on Vercel](https://virus-simulation-next.vercel.app/)
# Install on your local machine
1. Clone the repo
```
git clone https://github.com/heinerbehrends/virus-simulation-next.git
```
2. Install the dependencies
```
yarn install
```
or 
```
npm install
```
3. Start the development invironment
```
yarn dev
```
or 
```
npm run dev
```
# Technologies used
This project makes use of the [Nextjs](https://nextjs.org/) framework. It's written completely in [TypeScript](https://www.typescriptlang.org/) and makes use of [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/) for unit tests. The frontend code uses React hooks and React-Query for state management and Recharts for data visualisation. The algorithms make use of the pure functions and the map and mapAccum functions from the [ramda library.](https://ramdajs.com/).