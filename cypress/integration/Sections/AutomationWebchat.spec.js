context('Automation Webchat', () => {

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
        cy.get('[name="user"]').type('SuperUserWebchat')
        cy.get('[name="pass"]').type('123456{enter}')
        cy.location('href').should('contain', '203.ucontactcloud.com').then(($portal) => {
            if($portal.valueOf().includes('/views/portal')) {

            } else {
                cy.get('#btnLogin').click()
            }
        })
        cy.get('#mm-blocker').click()
        cy.get('#username').should('contain', 'SuperUserWebchat')
        cy.saveLocalStorage()
    })

    it('Alta de Agente', function(){
        cy.restoreLocalStorage()
        cy.get('#sideBarIcon').click()
        cy.get('#dropUsers').click()
        cy.get('#agents').click()
        //Filtro por el Agente que quiero crear 
        //Si la tabla esta en blanco lo creo 
        //Si existe continuo
        cy.get('#basicDataTable_filter > label > input').type('AutomationAgent2')
        cy.get('#tablaAgentes').then(($agentcreation) => {
            if ($agentcreation.text().includes('No matching records found')) {
                cy.get('#contextoAgente_chosen > .chosen-single').click()
                cy.get('[data-option-array-index="2"]').click()
                cy.get('#nombreAgente').type('AutomationAgent2')
                cy.get('#telefonoAgente').type('4080')
                cy.get('#passwordAgente').type('123456')
                cy.get('#submit').click()
            }
        })
        cy.saveLocalStorage()
    })

    it('Add agent to voice campaign', function(){
        cy.restoreLocalStorage()
        cy.get('#navigation > .menu > li:nth-child(2)').click()
        cy.get('#campaigns').click()
        cy.get('#tabVoiceMembers-tab').click()
        cy.wait(3000)
        cy.get('#tablaCampanasVoiceMemb_filter > label > input').type('AutomationCampaign')
        cy.get('#tablaCampanasVoiceMembBody > .gradeA > .sorting_1').click()
        cy.wait(3000)
        //Selecciono la campana a agregar el agente 
        //Si no hay agentes en la campana agrego al AutomationAgent
        //Si el agente se encuentra en la campana continuo 
        cy.get('#tablaMiembrosBody').then(($agentmember) => {
            if ($agentmember.text().includes('AutomationAgent2')) {
                
            } else {
                cy.get('#tablaAgentesVoiceCamp_filter > label > input').type('AutomationAgent2')
                cy.get('#agente_4080 > .sorting_1').first().click()
                cy.get('#btnAgregarVoiceMemb').click()
                cy.get('#toast-container').contains('Action performed successfully')
            }
        })
        cy.saveLocalStorage()
    })

    it('Create webchat campaign', function(){
        cy.restoreLocalStorage()
        cy.get('#navigation > .menu > li:nth-child(2)').click()
        cy.get('#webchatcampaigns').click()
        cy.get('#tablaCampanas_filter > label > input').type('AutomatedWebchat')
        cy.get('#tablaCampWebChat').then(($checkcampaign) => {
            if($checkcampaign.text().includes('AutomatedWebchat')) {

            } else {
                //Validate and Create
                cy.get('#guardarCampWebChat').click()
                cy.get('.toast').contains('Must type name') // Nombre
                cy.get('#nombreCampWebChat').type('AutomatedWebchat')
                cy.get('#guardarCampWebChat').click()
                cy.get('.toast').contains('Must choose strategy') // Estrategia
                cy.get('#estrategiaCampWebChat_chosen').click()
                cy.get('.chosen-results').contains('ringall').click()
                cy.get('#guardarCampWebChat').click()
                cy.get('.toast').contains('Type service level') // Nivel de Servicio
                cy.get('#nivelServicioCampWebChat').type('12')
                cy.get('#guardarCampWebChat').click()
            }
        })        
        cy.saveLocalStorage()
    })

    it('Add agent to campaign', function(){
        cy.restoreLocalStorage()
        cy.get('#tabWebChatMembers-tab').click()
        cy.get('#tablaCampMiembrosWebChat_filter > label > input').type('AutomatedWebchat')
        cy.get('#tablaCampMiembrosWebChatBody').contains('AutomatedWebchat').click()
        cy.wait(3000)
        cy.get('#tablaMiembrosCampanaBody').then(($checkmember) => {
            if($checkmember.text().includes('AutomationAgent')) {
                // cy.get('#current-user').click()
                // cy.get('#btnLogoff').click()
            } else {
                cy.get('#tablaMiembros_filter > label > input').type('AutomationAgent')
                cy.get('#tablaMiembrosBody').contains('AutomationAgent').click()
                cy.get('#btnAgregarWebChatMembers').click()
                // cy.get('#current-user').click()
                // cy.get('#btnLogoff').click() 
            }
        })
        cy.get('#tablaMiembrosCampanaBody').then(($checkmember2) => {
            if($checkmember2.text().includes('AutomationAgent2')) {
                cy.get('#current-user').click()
                cy.get('#btnLogoff').click()
            } else {
                cy.get('#tablaMiembros_filter > label > input').clear().type('AutomationAgent2')
                cy.get('#tablaMiembrosBody').contains('AutomationAgent2').click()
                cy.get('#btnAgregarWebChatMembers').click()
                cy.get('#current-user').click()
                cy.get('#btnLogoff').click() 
            }
        })
        cy.saveLocalStorage()
    })
})

