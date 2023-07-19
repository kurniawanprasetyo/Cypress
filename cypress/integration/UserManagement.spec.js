describe('User Management', function(){
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
    it('Add user', function(){
    //Login
    cy.login(this.logindata.admin_username, this.logindata.admin_password);
    cy.get('#kt_header_menu_wrapper > .font-weight-bold').then(($header) => {
      expect($header).to.have.text('Bersama Kirim Uang')
    })
    //Go to user management menu
    cy.contains('User Management').click();
    cy.get('.card-label').then(($listrouting) => {
      expect($listrouting).to.have.text('User List')
    })
    cy.get('.card-toolbar > .btn')
      .should('be.visible')
      .click();
    //Fill form
    cy.get('select[name=role]').select('User');
    cy.get('select[name=ca_id]').select(this.userdata.institution_id);
    var splitName = this.userdata.institution_name.split(' ');
    var firstName = splitName[0];
    var lastName = splitName[1];
    cy.get('input[name=first_name]').type(firstName);
    cy.get('input[name=last_name]').type(lastName);
    cy.generate_random_number(12).then((phone_number) => {
        cy.get('input[name=phone_number]').type(phone_number);
      });
    cy.get('input[name=username]').type(this.logindata.username);
    cy.get('input[name=email]').type(this.userdata.email);
    cy.get('input[name=password]').first().type(this.logindata.password);
    cy.get('input[name=confirm_password]').first().type(this.logindata.password);
    cy.contains('Cancel')
      .should('be.visible');
    cy.contains('Submit')
      .should('be.visible')
      .click();
    cy.get('.MuiPaper-root')
      .should('have.css', 'background-color')
      .and('eq', 'rgb(76, 175, 80)')        
    cy.get('.MuiAlert-message').then(($message) => {
      expect($message).to.have.text('Successfully Create User '+this.userdata.institution_name)
    })
  })
})