describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  })

  it("should visit root", () => {
  });

  it("should visit and then go to Tuesdays schedule", () => {
    cy.contains("li", "Tuesday").click().should("have.class", "day-list__item--selected"); //contains can have multiple params after comma. We are saying contains list and text tuesday and are a looking for a dom liek this
  });
});