describe('Collection Agent', function(){
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

    it('Create CA', function(){
        //Login
        cy.login(this.logindata.approval_username, this.logindata.approval_password);
        cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
          expect($header).to.have.text('Bersama Kirim Uang')
        })
        //Go to menu institution
        cy.get(':nth-child(11) > .menu-link > .menu-text').click();
        cy.get('h3 > b').then(($listinstitution) => {
          expect($listinstitution).to.have.text('Institutions List')
        })
        cy.get('#dropdown-toggle-top')
          .should('be.visible')
          .click();
        cy.get('.dropdown-menu > .navi > :nth-child(1) > .navi-link > .navi-text')
          .should('be.visible')
          .click();
        //Fill Form Page Profile
        cy.get('input[name=inst_id]').type(this.userdata.institution_id);
        cy.get('input[name=inst_name]').type(this.userdata.institution_name);
        cy.get('select[name=status]').select('ACTIVE');
        cy.get('select[name=product_name]').select('Bersama Kirim Uang');
        cy.generate_random_number(12).then((phone_number) => {
            cy.get('input[name=phone_number]').type(phone_number);
          });
        cy.generate_random_number(15).then((npwp) => {
            cy.get('input[name=npwp]').type(npwp);
          });
        cy.generate_random_number(13).then((tdp) => {
            cy.get('input[name=tdp]').type(tdp);
          });
        cy.get('select[name=country_code]').select('IDN');
        cy.get('input[name=province]').type('Jawa Barat');
        cy.get('input[name=district]').type('Tangerang');
        cy.get('textarea[name=address]').type("Grha Artajasa Jl. Letnan Sutopo B.1/3, Sektor Komersil III B, Lengkong Gudang Tim., Kec. Serpong, Kota Tangerang Selatan, Banten 15321");
        cy.contains('Cancel')
          .should('be.visible')
        cy.contains('Previous')
          .should('be.visible')
        cy.contains('Next')
          .should('be.visible')
          .click();
        //Fill Form Page Feature
        cy.get(':nth-child(2) > .form-control').select(this.userdata.feature);
        cy.get(':nth-child(3) > .form-control').select('ACTIVE');
        cy.get('.MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.contains(this.userdata.destination_country).click();
        cy.contains('Add Feature')
          .should('be.visible')
        cy.contains('Cancel')
          .should('be.visible')
        cy.contains('Previous')
          .should('be.visible')
        cy.contains('Next')
          .should('be.visible')
          .click();
        //Fill Form Page PIC
        cy.get(':nth-child(1) > .form-control').type('Cypress');
        cy.get(':nth-child(2) > .form-control').type('Automation Test');
        cy.generate_random_number(12).then((pic_phone_number) => {
            cy.get(':nth-child(3) > .form-control').type(pic_phone_number);
          });
        cy.get(':nth-child(4) > .form-control').type('cypress@artajasa.co.id');
        cy.contains('Create PIC')
          .should('be.visible')
        cy.contains('Cancel')
          .should('be.visible')
        cy.contains('Previous')
          .should('be.visible')
        cy.contains('Save')
          .should('be.visible')
          .click();
        // cy.get('.MuiAlert-message').then(($message) => {
        //   expect($message).to.contain('Successfully Create')
        // })        
        //Log Out
        cy.get('.topbar-item > .btn').click();
        cy.get('.navi-footer > .btn').click();
    })
})