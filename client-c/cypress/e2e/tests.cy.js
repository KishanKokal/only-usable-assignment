/* eslint-disable no-undef */
/// <reference types="cypress" />

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
          return !(element.scrollHeight >= element.clientHeight && window.getComputedStyle(element).getPropertyValue("overflow-y") === "scroll");
        } else {
          return !(element.scrollWidth >= element.clientWidth && window.getComputedStyle(element).getPropertyValue("overflow-x") === "scroll");
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
