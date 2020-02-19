context('SMS Functions', () => {

    it('Supervisor Successful Login', function(){
        cy.visit("https://203.ucontactcloud.com")
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Supervisor').click()
        cy.get('#cmbIdiomas_chosen').click() //Abro idiomas y veo cual esta seleccionado, siempre entro en Ingles
            cy.get('.chosen-results').contains("es").then(($language) => {
                if ($language.hasClass("result-selected")) {
                    cy.get('#cmbIdiomas_chosen > .chosen-drop > .chosen-results > [data-option-array-index="1"]').click() // ingles hardcodeado
                }
            })
        cy.get('[name="user"]').type('SuperUserSMS')
        cy.get('[name="pass"]').type('123456{enter}')
        cy.wait(3000)
        cy.location('href').should('contain', '203.ucontactcloud.com').then(($portal) => {
            if($portal.valueOf().includes('/views/portal')) {

            } else {
                cy.get('#btnLogin').click()
            }
        })
        cy.get('#mm-blocker').click()
        cy.get('#username').should('contain', 'SuperUserSMS')
        cy.saveLocalStorage()
    })

    //Aquí deberiamos incluir un alta de Proveedor SMS - Quedo!
    it('Alta SMS Provider', function(){
        cy.restoreLocalStorage()
        cy.get('#sideBarIcon').click()
        cy.get('#navigation > .menu > li:nth-child(3)').click()
        cy.get('#smsproviders').click()
    //Verifico si proveedor está creado
    cy.get('#smsProviderTable_filter > label > input').type('AutomaticProvider')
    cy.get('#smsProviderTableBody').then(($checkprovider) => {
        if($checkprovider.text().includes('AutomaticProvider')){

        } else {
            cy.get('#smsProvider_chosen > .chosen-single > span').click()
            cy.get('.active-result').contains('URLSMS').click()
            cy.get('#namePovider').type('AutomaticProvider')
            cy.get('[placeholder="URL"]').type('autourl.com')
            cy.get('[placeholder="SMS From"]').type('46499414')
            cy.get('[placeholder="SMS RegExp"]').type('.')
            cy.get('#submit').click()
        }
    })
        cy.saveLocalStorage()
    })

    it('Alta SMS', function(){
        cy.restoreLocalStorage()
        cy.get('#navigation > .menu > li:nth-child(2)').click()
        cy.get('#smscampaigns').click({force:true})
        cy.get('#tablaCampanas_filter > label > input').type('AutomatedSMSChannel')
        cy.get('#tablaAgentes').then(($campaignresult) => {
            if($campaignresult.text().includes('AutomatedSMSChannel')) {

            } else {
                cy.get('#nombre').type('AutomatedSMSChannel')
                cy.get('#smsProviders_chosen').click()
                cy.get('.chosen-drop').contains('AutomaticProvider').click() //Esto debe ser optimizado en algun momento ya que esta hardcodeado//
                cy.get('#estrategia_chosen').click()
                cy.get('.chosen-results').find('[data-option-array-index="7"]').click()
                cy.get('#nivelServicio').type('10')
                cy.get('#didports').type('Web')
                cy.get('#guardar').click()
                cy.get('.toast').contains('Action performed successfully').click()
            }
        })
        cy.request('Integra/resources/InboundSMS/ReceiveURLSMS/phone=095987123&message=Hello+World')
        cy.request('Integra/resources/InboundSMS/ReceiveURLSMS/phone=095987123&message=Hello+World')
        cy.request('Integra/resources/InboundSMS/ReceiveURLSMS/phone=095987123&message=Hello+World')
        cy.saveLocalStorage()
    })

    it('Add agent to campaign', function(){
        cy.restoreLocalStorage()
        cy.get('#tabSMSMembers-tab').click()
        cy.get('#tablaCampMiembrosSMS_filter > label > input').type('AutomatedSMSChannel')
        cy.get('#tablaCampMiembrosSMSBody > .gradeA > .sorting_1').click()
        cy.wait(2000)
        cy.get('#tablaMiembrosCampanaBody').then(($checkmember) => {
            if($checkmember.text().includes('AutomationAgent')){
                
            } else {
                cy.get('#tablaMiembros_filter > label > input').type('Automation')
                cy.get('#agente_4070 > .sorting_1').click()
                cy.get('#btnAgregarSMSMembers').click()
                cy.get('.toast').contains('Action performed successfully')
            }
        })
        cy.saveLocalStorage()
    })

    it('Supervisor Successful Logout', function(){
        cy.restoreLocalStorage()
        cy.get('#current-user').click()
        cy.get('#btnLogoff').click() 
        cy.saveLocalStorage()
    })  
})

context('Agent take SMS', () => {

    it('Agent Successful Login', function(){
        cy.restoreLocalStorage()
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Agent').click()
        cy.get('#cmbIdiomas_chosen').click() //Abro idiomas y veo cual esta seleccionado, siempre entro en Ingles
            cy.get('.chosen-results').contains("es").then(($language) => {
                if ($language.hasClass("result-selected")) {
                    cy.get('#cmbIdiomas_chosen > .chosen-drop > .chosen-results > [data-option-array-index="1"]').click() // ingles hardcodeado
                }
            })
        cy.get('[name="user"]').clear().type('AutomationAgent')
        cy.get('[name="pass"]').clear().type('123456{enter}')
        cy.location('href').should('contain', '/views/agent')
        cy.get('#mm-blocker').click()
        cy.saveLocalStorage()
    })  

    it('Start SMS', function(){
        cy.restoreLocalStorage()
        cy.get('#startInteractionbutton').click({force: true})
        cy.get('[data-channel="sms"]').click({force: true})
        cy.get('#startsms-number').type('095876123')
        cy.get('#startsms-message').type('Hello World! :)')
        cy.get('#startsmsmodal').click()
        // cy.wait(4000)
        cy.get('.closeInteraction').click()
        cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
        // cy.get('#btnLogOut').click()
        cy.saveLocalStorage()
    })

    // Esta sección hay que revisarla ya que no están cayendo los sms a uContact. - Quedo!! hay que modificar el wait

    it('Agent take interaction', function(){
        cy.restoreLocalStorage()
        // cy.wait(20000)
        cy.get(':nth-child(7) > .dropdown-toggle').click()
        cy.get('.liInteraction').first().click()
        cy.get('.contentInteraction')
        cy.get('.emoji-wysiwyg-editor').type('How can I help you?{enter}')
        cy.get('.closeInteraction').click()
        cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
        cy.saveLocalStorage()
    })

    it('Agent Successful Logout', function(){
        cy.restoreLocalStorage()
        cy.get('#current-user').click()
        cy.get('#btnLogoff').click() 
    })  
})

context('SMS deletes', () => {

    it('Supervisor Successful Login', function(){
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Supervisor').click()
        cy.get('[name="user"]').clear().type('SuperUserSMS')
        cy.get('[name="pass"]').clear().type('123456{enter}')
        cy.location('href').should('contain', '/views/portal')
        cy.get('#mm-blocker').click()
        cy.saveLocalStorage()
    })

    it('Baja SMS', function(){
        cy.restoreLocalStorage()
        cy.get('#sideBarIcon').click()
        cy.get('#navigation > .menu > li:nth-child(2)').click()
        cy.get('#smscampaigns').click({force:true})
        cy.get('#tablaCampanas_filter > label > input').clear().type('AutomatedSMSChannel')
            cy.get('.sorting_1').click()
            cy.get('#borrar').click()
            cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
            cy.get('.toast') 
        cy.get('#btnLogOut').click()
        cy.saveLocalStorage()
    })

})