context('Agentes Masivos y Supervisores', () => { 
    //Puede ser mejorado a futuro
    //Claro ejemplo seria: 
    //incluir todos los agentes en un mismo TestCase 
    //validar existencia de todos los  superusuarios

    it('Supervisor Successful Login', function(){
        cy.visit("https://203.ucontactcloud.com")
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Supervisor').click({force: true}) //Selecciona Perfil
            cy.get('#cmbIdiomas_chosen').click() //Abro idiomas y veo cual esta seleccionado, siempre entro en Ingles
            cy.get('.chosen-results').contains("es").then(($language) => {
                if ($language.hasClass("result-selected")) {
                    cy.get('#cmbIdiomas_chosen > .chosen-drop > .chosen-results > [data-option-array-index="1"]').click() // ingles hardcodeado
                }
            })
        cy.get('[name="user"]').type('Integra')
        cy.get('[name="pass"]').type('1nt3gr4{enter}')
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

    it('Alta de AutomationAgentP1', function(){
        cy.restoreLocalStorage()
        cy.get('#sideBarIcon').click()
        cy.get('#dropUsers').click()
        cy.get('#agents').click()
        //Filtro por el Agente que quiero crear 
        //Si la tabla esta en blanco lo creo 
        //Si existe continuo
        cy.get('#basicDataTable_filter > label > input').type('AutomationAgentP1')
        cy.get('#tablaAgentes').then(($agentcreation) => {
            if ($agentcreation.text().includes('No matching records found')) {
                cy.get('#contextoAgente_chosen > .chosen-single').click()
                cy.get('[data-option-array-index="2"]').click()
                cy.get('#nombreAgente').type('AutomationAgentP1')
                cy.get('#telefonoAgente').type('4001')
                cy.get('#passwordAgente').type('123456')
                cy.get('#submit').click()
            }
        })
        cy.wait(2000)
        cy.saveLocalStorage()
      })

      it('Alta de AutomationAgentP2', function(){
        cy.restoreLocalStorage()
        cy.get('[onclick="limpiarForm()"]').click()
        //Filtro por el Agente que quiero crear 
        //Si la tabla esta en blanco lo creo 
        //Si existe continuo
        cy.get('#basicDataTable_filter > label > input').clear().type('AutomationAgentP2')
        cy.get('#tablaAgentes').then(($agentcreation) => {
            if ($agentcreation.text().includes('No matching records found')) {
                cy.get('#contextoAgente_chosen > .chosen-single').click()
                cy.get('[data-option-array-index="2"]').click()
                cy.get('#nombreAgente').type('AutomationAgentP2')
                cy.get('#telefonoAgente').type('4002')
                cy.get('#passwordAgente').type('123456')
                cy.get('#submit').click()
            }
        })
        cy.wait(2000)
        cy.saveLocalStorage()
      })

      it('Alta de AutomationAgentP3', function(){
        cy.restoreLocalStorage()
        cy.get('[onclick="limpiarForm()"]').click()
        //Filtro por el Agente que quiero crear 
        //Si la tabla esta en blanco lo creo 
        //Si existe continuo
        cy.get('#basicDataTable_filter > label > input').clear().type('AutomationAgentP3')
        cy.get('#tablaAgentes').then(($agentcreation) => {
            if ($agentcreation.text().includes('No matching records found')) {
                cy.get('#contextoAgente_chosen > .chosen-single').click()
                cy.get('[data-option-array-index="2"]').click()
                cy.get('#nombreAgente').type('AutomationAgentP3')
                cy.get('#telefonoAgente').type('4003')
                cy.get('#passwordAgente').type('123456')
                cy.get('#submit').click()
            }
        })
        cy.wait(2000)
        cy.saveLocalStorage()
      })

      it('Alta de AutomationAgentP4', function(){
        cy.restoreLocalStorage()
        cy.get('[onclick="limpiarForm()"]').click()
        //Filtro por el Agente que quiero crear 
        //Si la tabla esta en blanco lo creo 
        //Si existe continuo
        cy.get('#basicDataTable_filter > label > input').clear().type('AutomationAgentP4')
        cy.get('#tablaAgentes').then(($agentcreation) => {
            if ($agentcreation.text().includes('No matching records found')) {
                cy.get('#contextoAgente_chosen > .chosen-single').click()
                cy.get('[data-option-array-index="2"]').click()
                cy.get('#nombreAgente').type('AutomationAgentP4')
                cy.get('#telefonoAgente').type('4004')
                cy.get('#passwordAgente').type('123456')
                cy.get('#submit').click()
            }
        })
        cy.wait(2000)
        cy.saveLocalStorage()
      })

      it('Alta de AutomationAgentP5', function(){
        cy.restoreLocalStorage()
        cy.get('[onclick="limpiarForm()"]').click()
        //Filtro por el Agente que quiero crear 
        //Si la tabla esta en blanco lo creo 
        //Si existe continuo
        cy.get('#basicDataTable_filter > label > input').clear().type('AutomationAgentP5')
        cy.get('#tablaAgentes').then(($agentcreation) => {
            if ($agentcreation.text().includes('No matching records found')) {
                cy.get('#contextoAgente_chosen > .chosen-single').click()
                cy.get('[data-option-array-index="2"]').click()
                cy.get('#nombreAgente').type('AutomationAgentP5')
                cy.get('#telefonoAgente').type('4005')
                cy.get('#passwordAgente').type('123456')
                cy.get('#submit').click()
            }
        })
        cy.wait(2000)
        cy.saveLocalStorage()
      })

    it('Alta Campaign', function(){
        cy.restoreLocalStorage()
        cy.get('#navigation > .menu > li:nth-child(2)').click()
        cy.get('#campaigns').click()
        cy.get('#tablaCampanas_filter > label > input').type('AutomationCampaign')
        cy.get('#tablaVoiceCampaignsBody').then(($campaignresult) => {
            // synchronously ask for the body's text
            // and do something based on whether it includes
            // another string
            if ($campaignresult.text().includes('No data available in table') || $campaignresult.text().includes('No matching records found')) {
              // yup found it
                cy.get(':nth-child(2) > .radio > label').click()
                cy.get('#nombre').type('AutomationCampaign')
                cy.get('#form_chosen').click()
                cy.get('.active-result').contains('PruebaDispositions').click()
                cy.get('#did').type('2987654')
                cy.get('#guardar').click()
            } else {
              // nope not here
              
            }
          })
        cy.saveLocalStorage()
    })

    it('Add agent to campaign', function(){
        cy.restoreLocalStorage()
        cy.get('#tabVoiceMembers-tab').click()
        cy.wait(3000)
        cy.get('#tablaCampanasVoiceMemb_filter > label > input').type('AutomationCampaign')
        cy.get('#tablaCampanasVoiceMembBody > .gradeA > .sorting_1').click()
        cy.wait(3000)
        //Selecciono la campana a agregar el agente 
        //Si no hay agentes en la campana agrego al AutomationAgent
        //Si el agente se encuentra en la campana continuo 
        cy.get('#tablaMiembrosBody').then(($agentmember) => {
            if ($agentmember.text().includes('AutomationAgentP5')) {

            } else {
                cy.get('#tablaAgentesVoiceCamp_filter > label > input').type('AutomationAgentP')
                cy.get('#agente_4001 > .sorting_1').click()
                cy.get('#agente_4002 > .sorting_1').click()
                cy.get('#agente_4003 > .sorting_1').click()
                cy.get('#agente_4004 > .sorting_1').click()
                cy.get('#agente_4005 > .sorting_1').click()
                cy.get('#btnAgregarVoiceMemb').click()
                cy.get('#toast-container').contains('Action performed successfully')
            }
        })
        cy.saveLocalStorage()
    })

    it('Add SuperUsers for all', function(){
        cy.restoreLocalStorage()
        cy.get('#dropUsers').click()
        cy.get('#users').click()
        cy.get('#tablaUsuariosData_filter > label > input').clear().type('SuperUser')
        cy.get('#tablaUsuarios').then(($superuser) => {
            if ($superuser.text().includes('SuperUserVoice') || $superuser.text().includes('SuperUserEmail')) {
                
            } else {
                cy.get('#inputUsuario').type("SuperUserVoice")
                cy.get('#inputContrasena').type('123456')
                cy.get('#inputConfirmarContrasena').type('123456')
                cy.get('#submitUsuario').click()

                cy.get('#inputUsuario').type("SuperUserEmail")
                cy.get('#inputContrasena').type('123456')
                cy.get('#inputConfirmarContrasena').type('123456')
                cy.get('#submitUsuario').click()

                cy.get('#inputUsuario').type("SuperUserSMS")
                cy.get('#inputContrasena').type('123456')
                cy.get('#inputConfirmarContrasena').type('123456')
                cy.get('#submitUsuario').click()

                cy.get('#inputUsuario').type("SuperUserWebchat")
                cy.get('#inputContrasena').type('123456')
                cy.get('#inputConfirmarContrasena').type('123456')
                cy.get('#submitUsuario').click()
            }
        })        
        cy.saveLocalStorage()
    })

    it('logout', function(){
        cy.restoreLocalStorage()
        cy.get('#current-user').click()
        cy.get('#btnLogoff').click() 
        cy.saveLocalStorage()
    })

})