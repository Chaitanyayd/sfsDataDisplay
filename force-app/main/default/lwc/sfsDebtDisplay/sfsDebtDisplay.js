import { LightningElement } from 'lwc';
import fetchData from "@salesforce/apex/sfsDebtDisplayController.fetchData";
const columns = [
    { label: 'Creditor', fieldName: 'creditorName', cellAttributes: { alignment: 'left' } },
    { label: 'First Name', fieldName: 'firstName', cellAttributes: { alignment: 'left' } },
    { label: 'Last Name', fieldName: 'lastName', cellAttributes: { alignment: 'left' } },
    {
        label: 'Min Pay%', fieldName: 'minPaymentPercentage', type: 'percent', typeAttributes: {
            step: '0.0001', minimumFractionDigits: '2', maximumFractionDigits: '0'
        }, cellAttributes: { alignment: 'left' }
    },
    { label: 'Balance', fieldName: 'balance', type: 'currency', cellAttributes: { alignment: 'left' } },
];

export default class SfsDebtDisplay extends LightningElement {
    data;
    columns = columns;
    showTable = false;
    additionOfChecked = 0;
    totalRows = 0;
    checkedRows = 0;
    showAddRowBox = false;
    nCreditor;
    nFirstName;
    nLastName;
    nMinPay;
    nBalance;
    globalSelectedRows;
    idsToExclude = [];

    connectedCallback() {
        fetchData()
            .then((result) => {
                var datapesudo = [];
                console.log('here is the result -- ' + result);
                this.data = JSON.parse(result);
                for (const obj of this.data) {
                    this.idsToExclude.push(obj.id);
                    obj.minPaymentPercentage = obj.minPaymentPercentage / 100;
                    datapesudo.push(obj);
                }
                this.data = datapesudo;
                this.totalRows = this.data.length;
                this.showTable = true;
            })
            .catch((error) => {
                this.showTable = false;
                console.log('Error -- ' + error.body.message);
            })
    }

    selectRow(event) {
        const selectedRows = event.detail.selectedRows;
        this.globalSelectedRows = event.detail.selectedRows;
        console.log('selectedRows == ' + JSON.stringify(selectedRows));
        this.checkedRows = selectedRows.length;
        this.additionOfChecked = 0;
        for (const obj of selectedRows) {
            this.additionOfChecked += obj.balance;
        }
    }

    handleAdd() {
        this.showAddRowBox = true;
    }

    addRow() {
        let debt = {
            id: this.generateId(1, 100000),
            creditorName: this.nCreditor !== undefined ? this.nCreditor : '',
            firstName: this.nFirstName !== undefined ? this.nFirstName : '',
            lastName: this.nLastName !== undefined ? this.nLastName : '',
            minPaymentPercentage: this.nMinPay !== undefined ? this.nMinPay : '',
            balance: this.nBalance !== undefined ? parseInt(this.nBalance) : ''
        }
        let results = [];
        results.push(...this.data, debt);
        this.idsToExclude.push(debt.id);
        this.data = results;
        this.totalRows = this.data.length;
        console.log('new data ' + JSON.stringify(results));
        this.showAddRowBox = false;

    }

    storeValue(event) {
        if (event.target.name === "Creditor") {
            this.nCreditor = event.target.value;
        } else if (event.target.name === "First Name") {
            this.nFirstName = event.target.value;
        } else if (event.target.name === "Last Name") {
            this.nLastName = event.target.value;
        } else if (event.target.name === "Min Pay") {
            this.nMinPay = event.target.value;
        } else if (event.target.name === "Balance") {
            this.nBalance = event.target.value;
        }
    }

    handleRemove() {
        let myArray = this.data;
        for (const obj of this.globalSelectedRows) {
            console.log('ids == ' + obj.id);
            myArray = myArray.filter(function (obj1) {
                return obj1.id !== obj.id;
            });
            this.idsToExclude.splice(this.idsToExclude.indexOf(obj.id), 1)
        }
        this.data = myArray;
        this.totalRows = this.data.length;
    }

    generateId(min, max) {
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        return (this.idsToExclude.includes(num)) ? this.generateId(min, max) : num;
    }

    closeModal() {
        this.showAddRowBox = false;
    }
}