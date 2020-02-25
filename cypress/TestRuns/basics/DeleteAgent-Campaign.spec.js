context('Delete Automation Agent', () => {

    it('Supervisor Successful Login', function(){
        cy.visit("https://oficina.ucontactcloud.com")
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
        cy.location('href').should('contain', 'oficina.ucontactcloud.com').then(($portal) => {
            if($portal.valueOf().includes('/views/portal')) {

            } else {
                cy.get('#btnLogin').click()
            }
        })
        cy.get('#mm-blocker').click()
        cy.saveLocalStorage()
    })  

    it('Baja de Agente', function(){
        cy.restoreLocalStorage()
        cy.get('#sideBarIcon').click()
        cy.get('#dropUsers').click()
        cy.get('#agents').click()
        cy.get('#basicDataTable_filter > label > input').clear().type('AutomationAgent')
        cy.get('.sorting_1').click()
        cy.get('.btn-danger').click()
        cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
        cy.saveLocalStorage()
    })

    it('Baja de Campaigns', function(){
        cy.restoreLocalStorage()
        cy.get('#navigation > .menu > li:nth-child(2)').click()
        cy.get('#campaigns').click()
        cy.get('#tablaCampanas_filter > label > input').clear()
        cy.get('#tablaCampanas_filter > label > input').type('AutomationCampaign')
        cy.get('.sorting_1').contains('AutomationCampaign').click()
        cy.get('#borrar').click()
        cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
        cy.get('#btnLogOut').click({force: true})
    })

})