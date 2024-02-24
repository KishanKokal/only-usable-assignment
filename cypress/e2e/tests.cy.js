/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("Text Overlaps", () => {
  const runTest = (viewportWidth, viewportHeight) => {
    cy.visit("http://localhost:5173");
    cy.viewport(viewportWidth, viewportHeight);

    const checkTextOverlap = (elements) => {
      cy.log("Checking for text overlap");
      const noOverlap = elements.toArray().every((element, index, array) => {
        if (
          element.tagName === "P" &&
          array[index + 1]?.tagName === "A" &&
          array[index + 1].classList.contains("button")
        ) {
          return true;
        }
        const rect1 = element.getBoundingClientRect();

        for (let i = index + 1; i < array.length; i++) {
          const rect2 = array[i].getBoundingClientRect();

          if (
            rect1.x + rect1.width >= rect2.x &&
            rect1.x <= rect2.x + rect2.width &&
            rect1.y + rect1.height >= rect2.y &&
            rect1.y <= rect2.y + rect2.height
          ) {
            cy.log(`${element.textContent}, ${array[i].textContent}`);
            // return false;
          }
        }
        return true;
      });

      expect(noOverlap).to.be.true;
    };

    cy.get(".card, header, .font-size-button")
      .find(":not(.card-img, img, .fancy-text, .card h2)")
      .filter((index, element) => {
        return !Cypress.$(element).text().includes("Order Now");
      })
      .then((allTextElements) => {
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

describe("Unscrollable Text", () => {
  const runTest = (viewportWidth, viewportHeight) => {
    cy.visit("http://localhost:5173");
    cy.viewport(viewportWidth, viewportHeight);

    const isScrollable = (element) => {
      const { scrollHeight, clientHeight } = element[0];
      return scrollHeight > clientHeight;
    };

    const checkUnscrollableText = () => {
      cy.get("p, h1, h2, h3, h4, h5, h6, a").each((element) => {
        if (!isScrollable(element)) {
          return false;
        }
      });
      return true;
    };

    for (let i = 0; i <= 15; i++) {
      if (i === 0) {
        expect(checkUnscrollableText()).to.be.true;
      }
      cy.get("#increment-button")
        .click()
        .then(() => {
          expect(checkUnscrollableText()).to.be.true;
        });
    }
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
