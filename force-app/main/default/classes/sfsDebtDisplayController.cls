public with sharing class sfsDebtDisplayController {
  @AuraEnabled
  public static string fetchData() {
    try {
      HttpRequest req = new HttpRequest();
      req.setEndpoint('callout:SFS_Data');
      req.setMethod('GET');
      Http http = new Http();
      HTTPResponse res = http.send(req);
      System.debug(res.getBody());
      if (res.getStatus() == 'OK' && res.getStatusCode() == 200) {
        return res.getBody();
      } else {
        throw new customException('Something is Wrong with the Server');
      }
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  public class customException extends Exception {
  }
}