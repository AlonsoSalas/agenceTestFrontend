class bluebarController extends AngularClass {
    constructor(...dependencies) {
        super(dependencies,bluebarController.$inject)

        this.logo = 'http://www.agence.com.br/wp-content/themes/dt-the7/inc/presets/images/agence/agence.png';
    }
}

bluebarController.$inject = [];

export default bluebarController;
