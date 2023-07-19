describe('987 Config', function(){
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

    it('Add 987 Config', function(){
    //Login
    cy.login(this.logindata.approval_username, this.logindata.approval_password);
    cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
        expect($header).to.have.text('Bersama Kirim Uang')
    })
    //Go to menu 987 Config
    cy.contains('Routing and Destination').click();
    cy.get(':nth-child(15) > .menu-submenu > .menu-subnav > .menu-item').should(($submenu) => {
        expect($submenu).to.have.length(5   )
        expect($submenu.first()).to.contain('Routing')
        expect($submenu.last()).to.contain('BTOP Feature Code')
    })
    cy.contains('987 Config').click();
    // cy.get('.card-label').then(($listrouting) => {
    //     expect($listrouting).to.have.text('987 Config List')
    // })
    cy.contains('New 987 Config')
        .should('be.visible')
        .click();
    //Fill Form
    cy.get('.modal-title').then(($form) => {
        expect($form).to.have.text('New 987 Config')
    })
    cy.get('select[name=ca_id]').first().select(this.userdata.institution_id);
    cy.get('input[name=name]').type(this.userdata.institution_name);
    cy.get('input[name=province_code]').type('JKT');
    cy.get('input[name=country_code]').type('ID');
    cy.contains('Cancel')
            .should('be.visible');
    cy.contains('Submit')
        .should('be.visible')
        .click();
    cy.get('.MuiPaper-root')
        .should('have.css', 'background-color')
        .and('eq', 'rgb(76, 175, 80)')        
    cy.get('.MuiAlert-message').then(($message) => {
        expect($message).to.have.text('Successfully Create 987 Config Bit 43')
    })
    })
})