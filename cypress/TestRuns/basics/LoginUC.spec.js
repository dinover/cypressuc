context('Login Validations Agent/Supervisor', () => {

    it('Login with Nothing', function(){
        cy.visit("https://203.ucontactcloud.com")
        cy.get('#btnLogin').click()
        cy.get('#toast-container').contains('Please enter a valid username and password')
    })  

    it('Unsuccesfull Login', function(){
      cy.reload()
      cy.get('#cmbRol_chosen').click()
      cy.get('.active-result').contains('Supervisor').click()
      cy.get('[name="user"]').type('Inasdtegra')
      cy.get('[name="pass"]').type('1nt3gr4{enter}')
      cy.get('#toast-container').contains('Please enter a valid username and password')
    })  

    it('Login without Pass', function(){
        cy.reload()
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Supervisor').click()
        cy.get('[name="user"]').type('Integra{enter}')
        cy.get('#toast-container').contains('Please enter a valid username and password')
    })  

    it('Login without User', function(){
        cy.reload()
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Supervisor').click()
        cy.get('[name="pass"]').type('1nt3gr4{enter}')
        cy.get('#toast-container').contains('Please enter a valid username and password')
    }) 

    it('Agent Successful Login', function(){
        cy.reload()
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Agent').click()
        cy.get('#cmbIdiomas_chosen').click() //Abro idiomas y veo cual esta seleccionado, siempre entro en Ingles
            cy.get('.chosen-results').contains("es").then(($language) => {
                if ($language.hasClass("result-selected")) {
                    cy.get('#cmbIdiomas_chosen > .chosen-drop > .chosen-results > [data-option-array-index="1"]').click() // ingles hardcodeado
                }
            })
        cy.get('[name="user"]').type('AutomationAgent')
        cy.get('[name="pass"]').type('123456{enter}')
        cy.location('href').should('contain', '/views/agent')
        cy.get('#mm-blocker').click()
        cy.get('#username').should('contain', 'AutomationAgent')
        cy.get('#btnLogOut').click()
    })  

    it('Supervisor successfull login', function() {
        cy.reload()
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Supervisor').click({force: true})
        cy.get('#cmbIdiomas_chosen').click() //Abro idiomas y veo cual esta seleccionado, siempre entro en Ingles
            cy.get('.chosen-results').contains("es").then(($language) => {
                if ($language.hasClass("result-selected")) {
                    cy.get('#cmbIdiomas_chosen > .chosen-drop > .chosen-results > [data-option-array-index="1"]').click() // ingles hardcodeado
                }
            })
        cy.get('[name="user"]').type('Integra')
        cy.get('[name="pass"]').type('1nt3gr4{enter}')
        cy.location('href').should('contain', '/views/portal')
        cy.get('#mm-blocker').click()
        cy.get('#username').should('contain', 'Integra')
        cy.get('#btnLogOut').click()
        cy.saveLocalStorage()
    })

})   