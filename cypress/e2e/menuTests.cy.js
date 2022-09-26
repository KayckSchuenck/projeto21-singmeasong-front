import { faker } from "@faker-js/faker";

describe("Get random song", () => {
  it("clicking the random button goes to /random route and shows a random recommendation", () => {
    const name = faker.music.songName();
    cy.visit("localhost:3000");
    cy.get("#name").type(name);
    cy.get("#link").type("https://www.youtube.com/watch?v=ZKecJ1Dk-WA");
    cy.intercept("GET", "/recommendations").as("getPosts");
    cy.get("#submit").click();
    cy.wait("@getPosts");
    cy.contains("Random").click();
    cy.url().should("be.equal", "http://localhost:3000/random");
    cy.get("article").should("have.length", 1);
  });
});

describe("Get top songs", () => {
  it("clicking the top button goes to /top route and shows most upvoted recommendations", () => {
    const name = faker.music.songName();
    cy.visit("localhost:3000");
    cy.get("#name").type(name);
    cy.get("#link").type("https://www.youtube.com/watch?v=ZKecJ1Dk-WA");
    cy.get("#submit").click();
    cy.contains("Top").click();
    cy.url().should("be.equal", "http://localhost:3000/top");
    cy.get("article").should("have.length.greaterThan", 0);
  });
});

describe("Get all songs", () => {
  it("clicking the home button goes to / route and shows all recommendations", () => {
    cy.visit("localhost:3000/random");
    cy.contains("Home").click();
    cy.url().should("be.equal", "http://localhost:3000/");
    cy.get("#name").should("exist");
    cy.get("#link").should("exist");
    cy.get("#submit").should("exist");
  });
});
