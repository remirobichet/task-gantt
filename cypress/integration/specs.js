describe("Visual", () => {
  it("display h1 title", () => {
    cy.visit("/");
    cy.contains("h1", "task-gantt");
  });

  it("underligne active page", () => {
    cy.visit("/about");
    cy.get(".nuxt-link-exact-active")
      .should("have.css", "text-decoration")
      .and("match", /underline/);
  });
});

describe("Page changing", () => {
  it("check page", () => {
    cy.visit("/");
    cy.url().should("include", "/");
  });

  it("go to about page", () => {
    cy.get("a[href='/about']").click();
    cy.url().should("include", "/about");
  });
});

describe("Interation", () => {
  it("gantt not visible", () => {
    cy.visit("/");
    cy.get("#gantt").should("not.be.visible");
  });

  it("gantt visible", () => {
    cy.visit("/");
    cy.get(".card-header ul li:last-of-type a").click();
    cy.get("#gantt").should("be.visible");
  });
});

describe("Data manipulation", () => {
  it("equals 30%", () => {
    cy.visit("/");
    cy.contains("table tbody tr:first-of-type td:last-of-type", "30%");
  });

  it("not equals 30%", () => {
    cy.visit("/");
    cy.get(".card-header ul li:last-of-type a").click();

    // https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/testing-dom__hover-hidden-elements 
    // Doesn't work atm, can't get Cypress to work to show le small button to trigger it
    cy.get(".bar-wrapper")
      .first()
      .invoke("show")
      .click();
    cy.get(".handle.progress")
      .first()
      .should("be.visible")
      .trigger("mousedown", { button: 0 }, { force: true })
      .trigger("mousemove", 200, 0, { force: true })
      .trigger("mouseup", { force: true });
    cy.contains("table tbody tr:first-of-type td:last-of-type", "50%");
  });
});
