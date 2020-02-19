context('Email Automation', () => {
// Se comentan los wait para que queden mientras usamos la configuración con timeout 30000

    it('Supervisor successfull login', function() {
        cy.visit("https://203.ucontactcloud.com")
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Supervisor').click({force: true})
        cy.get('#cmbIdiomas_chosen').click() //Abro idiomas y veo cual esta seleccionado, siempre entro en Ingles
            cy.get('.chosen-results').contains("es").then(($language) => {
                if ($language.hasClass("result-selected")) {
                    cy.get('#cmbIdiomas_chosen > .chosen-drop > .chosen-results > [data-option-array-index="1"]').click() // ingles hardcodeado
                }
            })
        cy.get('[name="user"]').type('SuperUserEmail')
        cy.get('[name="pass"]').type('123456{enter}')
        cy.wait(3000)
        cy.location('href').should('contain', '203.ucontactcloud.com').then(($portal) => {
            if($portal.valueOf().includes('/views/portal')) {

            } else {
                cy.get('#btnLogin').click()
            }
        })
        cy.get('#mm-blocker').click()
        cy.saveLocalStorage()
    })

    it('Alta Email Sender', function() {
        cy.restoreLocalStorage()
        cy.get('#sideBarIcon').click()
        cy.get('#navigation > .menu > li:nth-child(2)').click()
        cy.get('#emailcampaigns').click()

        //Validación de campos obligatorios
            cy.get('#guardarEmail').click()
                cy.get('#toast-container').contains('Must type SMTP ip and port')
                cy.get('#toast-container').contains('Must type a password')
                cy.get('#toast-container').contains('Must type an email')
                cy.get('#toast-container').contains('Must choose strategy')
                cy.get('#toast-container').contains('Type service level')
                cy.get('#toast-container').contains('Campaign name allows characters A-Z, 0-9, _ , - ')
        
        //Creación de campaña - verifico si ya existe
            cy.get('#tablaCampanasEmail_filter > label > input').type('AutomatedEmailSender')
            cy.get('#tablaAgentesEmail').then(($campaignresult) => {
                if($campaignresult.text().includes('AutomatedEmailSender')) {

                } else {
                    cy.get('#nombreEmail').type('AutomatedEmailSender')
                    cy.get('#nivelServicioEmail').type('12')
                    cy.get('#estrategiaEmail_chosen').click()
                    cy.get('.chosen-results').contains('ringall').click()
                    cy.get('#accountEmail').type('automationtestintegra@gmail.com')
                    cy.get('#passwordEmail').type('4u70m4710n')
                    cy.get('#outbondSMTPEmail').type('smtp.gmail.com')
                    cy.get('#smtpEmailPort').type('587')
                    cy.get('#inboundINAPEmail').type('imap.gmail.com')
                    cy.get('#imapEmailPort').type('993')
                    cy.get('#guardarEmail').click()
                }
            })         
        cy.wait(3000) // Este queda para que de tiempo de renderizar
        cy.saveLocalStorage()
    })

    it('Alta Email Inbox', function() {
        cy.restoreLocalStorage()
        //Creación de campaña
            cy.get('#tablaCampanasEmail_filter > label > input').clear().type('AutomatedEmailInbox')
            cy.get('#tablaAgentesEmail').then(($campaignresultin) => {
                if($campaignresultin.text().includes('AutomatedEmailInbox')) {

                } else {
                    cy.get('#nombreEmail').type('AutomatedEmailInbox')
                    cy.get('#nivelServicioEmail').type('12')
                    cy.get('#estrategiaEmail_chosen').click()
                    cy.get('.chosen-results').contains('ringall').click()
                    cy.get('#accountEmail').type('automationtestintegrar@gmail.com')
                    cy.get('#passwordEmail').type('4u70m4710n')
                    cy.get('#outbondSMTPEmail').type('smtp.gmail.com')
                    cy.get('#smtpEmailPort').type('587')
                    cy.get('#inboundINAPEmail').type('imap.gmail.com')
                    cy.get('#imapEmailPort').type('993')
                    cy.get('#guardarEmail').click()
                }
            })         
        cy.saveLocalStorage()
    })

    it('Add agent to campaign', function() {
        cy.restoreLocalStorage()
        cy.get('#tabEmailMembers-tab').click()

        cy.get('#tablaCampMiembrosEmail_filter > label > input').type('AutomatedEmailSender')
        cy.get('#tablaCampMiembrosEmailBody > .gradeA > .sorting_1').click()
        cy.wait(3000)
        cy.get('#tablaMiembrosCampanaBody').then(($checkmember) => {
            if($checkmember.text().includes('AutomationAgentP2')){

            } else {
                cy.get('#tablaMiembros_filter > label > input').type('AutomationAgentP2')
                cy.get('#agente_4002 > .sorting_1').click()
                cy.get('#btnAgregarWebChatMembers').click()
                cy.get('.toast').contains('Action performed successfully')
            }
        })
        cy.get('#tablaCampMiembrosEmailBody > .gradeA > .sorting_1').click()
        cy.get('#tablaCampMiembrosEmail_filter > label > input').clear().type('AutomatedEmailInbox')
        cy.get('#tablaCampMiembrosEmailBody > .gradeA > .sorting_1').click()
            // cy.wait(3000)
            cy.get('#tablaMiembrosCampanaBody').then(($checkmemberin) => {
                if($checkmemberin.text().includes('AutomationAgentP3')){
                    cy.get('#current-user').click()
                    cy.get('#btnLogoff').click()  
                } else {
                    cy.get('#tablaMiembros_filter > label > input').clear().type('AutomationAgentP3')
                    cy.get('#agente_4003 > .sorting_1').click()
                    cy.get('#btnAgregarWebChatMembers').click()
                    cy.get('.toast').contains('Action performed successfully')
                    cy.get('#current-user').click()
                    cy.get('#btnLogoff').click()  
                }
        })
        cy.saveLocalStorage()
    })
})

