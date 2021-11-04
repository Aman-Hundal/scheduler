describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  })

  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();
    
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    
    cy.get("[alt='Sylvia Palmer']").click().get("button").contains("Save").click();
    
    cy.contains(".appointment__card--show", "Lydia Miller-Jones").contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.contains(".appointment__card--show", "Archie Cohen").get("[alt='Edit'").click({force: true});

    cy.get("[data-testid=student-name-input]").clear().type("Amaneet Hundal");

    cy.get("[alt='Tori Malcolm']").click().get("button").contains("Save").click();
    
    cy.contains(".appointment__card--show", "Amaneet Hundal").contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.contains(".appointment__card--show", "Archie Cohen").get("[alt='Delete'").click({force: true});

    cy.get("button").contains("Confirm").click();

    cy.contains("Deleting").should("exist");

    cy.contains("Deleting").should("not.exist");
    
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});