class FooterController extends AngularClass {
    constructor(...dependencies) {
        super(dependencies,FooterController.$inject);

        // this.footerBackground = '../assets/img/landing/footer-background.jpg';
        this.footerLogo = 'http://www.agence.com.br/wp-content/themes/dt-the7/inc/presets/images/agence/agence-2.png';
    }
}

FooterController.$inject = [];

export default FooterController;