context('Agent send and dispositions', () => {

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
        cy.get('[name="user"]').clear().type('AutomationAgentP1')
        cy.get('[name="pass"]').clear().type('123456{enter}')
        cy.location('href').should('contain', '/views/agent')
        cy.get('#mm-blocker').click()
        cy.saveLocalStorage()
    })

    it('Start Email', function(){
        cy.restoreLocalStorage()
        cy.get('#startInteractionbutton').click({force: true})
        cy.get('[data-channel="email"]').click({force: true})
        cy.wait(3000) //este queda para que termine de renderizar el modal
        cy.get('#startemail-adress').type('automationtestintegrar@gmail.com')
        cy.get('#email-campaign').select('AutomatedEmailSender')
        cy.get('#startemail-subject').type('Hi world!')
        cy.get('.note-editable').type('This is an automated email')
        cy.get('#startemalimodal').click()
        cy.get('.toast').then(($verifysent) => {
            if($verifysent.text().includes('Starting interaction...')) {
                cy.get('.closeInteraction').click()
                cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
            } else {
                cy.get('#startemail-subject').type('Sorry world!')
                cy.get('#startemalimodal').click()
                cy.get('.closeInteraction').click()
                cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
            }
        })
       
        // cy.wait(6000)
        cy.saveLocalStorage()
    })

    it('Receive Email and Answer', function(){
        cy.restoreLocalStorage()
        // cy.wait(15000)
            cy.get(':nth-child(10) > .dropdown-toggle').click()
            cy.get('.liInteraction').click()
            cy.get('.tituloChatClass').contains('AutomatedEmailSender')
            cy.get('.clickeableMail').first().click()
            cy.get('.responseBody').first().click()
            cy.get('.note-editable').type('The automated answer')
            cy.get('.note-send').click()
            cy.get('.closeInteraction').click()
            cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
            cy.get(':nth-child(10) > .dropdown-toggle').click()
            cy.get('#listaemails').then(($checkmail) => {
                if($checkmail.text().includes('AutomatedEmailInbox')) {
                    cy.get('.liInteraction').click()
                    cy.get('.closeInteraction').click()
                    cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
                }
            })
        cy.saveLocalStorage()
    })

    it('Agent Successful Logout', function(){
        cy.restoreLocalStorage()
        cy.get('#current-user').click()
        cy.get('#btnLogoff').click() 
        cy.saveLocalStorage()
    })  
})
context('Email deletes', () => {

    it('Supervisor successfull login', function() {
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Supervisor').click({force: true})
        cy.get('#cmbIdiomas_chosen').click() //Abro idiomas y veo cual esta seleccionado, siempre entro en Ingles
            cy.get('.chosen-results').contains("en").then(($language) => {
                if ($language.hasClass("result-selected")) {

                } else {
                    cy.get('#cmbIdiomas_chosen > .chosen-drop > .chosen-results > [data-option-array-index="1"]').click() // ingles hardcodeado
                }
            })
        cy.get('[name="user"]').clear().type('SuperUserEmail')
        cy.get('[name="pass"]').clear().type('123456{enter}')
        cy.location('href').should('contain', '/views/portal')
        cy.get('#mm-blocker').click()
        cy.saveLocalStorage()
    })

    it('Baja Email', function(){
        cy.restoreLocalStorage()
        cy.get('#sideBarIcon').click()
        cy.get('#navigation > .menu > li:nth-child(2)').click()
        cy.get('#emailcampaigns').click({force:true})
        cy.get('#tablaCampanasEmail_filter > label > input').clear().type('AutomatedEmailSender')
        cy.get('#tablaAgentesEmail').then(($campaignresultout) => {
            if($campaignresultout.text().includes('AutomatedEmailSender')) {
                cy.get('.sorting_1').click()
                cy.get('#borrarEmail').click()
                cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
                cy.get('.toast-success').click()
            }
        })
        cy.wait(3000)
        cy.get('#tablaCampanasEmail_filter > label > input').clear().type('AutomatedEmailInbox')
        cy.get('#tablaAgentesEmail').then(($campaignresultin) => {
            if($campaignresultin.text().includes('AutomatedEmailInbox')) {
                cy.get('.sorting_1').click()
                cy.get('#borrarEmail').click()
                cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
                cy.get('.toast-success').click()
            }
        })
        cy.get('#current-user').click()
        cy.get('#btnLogoff').click()        
        cy.saveLocalStorage()
    })
})