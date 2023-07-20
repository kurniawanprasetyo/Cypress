describe('Cash In', function(){
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

    // Variable to store Reference id
    let referenceid
    // Request Cash In
    it('Request Cash In', function(){
        //Login as approval
        cy.login(this.logindata.approval_username, this.logindata.approval_password);
        cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
            expect($header).to.have.text('Bersama Kirim Uang')
        })
        //Go to cash in menu
        cy.contains('Virtual Account').click({force: true});
        cy.get('.menu-nav > :nth-child(4) > .menu-submenu > .menu-subnav >').should(($submenu) => {
            expect($submenu).to.have.length(6)
            expect($submenu.first()).to.contain('Cash In')
            expect($submenu.last()).to.contain('Monitoring Balance')
        })
        cy.get('.menu-nav > :nth-child(4)').contains('Cash In').click({force: true});
        cy.get('h3 > b').then(($listrouting) => {
            expect($listrouting).to.have.text('Cash In List')
        })
        cy.contains('button', 'Cash In')
            .should('be.visible')
            .click();
        //Request Cash In
        cy.get('.modal-title').then(($form) => {
            expect($form).to.have.text(' Cash In')
        })
        cy.get('select[name=va_id]').select('30089100936000201');
        cy.get('input[name=amount]').type('100000000');
        cy.get('textarea[name=remarks]').type('Automation using cypress');
        cy.contains('Cancel')
            .should('be.visible');
        cy.contains('Submit')
            .should('be.visible')
            .click();     
        cy.get('.MuiAlert-message').then(($message) => {
            expect($message).to.contain('Successfully Create Data Cash-In Virtual Account')
        })
        cy.wait(5000)
        //Get Reference id
        cy.get("tbody > :nth-child(1) > :nth-child(2) > div").invoke('text')
            .then((id) => {
                referenceid = id;
            })
        console.log(referenceid)
        cy.get('.btn > .symbol > .symbol-label').click();
        cy.contains('Sign Out').click();
    })
    it('Checked Cash in', function(){
        //Login as checker
        cy.login(this.logindata.approval_username, this.logindata.approval_password);
        //Go to menu approval virtual account
        cy.contains('Approval').click();
        cy.contains('Approval Virtual Account').click();
        //Checked
        cy.get('h3 > b').then(($listrouting) => {
            expect($listrouting).to.have.text('Approval Virtual Account List')
        })
        //Get Cash In Request & Click Checked 
        cy.contains('div', referenceid)
            .parents('tr').within(() => {
                cy.get(':nth-child(12)').children('.btn-hover-warning')
                .click();
            })
        cy.get('.modal-title').then(($form) => {
            expect($form).to.have.text('Update Approval CASH IN')
        })
        cy.get('select[name=next_state]').select('checked');
        cy.contains('Cancel')
            .should('be.visible');
        cy.contains('Submit')
            .should('be.visible')
            .click();      
        cy.get('.MuiTypography-root').then(($message) => {
            expect($message).to.contain('Successfully Update Approval CASH-IN ')
        })
        //Log Out
        cy.get('.btn > .symbol > .symbol-label').click();
        cy.get('.navi-footer > .btn').click();
    })
    it('Approved Cash in', function(){
        //Login as approval
        cy.login(this.logindata.approval_username, this.logindata.approval_password);
        //Go to approval virtual account menu
        cy.contains('Approval').click();
        cy.contains('Approval Virtual Account').click();
        //Approved
        cy.get('h3 > b').then(($listrouting) => {
            expect($listrouting).to.have.text('Approval Virtual Account List')
        })
        cy.contains('div', referenceid) 
            .parents('tr').within(() => {
                cy.get(':nth-child(12)').children('.btn-hover-warning')
                .click();
            })
        cy.get('.modal-title').then(($form) => {
            expect($form).to.have.text('Update Approval CASH IN')
        })
        cy.get('select[name=next_state]').select('approved');
        cy.contains('Cancel')
            .should('be.visible');
        cy.contains('Submit')
            .should('be.visible')
            .click();
        cy.get('.MuiTypography-root').then(($message) => {
            expect($message).to.contain('Successfully Update Approval CASH-IN ')
        })
    })
})