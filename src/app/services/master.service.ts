import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { appConfig } from '../app.config';

@Injectable()
export class MasterService {
    constructor(private http: HttpClient) { }


    updateCustomer(cou_id) {
        return this.http.post<any>(appConfig.apiUrl + '/customer/updateCustomer', cou_id)
            .map(res => {
                return res;
            });
    }

    getAllCustomer() {
        return this.http.get<any>(appConfig.apiUrl + '/customer/getAllCustomer')
            .map(res => {
                return res;
            })
    }
    UpdateAddress(addre) {
        return this.http.get<any>(appConfig.apiUrl + '/addresses/updateaddress')
            .map(res => {
                return res;
            })
    }
    getAllCustId() {
        return this.http.get<any>(appConfig.apiUrl + '/customer/getAllCustId')
            .map(res => {
                return res;
            })
    }
    //Loan services
 
    getAllLoanIdBycustomer(id) {
        return this.http.get<any>(appConfig.apiUrl + '/loan/getAllLoanBycustomer/'+id)
            .map(res => {
                return res;
            })
    }
    getAllLoanIdBycustom(id) {
        return this.http.get<any>(appConfig.apiUrl + '/loan/getAllLoanIDBycustomer/'+id)
            .map(res => {
                return res;
            })
    }
    getImageDocumentBycustId(id) {
        return this.http.get<any>(appConfig.apiUrl + '/customer_document/getImageDocumentBycustId/'+id)
            .map(res => {
                return res;
            })
    }
    getAllLoan() {
        return this.http.get<any>(appConfig.apiUrl + '/loan/getAllLoan')
            .map(res => {
                return res;
            })
    }
    updateLoan(con) {
        return this.http.post<any>(appConfig.apiUrl + '/loan/updateLoan', con)
            .map(res => {
                return res;
            });
    }
    deleteLoan(loan) {
        return this.http.post<any>(appConfig.apiUrl + '/loan/deleteLoan/',loan)
            .map(res => {
                return res;
            })
    }
    getAllLoanByDate(){
        return this.http.get<any>(appConfig.apiUrl + '/loan/getAllLoanByDate')
        .map(res => {
            return res;
        })
    }
    getAllLoanByMonth(){
        return this.http.get<any>(appConfig.apiUrl + '/loan/getAllLoanByMonth')
        .map(res => {
            return res;
        })
    }
     // insertCustdetails(con) {
    //     return this.http.post<any>(appConfig.apiUrl + '/customer/intcustomer', con)
    //         .map(res => {
    //             return res;
    //         });
    // }
    insertCustdetails(con) {
        return this.http.post<FormData>(appConfig.apiUrl + '/file/addProduct', con)
            .map(res => {
                return res;
            })
    }



    getAllStatus(status) {
        return this.http.get<any>(appConfig.apiUrl + '/country/getAllStatus/' + status)
            .map(res => {
                return res;
            });
    }

    

    insertLoandetails(con) {
        return this.http.post<any>(appConfig.apiUrl + '/loan/intLoan', con)
            .map(res => {
                return res;
            });
    }
    //payment

    getAllFile() {
        return this.http.get<any>(appConfig.apiUrl + '/file/getAllFiles')
            .map(res => {
                return res;
            })
    }
    getAllPaymentEMIByDate() {
        return this.http.get<any>(appConfig.apiUrl + '/payment/getAllPaymentEMIByDate')
            .map(res => {
                return res;
            })
    }
    getAllPaymentPaidByDate(){
        return this.http.get<any>(appConfig.apiUrl + '/payment/getAllPaymentPaidByDate')
        .map(res => {
            return res;
        })
    }
    getAllUNPAIDPaymentByMonth() {
        return this.http.get<any>(appConfig.apiUrl + '/payment/getAllUNPAIDPaymentByMonth')
            .map(res => {
                return res;
            })
    }
    getAllPAIDPaymentByMonth(){
        return this.http.get<any>(appConfig.apiUrl + '/payment/getAllPAIDPaymentByMonth')
        .map(res => {
            return res;
        })
    }

    insertPaymenttails(paym) {
        return this.http.post<any>(appConfig.apiUrl + '/payment/intPayment', paym)
            .map(res => {
                return res;
            });
    }
    updatePayments(con) {
        return this.http.post<any>(appConfig.apiUrl + '/payment/updatePayment', con)
            .map(res => {
                return res;
            });
    }
    deletePayments(id) {
        return this.http.post<any>(appConfig.apiUrl + '/payment/deletePayment/' + id, '')
            .map(res => {
                return res;
            })
    }
    getAllPaymentIdBycustomer(id) {
        return this.http.get<any>(appConfig.apiUrl + '/payment/getAllPaymentBycustomer/'+id)
            .map(res => {
                return res;
            })
    }
    getAllBalance(id) {
        return this.http.get<any>(appConfig.apiUrl + '/payment/getAllBalance/'+id)
            .map(res => {
                return res;
            })
    }
}