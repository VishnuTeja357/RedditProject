import { api, LightningElement,track} from 'lwc';
import getpostListJS from '@salesforce/apex/searchSubredditController.getPostList';
import defaultPostJS from '@salesforce/apex/searchSubredditController.defaultRecordsForPost';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { getDataConnector } from 'lightning/analyticsWaveApi';
 
export default class LwcCustomModal extends LightningElement {

    @track customFormModal = false; 
    @api recordId;
	objectRecordId = 'Post__c';
    @track postRecord;
    searchValue = '';
    @track postRecordDefault;

    
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
                this.postRecord = await getpostListJS({ searchKey: this.searchValue });
            }
        }
    // This is used for Default Records
    connectedCallback(){
            this.getDataConnector();
        }
    async getDataConnector(event){
        this.postRecordDefault = await defaultPostJS();
        }          
    }