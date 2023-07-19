Cypress.Commands.add('generate_random_number', (length) => { 
    let random_number = '';
    var possible = "0123456789";
    for (var i = 0; i < length; i++){
        random_number += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return random_number
   });

// Cypress.Commands.add('datepicker', (date) =>{
//     var day = date.split('-')[0];
//     console.log(day);
//     var month = date.split('-')[1];
//     console.log(month);
//     var year = date.split('-')[2];
//     console.log(year);
    
//     var chooseMonth = ''
//     var chooseYear = ''

//     cy.get('.react-datepicker__current-month').invoke('text')
//         .then((yearMonth) => {
//             var chooseMonthYear = yearMonth;
//             chooseMonth = chooseMonthYear.split(' ')[0];
//             cy.log(chooseMonth);
//             chooseYear = chooseMonthYear.split(' ')[1];
//             cy.log(chooseYear);
//         })
        
//             while (chooseMonth !== month || chooseYear !== year){
//                 console.log("OKE");
//                 cy.get('.react-datepicker__navigation--next').click();
//                 cy.get('.react-datepicker__current-month').invoke('text')
//                     .then((yearMonth) => {
//                         chooseMonth = yearMonth.split(' ')[0];
//                         console.log(chooseMonth)
//                         chooseYear = yearMonth.split(' ')[1];
//                         console.log(chooseYear)
//                     })
//                 break;
//                 }
// })

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/auth/login')
    cy.get('.font-size-h1')
        .should('be.visible')
        .then(($font) => {
            expect($font).to.have.text('Login Account')
        })
    //Login as admin
    cy.get('[name="user"]').type(username);
    cy.get('[name="password"]').type(password);
    cy.contains('button','Sign In').click();
})