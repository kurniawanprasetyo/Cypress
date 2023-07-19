describe('Routing', function(){
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

    it('Create Routing', function(){
        //Login
        cy.login(this.logindata.admin_username, this.logindata.admin_password);
        
        //Go to virtual account menu
        cy.contains('Routing and Destination').click()
        cy.contains('li', 'Routing').click()
        cy.contains('New Routing').click()
        cy.contains('Form').click()
        
        //Form Input
        cy.get('input[name=is_auto_route]').click()
        cy.get('div [name="ca_id"]').select('141021')

        //Date Picker
        let date = new Date()
        date.setDate(date.getDate() + 5)
        let futureDay = date.getDate()
        console.log(futureDay)
        let futureMonth = date.toLocaleString('default', {month: 'long'})
        console.log(futureMonth)
        let futureYear = date.getFullYear()
        console.log(futureYear)
        cy.get('[name="start_date"]').then( input => {
            cy.wrap(input).click()
        })
        cy.get('[class="react-datepicker__current-month react-datepicker__current-month--hasYearDropdown react-datepicker__current-month--hasMonthDropdown"]').invoke('text').then( dataAttribute =>{
            if(!dataAttribute.includes(futureMonth)){
                cy.get('[aria-label="Next Month"]').click()
            }else{
                cy.get('[class="react-datepicker__month"]').contains(futureDay).click()
            }
        })

     

        // cy.get('div [name="destination_code"]').select('556978')
        // cy.get('div [name="transaction_type"]').select('C2C')
        // cy.get('div [name="feature"]').eq(1).select('to_account')
        // cy.get('div [name="mitra_id"]').select('202101005')

        // cy.get('input[name="start_date"]').invoke('val').then((text) => {
        //     expect(this.userdata.begin_date).to.equal(text);
        // });
        // cy.get('input[name="end_date"]').clear();
        // for(let n = 0; n < 13; n ++){
        //     cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click();
        // }
        // var splitdate = this.userdata.end_date.split('-');
        // var date = splitdate[splitdate.length-1];
        // cy.get('div.react-datepicker__day.react-datepicker__day--0'+date+'').first().click();
        // cy.get('input[name="end_date"]').invoke('val').then((text) => {
        //     expect(this.userdata.end_date).to.equal(text);
        // });
        // cy.get('select[name=destination_code]').select(this.userdata.destination_code);
        // cy.get('select[name=transaction_type]').select('C2C');
        // cy.get('select[name=feature]').select(this.userdata.feature);
        // cy.get('select[name=mitra_id]').select(this.userdata.mitra_id);
        // cy.contains('Cancel')
        //     .should('be.visible');
        // cy.contains('Submit')
        //     .should('be.visible')
        //     .click();
        // cy.get('.MuiPaper-root')
        //     .should('have.css', 'background-color')
        //     .and('eq', 'rgb(76, 175, 80)')        
        // cy.get('.MuiAlert-message').then(($message) => {
        //     expect($message).to.have.text('Successfully Create Data Routing')
        // })
        //Log Out
        // cy.get('.btn > .symbol > .symbol-label').click();
        // cy.get('.navi-footer > .btn').click();
        // cy.get('.font-size-h1')
        // .should('be.visible')
        // .then(($font) => {
        //     expect($font).to.have.text('Login Account')
        // })
    })
})
