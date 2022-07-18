public with sharing class sfsDebtDisplayController {
  @AuraEnabled(cacheable=true)
  public static string fetchData() {
    try {
      HttpRequest req = new HttpRequest();
      req.setEndpoint('callout:SFS_Data');
      req.setMethod('GET');
      HTTP http = new HTTP();
      HTTPResponse res = http.send(req);
      if (res.getStatus() == 'OK' && res.getStatusCode() == 200) {
        return res.getBody();
      } else {
        throw new AuraHandledException('Something is Wrong with the Server');
      }
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
