import { api, LightningElement,track} from 'lwc';
import getSubredditList1 from '@salesforce/apex/searchSubredditController.getSubredditList';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
 
export default class LwcCustomModal extends LightningElement {

    @track customFormModal = false; 
    @api recordId;
	objectRecordId = 'SubReddit__c';
    @track subredditRecord;
    searchValue = '';

    
    customShowModalPopup() { 
        this.customFormModal = true;
    }
 
    customHideModalPopup() {    
    this.customFormModal = false;
    }
    
    handleSubmit(event) {
		
    }
    handleSuccess( event ) {
        this.objectRecordId = event.detail.id;
        console.log( 'Record Id is ' + event.detail.id );
        this.dispatchEvent(
            new ShowToastEvent( {
                title: '',
                message: 'A subreddit record has been created',
                variant: 'success',
                mode: 'sticky'
            } )
        );
        this.isModalOpen = false;
    }

    searchKeyword(event) {
        this.searchValue = event.target.value;
    }
 
    // call apex method on button click 
    async handleSearchKeyword(event) {
        this.searchValue = event.target.value;
             if (this.searchValue !== '') {
                this.subredditRecord = await getSubredditList1({ searchKey: this.searchValue });
            }
        }
    }
