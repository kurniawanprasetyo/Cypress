describe('Destination', function(){
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

    it('Add Destination', function(){
    //Login as admin
    cy.login(this.logindata.admin_username, this.logindata.admin_password);
    cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
      expect($header).to.have.text('Bersama Kirim Uang')
    })
    //Go to destination menu
    cy.contains('Routing and Destination').click();
    cy.get(':nth-child(13) > .menu-submenu > .menu-subnav > .menu-item ').should(($submenu) => {
      expect($submenu).to.have.length(4)
      expect($submenu.first()).to.contain('Routing')
      expect($submenu.last()).to.contain('987 Config')
    })
    cy.get(':nth-child(13) > .menu-submenu > .menu-subnav > :nth-child(2) > .menu-link > .menu-text').click();
    cy.get('.card-label').then(($listrouting) => {
      expect($listrouting).to.have.text('Destination List')
    })
    cy.contains('New Destination').click();
    //Fill Form
    cy.get('.modal-title').then(($form) => {
      expect($form).to.have.text('New Destination')
    })
    cy.generate_random_number(6).then((destination_id) => {
        cy.get('input[name=destination_id]').type(destination_id);
      });
    cy.get('input[name=destination_name]').type(this.userdata.destination_name);
    cy.get('select[name=country_code_destination]').select('IDN');
    cy.get('select[name=feature]').select(this.userdata.feature);
    cy.get(':nth-child(7) > .col-lg-8 > .form-control').type(this.userdata.payer_id);
    cy.contains('Cancel')
        .should('be.visible');
    cy.contains('Submit')
        .should('be.visible')
        .click();
    cy.get('.MuiPaper-root')
        .should('have.css', 'background-color')
        .and('eq', 'rgb(76, 175, 80)')        
    cy.get('.MuiAlert-message').then(($message) => {
        expect($message).to.have.text('Successfully Create Destination')
    })
    })
})