public class LinenSort {
    @AuraEnabled
    public static List <Linen__c > fetchLinen() {
        return [ SELECT Name, Type__c,SubType__c,Image__c,Price__c  FROM Linen__c order by Type__c];
    }
    @AuraEnabled
    public static List <Linen__c> fetchLinensAsPerType(String compName) {
        return [ SELECT Name, Type__c,SubType__c,Image__c,Price__c  FROM Linen__c Where Type__c = :compName];
    }
    @AuraEnabled
    public static List <Linen__c> fetchLinensAsPerSubType(String compName) {
        return [ SELECT Name, Type__c,SubType__c,Image__c,Price__c  FROM Linen__c Where SubType__c = :compName];
    }
}
