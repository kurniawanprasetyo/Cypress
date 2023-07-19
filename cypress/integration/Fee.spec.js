describe('Fee', function(){
    beforeEach(function(){
        cy.fixture('Authentication')
        .then(logindata => {
            this.logindata = logindata;
        })
        cy.fixture('CollectionAgent')
        .then(userdata =>{
            this.userdata = userdata;
        })
    })

    it('Create Fee', function(){
        //Login as maker
        cy.login(this.logindata.maker_username, this.logindata.maker_password);
        cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
            expect($header).to.have.text('Bersama Kirim Uang')
        })
        //Go to fee menu
        cy.get(':nth-child(13) > .menu-link > .menu-text').click();
        cy.get('.card-label').then(($listva) => {
            expect($listva).to.have.text('Fee List')
        })
        cy.contains('New Fee')
            .should('be.visible')
            .click();
        //Fill form
        cy.get('.modal-title').then(($form) => {
            expect($form).to.have.text('New Fee')
        })
        cy.get('select[name=ca_id]').select(this.userdata.institution_id);
        cy.get('input[name="start_period"]').invoke('val').then((text) => {
            expect(this.userdata.begin_date).to.equal(text);
        });
        cy.get('select[name=dest_country]').select(this.userdata.destination_country);
        cy.get('.MuiTableRow-root > :nth-child(1) > .form-control').select('max');
        cy.get('.MuiTableRow-root > :nth-child(2) > .form-control').type('100');
        cy.get('.MuiTableRow-root > :nth-child(3) > .form-control').select('IDR');
        cy.get(':nth-child(4) > .form-control').type('2500');
        cy.contains('Add Fee Profile')
            .should('be.visible')
        cy.contains('Cancel')
            .should('be.visible')
        cy.contains('Submit')
            .should('be.visible')
            .click();
        cy.get('.MuiAlert-message').then(($message) => {
            expect($message).to.have.text('Successfully create request approval fee')
            })
        cy.get('.MuiPaper-root')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(76, 175, 80)')  
        //Log Out
        cy.get('.btn > .symbol > .symbol-label').click();
        cy.get('.navi-footer > .btn').click();
        //Login as checker
        cy.login(this.logindata.checker_username, this.logindata.checker_password);
        cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
            expect($header).to.have.text('Bersama Kirim Uang')
        })
        //Go to Menu Approval Fee
        cy.contains('Approval').click();
        // cy.get(':nth-child(8) > .menu-submenu > .menu-subnav > .menu-item').should(($submenuapproval) => {
        //     expect($submenuapproval).to.have.length(4)
        //     expect($submenuapproval.first()).to.contain('Approval Virtual Account')
        //     expect($submenuapproval.last()).to.contain('Approval Fee')
        // })
        cy.contains('Approval Fee').click();
        cy.get('.card-label').then(($listrouting) => {
            expect($listrouting).to.have.text('Approval Fee List')
        })
        cy.get(':nth-child(1) > :nth-child(5) > .btn-hover-warning').click();
        cy.get('.modal-title').then(($form) => {
            expect($form).to.have.text('Update Approval CREATE FEE')
        })
        // cy.get('.form > .form-control').children('option').then(options => {
        //     const actual = [...options].map(o => o.value)
        //     expect(actual).to.deep.eq(['Checked', 'Denied', 'Checked', 'Submitted', 'Choose State'])
        // })
        //     .select('Checked');
        cy.get('select[name=next_state]').select('Checked');
        cy.contains('Cancel')
            .should('be.visible');
        cy.contains('Submit')
            .should('be.visible')
            .click();
        cy.get('.MuiPaper-root')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(76, 175, 80)')        
        cy.get('.MuiAlert-message').then(($message) => {
            expect($message).to.have.text('Successfully update approval fee')
        })
        //Log Out
        cy.get('.btn > .symbol > .symbol-label').click();
        cy.get('.navi-footer > .btn').click();
        //Login as Approval
        cy.login(this.logindata.approval_username, this.logindata.approval_password);
        cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
            expect($header).to.have.text('Bersama Kirim Uang')
        })
        //Go to Menu Approval Fee
        cy.contains('Approval').click();
        cy.contains('Approval Fee').click();
        cy.get('.card-label').then(($listrouting) => {
            expect($listrouting).to.have.text('Approval Fee List')
        })
        cy.get(':nth-child(1) > :nth-child(5) > .btn-hover-warning').click();
        cy.get('.modal-title').then(($form) => {
            expect($form).to.have.text('Update Approval CREATE FEE')
        })
        cy.get('select[name=next_state]').select('Approved');
        cy.contains('Cancel')
            .should('be.visible');
        cy.contains('Submit')
            .should('be.visible')
            .click();
        cy.get('.MuiPaper-root')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(76, 175, 80)')        
        cy.get('.MuiAlert-message').then(($message) => {
            expect($message).to.have.text('Sucsessfully create fee')
        })
    })
})