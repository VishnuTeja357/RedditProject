public with sharing class searchSubreddit {
    @AuraEnabled
    public static list<SubReddit__c> getSubredditList(string searchKey) {
        string searchKeyword = '%' + searchKey + '%';
        list<SubReddit__c> subredditList = new list<SubReddit__c>();
        for(SubReddit__c subredditObj : [Select id,Name,Description__c, No_Of_Downvotes__c, No_Of_Upvotes__c
                            From SubReddit__c
                            WHERE name LIKE : searchKeyword]){
        subredditList.add(subredditObj);
        }
        
         if(subredditList.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return subredditList;
    }
}