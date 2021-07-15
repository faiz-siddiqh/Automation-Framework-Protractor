
const using = require("jasmine-data-provider");
const { browser } = require("protractor");
var BrowserAction = require("./core/BaseUtils");
var Data = require("./Testdata.js"); //fetching data from testdata js file

describe("Test Angular webpages", function () {
  beforeEach(() => {
    browser.manage().window().maximize();
  });

  afterEach(() => {
    //perform some operation
  });

  beforeAll(() => {
    //perform some operation
  });

  afterAll(() => {
    //perform some operation
  });

  it("should open the given website", async () => {
    browser.manage().window().maximize();
    BrowserAction.navigateToURL(Data.Project_Properties.baseUrl).then(() => {
      console.log("On Angular js browser");
    });
    BrowserAction.clickAndWait(BrowserAction.findElement("id", "drop1")).then(
      () => {
        console.log("clicked on Quick Start");
      }
    );
  });

  using(Data.TestData, function (data, description) {
    it(
      "Should open the practice page and perform all the operations and submit the form -" +
        description,
      function () {
        BrowserAction.navigateToURL(Data.Project_Properties.practiceUrl);
        BrowserAction.clickAndClearAndType(
          BrowserAction.findElement("name", "name"),
          data.name
        ).then(function () {
          console.log("Entering the name");
        });
        BrowserAction.clickAndClearAndType(
          BrowserAction.findElement("name", "email"),
          data.email
        ).then(function () {
          console.log("Entering the email");
        });
        BrowserAction.clickAndClearAndType(
          BrowserAction.findElement("id", "exampleInputPassword1"),
          data.password
        ).then(function () {
          console.log("Entering the password");
        });
        BrowserAction.clickAndWait(
          BrowserAction.findElement("id", "exampleCheck1")
        ).then(function () {
          console.log("Click on the checkBox");
        });

        // element(by.id("exampleFormControlSelect1"))
        //   .all(by.tagName("option"))
        //   .each(function (item) {
        //     item.getText().then(function (text) {
        //       if (text == "Female") {
        //         item.click();
        //         console.log("selecting female");
        //       }
        //     });
        //   });
        BrowserAction.clickAndWait(
          BrowserAction.findElementByCssContainingText(
            "[id='exampleFormControlSelect1'] option",
            "Female"
          )
        ).then(function () {
          console.log("Click on the checkBox");
        });
        BrowserAction.clickAndWait(
          BrowserAction.findElement("buttonText", "Submit")
        ).then(function () {
          console.log("Click on the submit");
        });

        element(by.className("alert alert-success alert-dismissible"))
          .getText()
          .then(function (data) {
            console.log(data);
           // verify/Assertions using jasmine framework
            expect("Success! The Form has been submitted successfully!.", data);
          });
      }
    );
  });
});