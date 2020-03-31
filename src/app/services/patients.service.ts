//    //Patients

//    getAllPatient()
//    {
//        return this.http.get<any>(appConfig.apiUrl+'/patients/getAllPatients')
//        .map(res => {
//            return res;
//        })
//    }
//    updatePatients(patients)
//    {
//        return this.http.post<any>(appConfig.apiUrl+'/patients/updatepatients',patients)
//        .map(res => {
//            return res;
//        })
//    }
//    insertPatients(patients)
//    {
//        return this.http.post<any>(appConfig.apiUrl+'/patients/intpatients',patients)
//        .map(res => {
//            return res;
//        })
//    }

//    deletePatient(id)
//    {
//        return this.http.get<any>(appConfig.apiUrl+'/patients/deletepatients/'+id)
//        .map(res => {
//            return res;
//        })
//    }
//    statusPatients(status)
//    {
//        return this.http.get<any>(appConfig.apiUrl+'/patients/getAllStatus/'+status)
//        .map(res => {
//            return res;
//        })
//    }
//    editAddress(addresses){
//        return this.http.post<any>(appConfig.apiUrl + '/addresses/updateaddress', addresses)
//            .map(res => {
//                return res;
//            });
//        }

//        getAllAddress()
//    {
//        return this.http.get<any>(appConfig.apiUrl+'/addresses/getAllAddress')
//        .map(res => {
//            return res;
//        })
//    }
//    status11(status)
//    {
//        return this.http.get<any>(appConfig.apiUrl+'/addresses/getAllStatus/'+status)
//        .map(res => {
//            return res;
//        })
//    }
