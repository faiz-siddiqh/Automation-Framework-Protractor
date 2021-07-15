const { element, browser, by } = require("protractor");
var Data = require("../testdata.js");
var fs = require("fs");

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

  findElements(type, locator) {
    if (type == "id") return element.all(by.id(locator));
    if (type == "name") return element.all(by.name(locator));
    if (type == "tagName") return element.all(by.tagName(locator));
    if (type == "css") return element.all(by.css(locator));
    if (type == "buttonText") return element.all(by.buttonText(locator));
    if (type == "model") return element.all(by.model(locator));
    if (type == "binding") return element.all(by.binding(locator));
  }

  findElementByCssContainingText(webelement, searchText) {
    return by.cssContainingText(webelement, searchText);
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

  isElementPresent(webelement) {
    return element(webelement).isElementPresent();
  }

  switchToNewWindow() {
    parentHandle = browser.getWindowHandle();

    browser.getAllWindowHandles().then((handles) => {
      handles.forEach((handle) => {
        if (handle != parentHandle)
          browser
            .switchTo()
            .window(handle)
            .then(() => {
              console.log("Switching to new Window");
            });
      });
    });
  }

  returnToParentWindow() {
    currentHandle = browser.getWindowHandle();

    browser.getAllWindowHandles().then((handles) => {
      handles.forEach((handle) => {
        if (handle == currentHandle)
          browser
            .switchTo()
            .window(handle)
            .then(() => {
              browser.close().then(() => {
                console.log("closing the child window");
              });
            });
        else parentHandle = handle;

        browser
          .switchTo()
          .window(parentHandle)
          .then(() => {
            console.log("Switching to Parent Window");
            //break;
          });
      });
    });
  }

  takeScreenshot(webelement) {
    element(webelement)
      .takeScreenshot()
      .then((png) => {
        this.writeScreenshot(png, "Screenshot");
        console.log("Capturing Screenshot");
      });
  }

  writeScreenshot(data, fileName) {
    fileName = new Date();
    var stream = fs.createWriteStream(fileName);
    stream.write(new Buffer(data, "base64"));
    stream.end();
  }

  navigateThroughPage(action) {
    switch (action) {
      case "back":
        browser
          .navigate()
          .back()
          .then(() => {
            console.log("navigating to previous page");
          });
        break;
      case "refresh":
        browser
          .navigate()
          .forward()
          .then(() => {
            console.log("navigating to forward page");
          });
        break;
      default:
        browser
          .navigate()
          .refresh()
          .then(() => {
            console.log("refreshing page");
          });
        break;
    }
  }

  dragAndDropELement(element1, element2) {
    return browser.actions().dragAndDrop(element1, element2).perform();
  }

  performSliderAction(xOffset, yOffset, element) {
    return browser
      .actions()
      .mouseMove(element)
      .mouseMove({ x: xOffset, y: yOffset })
      .doubleClick()
      .perform();
  }

  tapOnWebElement(webelement) {
    return browser.touchActions().tap(webelement).perform();
  }
  doubleTapOnWebElement(webelement) {
    return browser.touchActions().doubleTap(webelement).perform();
  }
}

module.exports = new BaseUtils();
