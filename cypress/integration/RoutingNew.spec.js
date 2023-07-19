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

    var currentMonth = '';
    var currentYear = '';

    it('Create Routing', function(){
        //Login
        cy.login(this.logindata.admin_username, this.logindata.admin_password);
        //Go to virtual account menu
        cy.contains('Routing and Destination').click();
        cy.get(':nth-child(13) > .menu-submenu > .menu-subnav > :nth-child(1) > .menu-link > .menu-text').click();
        cy.contains('New Routing').click();
        cy.contains('Form').click();
        //Fill form
        cy.get('select[name=ca_id]').first().select(this.userdata.institution_id);
        cy.get('select[name=feature]').select(this.userdata.feature);
        cy.get('select[name=destination_code]').select(this.userdata.destination_code);
        cy.get('select[name=transaction_type]').select('C2C');
        //Still Confusing Handle datepicker
        // cy.get('[name="start_date"]').click();
        // cy.get('input[name="start_date"]').invoke('val').then((text) => {
        //     expect(this.userdata.begin_date).to.equal(text);
        // });
        var splitEndDate = this.userdata.end_date.split('-');
        var endDate = splitEndDate[0];
        var endMonth = splitEndDate[1];
        console.log(endMonth)
        var endYear = splitEndDate[2];
        
        cy.get('input[name="end_date"]').clear();
        cy.get('.react-datepicker__month-read-view--selected-month').invoke('text')
        .then((selectedMonth) => {
            var month = selectedMonth;
            currentMonth = month;
            cy.log(currentMonth);
        })
        cy.log(currentMonth);
        if (currentMonth === endMonth){
            cy.log("OK");
        }

        cy.get('.react-datepicker__month-read-view--down-arrow').click();
        cy.contains('September').click();
        
        cy.get('.react-datepicker__year-read-view--down-arrow').click();
        cy.contains('2021').click();
        // for(let n = 0; n < 12; n ++){
        //     cy.get('button.react-datepicker__navigation.react-datepicker__navigation--next').click();
        // }
        // //date = date.replace(/^[0]+/g,"");
        cy.get('div.react-datepicker__day.react-datepicker__day--0'+endDate+'').last().click();
        // cy.get('input[name="end_date"]').invoke('val').then((text) => {
        //     expect(this.userdata.end_date).to.equal(text);
        // });
        // // cy.get('input[name="end_date"]').clear().click().type('2022-08-05', {force: true}).trigger('change');
        // cy.get('input[name="end_date"]').invoke('val', '2022-08-05').trigger('change').then((text) => {
        //     // expect('2022-08-05').to.equal(text);
        //     console.log(text);
        // });
        // cy.datepicker('28-November-2021');
        // cy.get('select[name=mitra_id]').select(this.userdata.mitra_id);
        // cy.get('select[name=flag_auto_route]').select('INACTIVE');
        // //Klik cancel for temporary
        // cy.contains('Submit').click();
        // //Log Out
        // cy.get('.btn > .symbol > .symbol-label').click();
        // cy.get('.navi-footer > .btn').click();
        
    })
})