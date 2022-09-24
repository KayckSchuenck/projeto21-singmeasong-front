import { faker } from "@faker-js/faker";

describe("Add song recommendation", () => {
  it("should add a song", () => {
    const name = faker.music.songName();
    cy.visit("localhost:3000");
    cy.get("#name").type(name);
    cy.get("#link").type("https://www.youtube.com/watch?v=ZKecJ1Dk-WA");
    cy.get("#submit").click();
    cy.contains(name).get("article").should("exist");
  });
});

describe("Upvote a recommendation", () => {
  it("should sucessfully upvote a recommendation", () => {
    const name = faker.music.songName();
    cy.visit("localhost:3000");
    cy.get("#name").type(name);
    cy.get("#link").type("https://www.youtube.com/watch?v=ZKecJ1Dk-WA");
    cy.intercept("GET", "/recommendations").as("getPosts");
    cy.get("#submit").click();
    cy.wait("@getPosts");
    cy.contains(name).get("#upvote").click();
  });
});

describe("Downvote a recommendation", () => {
  it("should sucessfully downvote a recommendation", () => {
    const name = faker.music.songName();
    cy.visit("localhost:3000");
    cy.get("#name").type(name);
    cy.get("#link").type("https://www.youtube.com/watch?v=ZKecJ1Dk-WA");
    cy.intercept("GET", "/recommendations").as("getRecommendations");
    cy.get("#submit").click();
    cy.wait("@getRecommendations");
    cy.contains(name).get("#downvote").click();
  });
});

describe("Downvote a recommendation until it is removed", () => {
  it("should sucessfully remove a recommendation", () => {
    const name = faker.music.songName();
    cy.visit("localhost:3000");
    cy.get("#name").type(name);
    cy.get("#link").type("https://www.youtube.com/watch?v=ZKecJ1Dk-WA");
    cy.intercept("GET", "/recommendations").as("getRecommendations");
    cy.get("#submit").click();
    cy.wait("@getRecommendations");
    cy.contains(name)
      .get("#downvote")
      .click()
      .click()
      .click()
      .click()
      .click()
      .click();

    cy.contains(name).should("not.exist");
  });
});
