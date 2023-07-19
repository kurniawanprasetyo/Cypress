describe('Transaction Config', function(){
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
    it('Create Transaction Config', function(){
        //Login as admin
        cy.login(this.logindata.admin_username, this.logindata.admin_password);
        cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
            expect($header).to.have.text('Bersama Kirim Uang')
        })
        //Go to transaction config menu
        cy.contains('Transaction Config').click();
        cy.get('h3 > b').then(($listrouting) => {
            expect($listrouting).to.have.text('Transaction Config List')
        })
        cy.contains('New Account Transaction Config')
            .should('be.visible')
            .click();
        //Fill Form
        // cy.get('.modal-title').then(($form) => {
        //     expect($form).to.have.text('New Account Transaction Config')
        // })
        cy.get('select[name=ca_id]').select(this.userdata.institution_id);
        cy.get('input[name=username]').type(this.logindata.username);
        cy.get('input[name=token_time]').type('10');
        cy.get('select[name=token_duration]').select('minutes');
        cy.get('input[name=password]').first().type(this.logindata.password);
        cy.get('input[name=confirm_password]').first().type(this.logindata.password)
        cy.contains('Cancel')
            .should('be.visible');
        cy.contains('Submit')
            .should('be.visible')
            .click();
        cy.get('.MuiPaper-root')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(76, 175, 80)')        
        cy.get('.MuiAlert-message').then(($message) => {
            expect($message).to.have.text('Successfully Create Transaction Config')
        })
    })
})