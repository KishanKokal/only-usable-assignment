/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("Text Overlaps", () => {
  const runTest = (viewportWidth, viewportHeight) => {
    cy.visit("http://localhost:5173");
    cy.viewport(viewportWidth, viewportHeight);

    const checkTextOverlap = (elements) => {
      const noOverlap = elements.toArray().every((element, index, array) => {
        const rect1 = element.getBoundingClientRect();

        for (let i = index + 1; i < array.length; i++) {
          const rect2 = array[i].getBoundingClientRect();

          if (
            rect1.x + element.clientWidth >= rect2.x &&
            rect1.x <= rect2.x + array[i].clientWidth &&
            rect1.y + element.clientHeight >= rect2.y &&
            rect1.y <= rect2.y + array[i].clientHeight
          ) {
            cy.log(`${element}, ${array[i]}`);
            return false;
          }
        }
        return true;
      });

      expect(noOverlap).to.be.true;
    };

    cy.get(".card > p").then((allTextElements) => {
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
