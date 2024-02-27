# Getting Started

- download or clone this repository

```
git clone https://github.com/KishanKokal/only-usable-assignment.git
```

- install the dependancies

```
npm install
```

- to run the application run

```
npm run dev
```

- to test the application

```
npm run test
```

# My approach to the problem

## To create a responsive webpage that supports the following screens

    - mobile
    - tablet
    - desktop

Added media queries for the different screens:

```
/* The default styling is built for Mobile (designed mobile-first) */
@media (min-width: 600px) /* Tablet */
@media (min-width: 1025px) /* Desktop */
```

## To create a font size zooming functionality that supports upto 15x zoom

- increase font size with "+" button
- decrease font size with "-" button
- buttons trigger handleSizeChange()
- handleSizeChange() updates the state variable

_/src/components/Home.jsx_

```
const handleSizeChange = (val) => {
    setSize((prevVal) => prevVal + val);
};
```

- the useEffect() updates CSS variable --base-size

_/src/components/Home.jsx_

```
useEffect(() => {
    let root = document.documentElement;
    root.style.setProperty("--base-size", `${1.2 * size}rem`);
}, [size]);
```

## To prevent any text from overlapping and make sure the text is scrollable

- Conducted manual testing on the app to identify instances of text overlap.
- Set the overflow properties of the text containers to scroll.

_/src/App.css_

```
header {
  overflow-x: scroll;
}

.card {
  overflow-x: scroll;
}

.card p {
  overflow-y: scroll;
}

.font-size-button {
  overflow-x: scroll;
}
```

## Automated tests to verify text overlaps and no un-scrollable text

- Explored integration testing for user interfaces and discovered the Cypress testing framework. I learned that this framework simulates human interaction by navigating to the app and engaging with it. We can then use assertions to check if the UI aligns with our expectations.

_/cypress/e2e/tests.cy.js_

```
describe("Text Overlaps", () => {
  const runTest = (viewportWidth, viewportHeight) => {

    // visit the application on port 5173
    cy.visit("http://localhost:5173");

    cy.viewport(viewportWidth, viewportHeight);

    const checkTextOverlap = (elements) => {

      // set noOverlap to true if, for every element in the array, overlp condition holds true
      const noOverlap = elements.toArray().every((element, index, array) => {
        const rect1 = element.getBoundingClientRect();

        // compare each element with every other element
        for (let i = index + 1; i < array.length; i++) {
          const rect2 = array[i].getBoundingClientRect();

          // check if the rect1 and rect2 overlap, if yes return false, else continue
          // ⚠️ Note: there's some problem with this formula, currently working on this

          if (
            rect1.x + rect1.width >= rect2.x &&
            rect1.x <= rect2.x + rect2.width &&
            rect1.y + rect1.height >= rect2.y &&
            rect1.y <= rect2.y + rect2.height
          ) {
            return false;
          }
        }
        return true;
      });

      // asserting
      expect(noOverlap).to.be.true;
    };

    // grab elements with the css selectors and pass these elements to check for overlap
    cy.get(".card > p, h2").then((allTextElements) => {
      for (let i = 0; i <= 15; i++) {
        if (i === 0) {
          checkTextOverlap(allTextElements);
        }
        cy.get("#increment-button")
          .click()
          .then(() => {
            checkTextOverlap(allTextElements);
          });
      }
    });
  };

  it("Desktop", () => {
    runTest(1200, 800);
  });

  it("Tablet", () => {
    runTest(820, 1180);
  });

  it("Mobile", () => {
    runTest(390, 844);
  });
});
```

_/cypress/e2e/tests.cy.js_

```
describe("Unscrollable Text", () => {
  const runTest = (viewportWidth, viewportHeight) => {

    // visit the application on port 5173
    cy.visit("http://localhost:5173");

    cy.viewport(viewportWidth, viewportHeight);

    const checkScrollableText = (elements) => {
      elements.each((index, element) => {
        if (
          element.tagName === "P" &&
          !element.classList.contains("font-size-button")
        ) {
          cy.wrap(element)
            .invoke("css", "overflow-y")
            .should("equal", "scroll");
        } else {
          cy.wrap(element)
            .invoke("css", "overflow-x")
            .should("equal", "scroll");
        }
      });
    };

    cy.get("p, .card, header, .font-size-button").then((allTextElements) => {
      for (let i = 1; i <= 15; i++) {
        if (i === 1) {
          checkScrollableText(allTextElements);
        }
        cy.get("#increment-button")
          .click()
          .then(() => {
            checkScrollableText(allTextElements);
          });
      }
    });
  };

  it("Desktop", () => {
    runTest(1200, 800);
  });

  it("Tablet", () => {
    runTest(820, 1180);
  });

  it("Mobile", () => {
    runTest(390, 844);
  });
});
```
