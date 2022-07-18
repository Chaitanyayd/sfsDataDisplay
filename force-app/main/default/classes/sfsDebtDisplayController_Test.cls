@isTest
public class sfsDebtDisplayController_Test {
  @isTest
  private static void fetchDataSuccess() {
    Test.startTest();
    Test.setMock(HttpCalloutMock.class, new sfsCalloutMock(true)); // mock with response = 200
    String data = sfsDebtDisplayController.fetchData();
    System.assertEquals('[{ "id": 1, "creditorName": "CBNA", "firstName": "Suman", "lastName": "Tester79", "minPaymentPercentage": 2.00, "balance": 1363.00 }, { "id": 2, "creditorName": "AMEX", "firstName": "Suman", "lastName": "Tester79", "minPaymentPercentage": 2.00, "balance": 2763.00 }]', data);
    Test.stoptest();
  }

  @isTest
  private static void fetchDataFailure() {
    Test.startTest();
    Test.setMock(HttpCalloutMock.class, new sfsCalloutMock(false)); // mock with response = 400
    try {
        sfsDebtDisplayController.fetchData();
    } catch (Exception ex) {
        System.assertEquals('Script-thrown exception', ex.getMessage());
    }
    Test.stoptest();
  }
}
