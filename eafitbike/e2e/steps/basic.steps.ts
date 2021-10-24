import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from 'chai';
import { browser } from 'protractor';

let siteTitle: string;

Given('I open the browser and go to the site page', async function () {
  await browser.get(browser.baseUrl);
});

When('I check the title of the page', async function () {
  siteTitle = await browser.getTitle();
});

Then('the title should be EAFIT bike', function () {
  expect(siteTitle).to.equal('EAFIT Bike');
});