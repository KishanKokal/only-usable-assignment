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
            rect1.x + rect1.width >= rect2.x &&
            rect1.x <= rect2.x + rect2.width &&
            rect1.y + rect1.height >= rect2.y &&
            rect1.y <= rect2.y + rect2.height
          ) {
            // cy.log("===========");
            // cy.log(`${rect1.x + rect1.width} >= ${rect2.x}`);
            // cy.log(`${rect1.x} <= ${rect2.x + rect2.width}`);
            // cy.log(`${rect1.y + rect1.height} >= ${rect2.y}`);
            // cy.log(`${rect1.y} <= ${rect2.y + rect2.height}`);
            return false;
          }
        }
        return true;
      });

      expect(noOverlap).to.be.true;
    };

    cy.get(".card").then((allTextElements) => {
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
      const isUnscrollable = elements.toArray().every((element) => {
        cy.log(element);
        if (
          element.tagName === "P" &&
          !element.classList.contains("font-size-button")
        ) {
          return !(
            element.scrollHeight >= element.clientHeight &&
            window.getComputedStyle(element).getPropertyValue("overflow-y") ===
              "scroll"
          );
        } else {
          return !(
            element.scrollWidth >= element.clientWidth &&
            window.getComputedStyle(element).getPropertyValue("overflow-x") ===
              "scroll"
          );
        }
      });
      expect(isUnscrollable).to.be.false;
    };

    const clickIncrementButton = () => {
      return cy.get("#increment-button").click();
    };

    cy.get("p, .card, header, .font-size-button")
      .filter(":not(.button)")
      .then((allTextElements) => {
        const iterate = (i) => {
          if (i <= 15) {
            checkScrollableText(allTextElements);
            clickIncrementButton().then(() => iterate(i + 1));
          }
        };

        iterate(1);
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
