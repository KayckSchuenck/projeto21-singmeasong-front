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
    cy.get("article").should("have.length", 1);
  });
});

describe("Get top songs", () => {
  it("clicking the top button goes to /top route and shows most upvoted recommendations", () => {
    const name = faker.music.songName();
    const name2 = faker.music.songName();
    cy.visit("localhost:3000");
    cy.get("#name").type(name);
    cy.get("#link").type("https://www.youtube.com/watch?v=ZKecJ1Dk-WA");
    cy.get("#submit").click();
    cy.get("#name").type(name2);
    cy.get("#link").type("https://www.youtube.com/watch?v=ZKecJ1Dk-WA");
    cy.intercept("GET", "/recommendations").as("getPosts");
    cy.get("#submit").click();
    cy.wait("@getPosts");
    cy.contains("Top").click();
    cy.get("article").should("have.length.greaterThan", 1);
  });
});
