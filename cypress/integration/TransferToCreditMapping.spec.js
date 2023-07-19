describe('Transferto Credit Mapping', function(){
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

    it('Add Transferto Credit Mapping', function(){
    //Login
    cy.login(this.logindata.admin_username, this.logindata.admin_password);
    cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
        expect($header).to.have.text('Bersama Kirim Uang')
    })
    //Go to transferto credit mapping menu
    cy.contains('Routing and Destination').click();
    cy.get(':nth-child(13) > .menu-submenu > .menu-subnav > .menu-item ').should(($submenu) => {
        expect($submenu).to.have.length(4)
        expect($submenu.first()).to.contain('Routing')
        expect($submenu.last()).to.contain('987 Config')
    })
    cy.contains('TransferTo Credit Mapping').click();
    cy.get('.card-label').then(($listrouting) => {
        expect($listrouting).to.have.text('TransferTo Credit Mapping List')
    })
    cy.contains('New TransferTo Credit Mapping').click();
    //Fill form
    cy.get('.modal-title').then(($form) => {
        expect($form).to.have.text('New TransferTo Credit Mapping')
    })
    cy.get('select[name=dest_country]').select('IDN');
    cy.get(':nth-child(2) > :nth-child(2) > .form-control').type('bank_account_number');
    cy.get('input[name=payer_id]').type(this.userdata.payer_id);
    cy.contains('Cancel')
        .should('be.visible');
    cy.contains('Submit')
        .should('be.visible')
        .click();
    cy.get('.MuiPaper-root')
        .should('have.css', 'background-color')
        .and('eq', 'rgb(76, 175, 80)')        
    cy.get('.MuiAlert-message').then(($message) => {
        expect($message).to.have.text('Successfully Create Transfeto Credit Mapping')
    })
    })
})