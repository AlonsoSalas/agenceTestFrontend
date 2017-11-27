class reportController extends AngularClass {
    constructor(...dependencies) {
        super(dependencies,reportController.$inject)

        this.loading = false;

        this.users = [];
        this.selectedUser = {};
        this.selectedUserDeail = {};
        this.usersDetailList = [];

        this.display = {
            reportTable: false,
            lineGraph: false,
            pieGraph: false
        };

        this.months = [
            { name: 'Enero', value: '01'},
            { name: 'Febrero', value: '02'},
            { name: 'Marzo', value: '03'},
            { name: 'Abril', value: '04'},
            { name: 'Mayo', value: '05'},
            { name: 'Junio', value: '06'},
            { name: 'Julio', value: '07'},
            { name: 'Agosto', value: '08'},
            { name: 'Septiembre', value: '09'},
            { name: 'Octubre', value: '10'},
            { name: 'Noviembre', value: '11'},
            { name: 'Diciembre', value: '12'}
        ];
        this.month = null;
        this.year = new Date();
        this.month1 = null;
        this.year1 = new Date();
        this.opened = false;
        this.opened1 = false;
        this.datepickerOptions = {
            datepickerMode: 'year',
            minMode: 'year',
            showWeeks: false,
        };
        this.reports = [];
    }

    $onInit() {
        this.loading1 = true;
        this.ReportService.getConsultants()
        .then(({ data }) => {
            this.users = data;
            console.log(this.users);
            this.loading1 = false;
        })
        .catch((err) => {
            console.log(err);
            this.loading1 = false;
        });
    }

    totalLucro(report) {
        return report.totalIncome - ( (report.salary * report.months.length) + report.totalcommission );
    }

    monthLucro(month, report) {
        return month.income - (report.salary + month.commission);
    }

    select(user) {
        this.selectedUser = user;
    }

    changeDisplay(mode) {

        this.getData();

        for (let property in this.display) {
            this.display[property] = false;
        }
        this.display[mode] = true;

        switch (mode) {
            case 'reportTable':

            break;
            case 'lineGraph':
                this.generateGraph();
            break;
            case 'pieGraph':
                this.generateGraph();
            break;
            default:
        }
    }

    generateGraph() {
        this.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

        const usersName = this.usersDetailList.map(user => user.no_usuario);

        this.labels = [];
        this.data = [];

        this.mediaSalary = 0;

        this.reports.forEach( ( report ) => {
            this.mediaSalary = this.mediaSalary + report.salary;
        });

        this.mediaSalary = this.mediaSalary/this.reports.length;

        let totalIncomes = [];
        let mediaIncome = [];

        this.reports.forEach( ( report ) => {
            totalIncomes.push(report.totalIncome);
            mediaIncome.push(this.mediaSalary);
            this.labels.push(report.name);
        });

        this.data.push(totalIncomes);
        this.data.push(mediaIncome);

        this.datasetOverride = [
            {
                label: 'Salario Usuario',
                borderWidth: 1,
                type: 'bar'
            },
            {
                label: 'Salario Media',
                borderWidth: 3,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                type: 'line'
            }
        ];
    }

    selectFromDetail(user) {
        this.selectedUserDeail = user;
    }

    takeOffDetails() {
        if ( Object.keys(this.selectedUserDeail).length !== 0 ) {
            const id = this.selectedUserDeail.co_usuario;

            this.usersDetailList  = _.remove(this.usersDetailList, function(user) {
                return user.co_usuario !== id;
            });

            this.users.push(this.selectedUserDeail);
            this.selectedUserDeail = {};
        }
    }

    passToDetails() {
        if ( Object.keys(this.selectedUser).length !== 0 ) {
            const id = this.selectedUser.co_usuario;

            this.users  = _.remove(this.users, function(user) {
                return user.co_usuario !== id;
            });

            this.usersDetailList.push(this.selectedUser);

            console.log('desde 01-'+ this.month +'-'+moment(this.year).format('YYYY'));
            console.log('Hasta 01-'+ this.month1 +'-'+moment(this.year1).format('YYYY'));
            this.selectedUser = {};
        }
    }

    dateFormate(data) {
        const date = moment(data, 'MM-YYYY') ;
        return moment(date).locale('es').format('MMMM YYYY');
    }

    calculateLucro(month, report) {
        console.log(month.income+'-(+'+report.salary+'+'+month.commission+')');
        let result = month.income - (report.salary + month.commission);
        console.log('= '+result);
        return result;
    }

    getData() {

        const usersID = this.usersDetailList.map(user => user.co_usuario);

        const payload = {
            users: usersID,
            from: '01-'+ this.month +'-'+moment(this.year).format('YYYY'),
            to: '01-'+ this.month1 +'-'+moment(this.year1).format('YYYY')
        }

        this.loading = true;
        this.ReportService.getConsultantReport(payload)
        .then(({ data }) => {
            this.reports = data;
            console.log(data);
            this.loading = false;
        })
        .catch((err) => {
            console.log(err);
            this.loading = false;
        });

    }
}

reportController.$inject = ['ReportService']

export default reportController;
