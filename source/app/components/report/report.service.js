class ReportService {

    constructor(ApiService){
        this.ApiService = ApiService;
    }

    getConsultants(){
        return this.ApiService.get('/consultants');
    }

    getConsultantReport(reportData){
        return this.ApiService.get('/consultants/report', reportData);
    }
}

ReportService.$inject = ['ApiService'];

export default ReportService ;
