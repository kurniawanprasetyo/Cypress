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

      it('Adjustment Reconcile', function(){
        //Login
        cy.login(this.logindata.approval_username, this.logindata.approval_password);
        cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
        expect($header).to.have.text('Bersama Kirim Uang')
        })
        cy.contains('Virtual Account').click();
        cy.get(':nth-child(4) > .menu-submenu > .menu-subnav > .menu-item ').should(($submenu) => {
            expect($submenu).to.have.length(6)
            expect($submenu.first()).to.contain('Cash In')
            expect($submenu.last()).to.contain('Monitoring Balance')
        })
        cy.contains('Adjustment R2 Result').click();
        cy.get('h3 > b').then(($listrouting) => {
            expect($listrouting).to.have.text('Adjustment R2 Result')
        })
        findStatus('Need Adjustment');
    })
});

const clickButton = (click) => {
    cy.get('tbody > tr > td:nth-child(9)').each(td => {
        if (click = true) return false;        
    })
}
const findStatus = (status) => {
    cy.get('tbody > tr > td:nth-child(8)').each(td => {
        const empStatus = td.text();
        console.log(empStatus);
        if (status == empStatus)
            clickButton(true)
            return false;
        
    })
}