context('Start interaction and answer', () => {

    it('Agent2 login', function(){
        cy.restoreLocalStorage()
        // Inicio sesion como agente2
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Agent').click()
        cy.get('#cmbIdiomas_chosen').click() //Abro idiomas y veo cual esta seleccionado, siempre entro en Ingles
            cy.get('.chosen-results').contains("es").then(($language) => {
                if ($language.hasClass("result-selected")) {
                    cy.get('#cmbIdiomas_chosen > .chosen-drop > .chosen-results > [data-option-array-index="1"]').click() // ingles hardcodeado
                }
            })
        cy.get('[name="user"]').clear().type('AutomationAgent2')
        cy.get('[name="pass"]').clear().type('123456{enter}')
        cy.location('href').should('contain', '/views/agent')
        cy.get('#mm-blocker').click()
        cy.saveLocalStorage()
    })

    it('Sending webchat', function() {
        cy.restoreLocalStorage()
        // Ahora hago visit para que el agente quede rergistrado y figure disponible
            cy.visit("https://203.ucontactcloud.com/webchatclient/example.html?campaign=AutomatedWebchat")
            cy.wait(3000)
            cy.get('#integrawebchatmaindivcontent').then(($isopen) => {
                if($isopen.hasClass('isWebchatOpen')) {
    
                } else {
                    cy.get('#startChat').click()
                }
            })
        
            cy.get('#iframeWebChat')
            .then(function ($iframe) {
                const $body = $iframe.contents().find('body')
    
                cy.wrap($body)
                .contains('Nombre').type('John Doe')
    
                cy.wrap($body)
                .find("label:contains('Correo Electrónico')").type('Auto@email.com')
    
                cy.wrap($body)
                .find("label:contains('Teléfono')").type('25118187')
    
                cy.wrap($body)
                .find("label:contains('Escribe tu mensaje...')").type('Hi, i need some help dude!')
    
                cy.wrap($body)
                .find('#btnEnviar').click()
    
            })
            
            cy.saveLocalStorage()
        })

    it('Agent1 login', function(){
        cy.restoreLocalStorage()
        // Inicio sesion como agente2
        cy.visit("https://203.ucontactcloud.com")
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
        })

    it('Take interaction and close it', function(){
        cy.get('.quick-actions > :nth-child(5) > .dropdown-toggle').click()
        cy.get('.interactiontitle').contains('John Doe').click()
        cy.get('.closeInteraction').click()
        cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
        cy.saveLocalStorage()
    })

    it('Agent Successful Logout', function(){
        cy.restoreLocalStorage()
        cy.get('#current-user').click()
        cy.get('#btnLogoff').click() 
        cy.saveLocalStorage()
    })  
})

context('Webchat Deletes', () => {

    it('Supervisor successfull login', function() {
        cy.restoreLocalStorage()
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Supervisor').click({force: true})
        cy.get('#cmbIdiomas_chosen').click() //Abro idiomas y veo cual esta seleccionado, siempre entro en Ingles
            cy.get('.chosen-results').contains("es").then(($language) => {
                if ($language.hasClass("result-selected")) {
                    cy.get('#cmbIdiomas_chosen > .chosen-drop > .chosen-results > [data-option-array-index="1"]').click() // ingles hardcodeado
                }
            })
        cy.get('[name="user"]').clear().type('SuperUserWebchat')
        cy.get('[name="pass"]').type('123456{enter}')
        cy.location('href').should('contain', '/views/portal')
        cy.get('#mm-blocker').click()
        cy.get('#username').should('contain', 'SuperUserWebchat')
        cy.saveLocalStorage()
    })

    it('Delet campaign', function(){
        cy.restoreLocalStorage()
        cy.get('#sideBarIcon').click()
        cy.get('#navigation > .menu > li:nth-child(2)').click()
        cy.get('#webchatcampaigns').click()
        cy.get('#tablaCampanas_filter > label > input').clear().type('AutomatedWebchat')
        cy.get('#tablaCampWebChat').contains('AutomatedWebchat').click()
        cy.get('#borrarCampWebChat').click()
        cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
        cy.saveLocalStorage()
    })

    it('Delete agent2', function(){
        cy.restoreLocalStorage()
        cy.get('#dropUsers').click()
        cy.get('#agents').click()
        //Filtro por el Agente que quiero eliminar 
        cy.get('#basicDataTable_filter > label > input').clear().type('AutomationAgent2')
        cy.get('#tablaAgentes').contains('AutomationAgent2').click()
        cy.get('.btn-danger').click()
        cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
        cy.get('#current-user').click()
        cy.get('#btnLogoff').click() 
    })
})