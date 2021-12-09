describe("Form submission", () => {
    it("submits a job", () => {
        cy.visit("/");

        cy.get("#job-listings li").should("have.length.gte", 4);

        const formFields = [
            "input[name=title]",
            "input[name=pay]",
            "textarea[name=description]"
        ];

        formFields.forEach(formField => {
            cy.get(formField).should("be.empty");
        });

        cy.get("input[name=title]").type("Job Title");
        cy.get("input[name=pay]").type("Pay");
        cy.get("textarea[name=description]").type("Description");

        cy.get("input[type=submit]").click();

        formFields.forEach(formField => {
            cy.get(formField).should("be.empty");
        });

        cy.get("#job-listings li").eq(0).as("firstListing");
        cy.get("@firstListing").find("h4").should("have.text", "Job Title");
        cy.get("@firstListing").find("small").eq(0).should("have.text", "Pay");
        cy.get("@firstListing").find("p").should("have.text", "Description");
        cy.get("@firstListing").find("small").eq(1).should("have.text", "0 dinos are interested in this job");
    });
});
