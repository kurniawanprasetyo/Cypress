describe('Remaining Balance', function(){
    beforeEach(function(){
        cy.fixture('Authentication')
        .then(logindata =>{
            this.logindata = logindata;
        })
        cy.fixture('CollectionAgent')
        .then(userdata =>{
            this.userdata = userdata;
        })
      })
    it('Add Remaining Balance', function(){
    //Login as admin
    cy.login(this.logindata.admin_username, this.logindata.admin_password);
    //Go to virtual account menu
    cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
        expect($header).to.have.text('Bersama Kirim Uang')
    })
    cy.get(':nth-child(10) > .menu-toggle > .menu-text').click();
    cy.get(':nth-child(10) > .menu-submenu > .menu-subnav > .menu-item ').should(($submenu) => {
        expect($submenu).to.have.length(2)
        expect($submenu.first()).to.contain('Virtual Account')
        expect($submenu.last()).to.contain('Remaining Balance')
    })
    cy.contains('Remaining Balance').click();
    cy.get('.card-label').then(($listva) => {
        expect($listva).to.have.text('Remaining Balance List')
    })
    cy.contains('New Remaining Balance').click();
    //Fill Form
    cy.get('.modal-title').then(($form) => {
        expect($form).to.have.text('New Remaining Balance')
    })
    cy.get('select[name=va_id]').select(this.userdata.va_id);
    cy.contains('Add Threshold').click();
    cy.get(':nth-child(3) > .form-group > .col-lg-6 > .form-control').type('10000000');
    cy.get(':nth-child(3) > .form-group > .col-lg-4 > .form-control').select('Critical');
    cy.get(':nth-child(4) > .form-group > .col-lg-6 > .form-control').type('50000000');
    cy.get(':nth-child(4) > .form-group > .col-lg-4 > .form-control').select('Warning');
    cy.get(':nth-child(7) > .col-lg-12 > .react-multi-email > input').type(this.userdata.email);
    cy.get(':nth-child(8) > .col-lg-12 > .react-multi-email > input').type(this.userdata.email);
    cy.contains('Cancel')
        .should('be.visible')
    cy.contains('Submit')
        .should('be.visible')
        .click();
    cy.get('.MuiPaper-root')
        .should('have.css', 'background-color')
        .and('eq', 'rgb(76, 175, 80)')    
    cy.get('.MuiAlert-message').then(($message) => {
        expect($message).to.have.text('Successfully Create Virtual Account '+this.userdata.va_name+'('+this.userdata.va_id+')')
    })
    })
})