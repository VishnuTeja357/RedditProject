import { api, LightningElement,track} from 'lwc';
import getSubredditList1 from '@salesforce/apex/searchSubredditController.getSubredditList';
import defaultRecords1 from '@salesforce/apex/searchSubredditController.defaultRecords';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { getDataConnector } from 'lightning/analyticsWaveApi';
 
export default class LwcCustomModal extends LightningElement {

    @track customFormModal = false; 
    @api recordId;
	objectRecordId = 'SubReddit__c';
    @track subredditRecord;
    searchValue = '';
    @track subredditRecordDefault;

    
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
    // This is used for Default Records
    connectedCallback(){
            this.getDataConnector();
        }
    async getDataConnector(event){
        this.subredditRecordDefault = await defaultRecords1();
        }          
    }