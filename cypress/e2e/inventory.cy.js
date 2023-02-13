describe("Testing inventory component", () => {
  it("adds an item to the inventory", () => {
    cy.visit("http://127.0.0.1:5501/index.html");
    cy.get("#itemName").type("Test1");
    cy.wait(500);
    cy.get("#itemQuantity").type("20");
    cy.wait(500);

    cy.get("#itemPrice").type("100");
    cy.wait(500);

    expect(localStorage.getItem("inventory")).to.be.null;

    cy.get("button")
      .contains("Add Item")
      .click()
      .then(() =>
        expect(localStorage.getItem("inventory")).to.eq(
          `[{"name":"Test1","quantity":"20","price":"100"}]`
        )
      );
    // expect(localStorage.getItem('inventory')).to.have.lengthOf(1)
    // expect(localStorage.getItem('inventory')).to.eq(`[{"name":"Test1","quantity":"20","price":"100"}]`);
    // expect(localStorage.getItem('inventory')).to.be.null;
  });
  it("adds and then edits an item in the inventory", () => {
    cy.visit("http://127.0.0.1:5501/index.html");
    cy.wait(500);

    cy.get("#itemName").type("Test1");
    cy.wait(500);

    cy.get('input[name="itemQuantity"]').type("20");
    cy.wait(500);

    cy.get("#itemPrice").type("100");
    cy.wait(500);

    cy.get("button").contains("Add Item").click();
    cy.wait(500);

    cy.get("button").contains("Edit").click();
    cy.get("#itemName").clear().type("Test101");
    cy.get("#itemQuantity").clear().type("201");
    cy.get("#itemPrice").clear().type("101");
    cy.get("button").contains("Add Item").click();
  });

  it("adds and then deletes an item in the inventory", () => {
    cy.visit("http://127.0.0.1:5501/index.html");
    cy.get("#itemName").type("Test1");
    cy.get("#itemQuantity").type("20");
    cy.get("#itemPrice").type("100");
    cy.get("button").contains("Add Item").click();
    cy.get("button").contains("Delete").click();
  });
});
