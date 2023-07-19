describe('Virtual Account', function(){
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

    it('Create Virtual Account', function(){
        //Login as admin
        cy.login(this.logindata.approval_username, this.logindata.approval_password);
        cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
            expect($header).to.have.text('Bersama Kirim Uang')
        })  
        //Go to virtual account menu
        cy.get(':nth-child(12) > .menu-toggle > .menu-text').click();
        cy.get(':nth-child(12) > .menu-submenu > .menu-subnav > .menu-item ').should(($submenu) => {
            expect($submenu).to.have.length(2)
            expect($submenu.first()).to.contain('Virtual Account')
            expect($submenu.last()).to.contain('Threshold Balance')
        })
        cy.get(':nth-child(12) > .menu-submenu > .menu-subnav > :nth-child(1) > .menu-link > .menu-text').click();
        cy.get('h3 > b').then(($listva) => {
            expect($listva).to.have.text('Virtual Account List')
        })
        cy.contains('New Virtual Account')
            .should('be.visible')
            .click()
        cy.get('.modal-title').then(($form) => {
            expect($form).to.have.text('New Virtual Account')
        })
        //Fill Form
        cy.get('select[name=inst_id]').select(this.userdata.institution_id);
        cy.get('input[name=va_id]').type(this.userdata.va_id);
        cy.get('input[name=account_name]').type(this.userdata.va_name);
        cy.get('select[name=status]').select('ACTIVE');
        cy.get('select[name=currency_code]').select('IDR');
        cy.get('[class="MuiSvgIcon-root"]').last().click()
        cy.contains(this.userdata.feature).click()
        cy.contains('Cancel')
            .should('be.visible')
        cy.contains('Submit')
            .should('be.visible')
            .click();
        cy.get('.MuiSnackbar-root > .MuiPaper-root')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(76, 175, 80)')    
        cy.get('.MuiAlert-message').then(($message) => {
            expect($message).to.have.text('Successfully Create Virtual Account')
        })
        //Log Out
        cy.get('.topbar-item > .btn').click();
        cy.get('.navi-footer > .btn').click();
    })
})