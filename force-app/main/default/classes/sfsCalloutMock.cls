@isTest
public class sfsCalloutMock implements HttpCalloutMock {
  Boolean isMockResponseSuccessful; // set by constructor, used to vary the mockresponse

  public sfsCalloutMock(Boolean isMockResponseSuccessful) {
    this.isMockResponseSuccessful = isMockResponseSuccessful;
  }

  public HttpResponse respond(HttpRequest rqst) {
    HttpResponse hResp = new HttpResponse();
    if (this.isMockResponseSuccessful) {
      hResp.setStatusCode(200);
      hResp.setStatus('OK');
      hResp.setBody(
        '[{ "id": 1, "creditorName": "CBNA", "firstName": "Suman", "lastName": "Tester79", "minPaymentPercentage": 2.00, "balance": 1363.00 }, { "id": 2, "creditorName": "AMEX", "firstName": "Suman", "lastName": "Tester79", "minPaymentPercentage": 2.00, "balance": 2763.00 }]'
      );
    } else {
      hResp.setStatusCode(400);
      hResp.setStatus('Bad request');
    }
    return hResp;
  }
}
