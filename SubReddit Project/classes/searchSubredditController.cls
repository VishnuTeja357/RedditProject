public with sharing class searchSubredditController {
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
        System.debug('subredditList :'+subredditList);
        return subredditList;
    }
    @AuraEnabled
    public static list<SubReddit__c> defaultRecords() {
        list<SubReddit__c> subredditList = new list<SubReddit__c>();
        for(SubReddit__c subredditObj : [Select id,Name,Description__c, No_Of_Downvotes__c, No_Of_Upvotes__c
                            From SubReddit__c ORDER BY No_Of_Upvotes__c DESC LIMIT 10]){
        subredditList.add(subredditObj);
        }
        System.debug('subredditList :'+subredditList);
        return subredditList;
    }
    @AuraEnabled
    public static list<Post__c> getPostList(string searchKey) {
        string searchKeyword = '%' + searchKey + '%';
        list<Post__c> getPostList = new list<Post__c>();
        for(Post__c postObj : [Select id,Name,Body__c,No_Of_Comments__c,No_Of_Downvotes__c,No_Of_Upvotes__c,SubReddit__c,Title__c
                            From Post__c
                            WHERE name LIKE : searchKeyword]){
        getPostList.add(postObj);
        }
        
         if(getPostList.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
        System.debug('getPostList :'+getPostList);
        return getPostList;
    }
    @AuraEnabled
    public static list<Post__c> defaultRecordsForPost() {
        list<Post__c> postListdefault = new list<Post__c>();
        for(Post__c subredditObj : [Select id,Name,Body__c,No_Of_Comments__c,
                                    No_Of_Downvotes__c,No_Of_Upvotes__c,SubReddit__c,Title__c,SubReddit__r.Name
                                    From Post__c ORDER BY No_Of_Upvotes__c DESC LIMIT 10]){
        postListdefault.add(subredditObj);
        }
        System.debug('postListdefault :'+postListdefault);
        return postListdefault;
    } 
}