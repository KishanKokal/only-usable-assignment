/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("text overlaps", () => {
  it("desktop", () => {
    cy.visit("http://localhost:5173");
    cy.viewport(1200, 800);
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
            return false;
          }
        }
        return true;
      });

      expect(noOverlap).to.be.true;
    };

    cy.get("p, h1, h2, h3, h4, h5, h6, a").then((allTextElements) => {
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
  });

  it("tablet", () => {
    cy.visit("http://localhost:5173");
    cy.viewport(820, 1180);
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
            return false;
          }
        }
        return true;
      });

      expect(noOverlap).to.be.true;
    };

    cy.get("p, h1, h2, h3, h4, h5, h6, a").then((allTextElements) => {
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
  });

  it("mobile", () => {
    cy.visit("http://localhost:5173");
    cy.viewport(390, 844);
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
            return false;
          }
        }
        return true;
      });

      expect(noOverlap).to.be.true;
    };

    cy.get("p, h1, h2, h3, h4, h5, h6, a").then((allTextElements) => {
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
  });
});

describe("unscrollable text", () => {
  it("desktop", () => {
    cy.visit("http://localhost:5173");
    cy.viewport(1200, 800);

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
  });

  it("tablet", () => {
    cy.visit("http://localhost:5173");
    cy.viewport(820, 1180);

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
  });

  it("mobile", () => {
    cy.visit("http://localhost:5173");
    cy.viewport(390, 844);

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
  });
});
