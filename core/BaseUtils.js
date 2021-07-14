const { element, browser, by } = require("protractor");
var Data = require("../testdata.js");

class BaseUtils {
  findElement(type, locator) {
    if (type == "id") return by.id(locator);
    if (type == "name") return by.name(locator);
    if (type == "tagName") return by.tagName(locator);
    if (type == "css") return by.css(locator);
    if (type == "buttonText") return by.buttonText(locator);
    if (type == "model") return by.model(locator);
    if (type == "binding") return by.binding(locator);
  }

  findElementByCssContainingText(webelement, searchText) {
    return element(by.cssContainingText(webelement, searchText));
  }

  clickAndWait(webelement) {
    return element(webelement).click();
  }
  
  navigateToURL(url) {
    return browser.get(url);
  }

  clickAndClearAndType(webelement, text) {
    this.clickAndWait(webelement);
    element(webelement).clear();
    return element(webelement).sendKeys(text);
  }

  checkIfWebPageIsAngular() {
    if (!Data.Project_Properties.isAngular)
      browser.waitForAngularEnabled(false).then(() => {
        console.log("This is a non-angular website");
      });
  }
}

module.exports = new BaseUtils();
