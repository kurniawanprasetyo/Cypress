let log = console.log;

describe('loops', () => {
    it('should loop', () => {
        log('1');
        cy.visit('https://web-staging.bersamaku.id/auth/login');
        log('2');
        cy.generate_random_number(1).then(($number) => {
            log('Generate Number ',$number);   
        })
    for(let i = 0; i < 3; i++){
        log('- ', i);
        cy.then(() => log('* ', i)); 
    }
    })
})