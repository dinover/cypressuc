context('Voice dialer automation', () => {

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
        cy.get('[name="user"]').type('SuperUserVoice')
        cy.get('[name="pass"]').type('123456{enter}')
        cy.location('href').should('contain', '203.ucontactcloud.com').then(($portal) => {
            if($portal.valueOf().includes('/views/portal')) {

            } else {
                cy.get('#btnLogin').click()
            }
        })
        cy.get('#mm-blocker').click()
        cy.get('#username').should('contain', 'SuperUserVoice')
        cy.saveLocalStorage()
    })
  //////////////////////////////
 // se configura el marcador //
//////////////////////////////
    it('Alta PowerDialer', function(){
        cy.restoreLocalStorage()
        cy.get('#sideBarIcon').click()
        cy.get('#navigation > .menu > li:nth-child(5)').click()
        cy.get('#dialers').click()
        cy.get('#tablaDiscadores_filter > label > input').clear().type('AutomationDialerPD')
        cy.get('#tablaDiscadoresBody').then(($checkdialer) => {
            if($checkdialer.text().includes('AutomationDialerPD')) {

            } else {
                cy.get('#guardar').click()
                cy.get('#toast-container').contains('Must type Caller ID').click()
                cy.get('#toast-container').contains('Must type dial string').click()
                cy.get('#toast-container').contains('Must choose dialer type').click()
                cy.get('#tipoDiscador_chosen').click()
                cy.get('.active-result').contains('PowerDialer').click()
                cy.get('#nombreCampanaText').type('AutomationDialerPD')
                cy.get('#cadenaMarcado').type('SIP/uContact/')
                cy.get('#callerId').type('2345678')
                cy.get('#countries_chosen').click()
                cy.get('.active-result').contains('USA').click()
                cy.get('[for="rule_STATE"]').click()
                cy.get('#guardar').click()
                cy.get('#toast-container').contains('Dialer and campaign created , do not forget to add agents').click()
            }
        })

        cy.saveLocalStorage()
    })

    it('Dialer Modification', function(){
        cy.restoreLocalStorage()
        cy.wait(2000)
        cy.get('#tablaDiscadoresBody').contains('AutomationDialerPD').click()
        cy.get('#schedule-input > option').then(($fulltime) => {
            if($fulltime.text().includes('sun,mon,tue,wed,thu,fri,sat;00:00-23:59')) {
                // already fulltime set
            } else {
                cy.get('#schedule-add').click()
                cy.wait(2000)
                cy.get('.col-sm-6 > .checkbox > :nth-child(1) > label').click({multiple: true})
                cy.get('.col-sm-6 > .checkbox > :nth-child(2) > label').click({multiple: true})
                cy.get('.col-sm-6 > .checkbox > :nth-child(3) > label').click({multiple: true})
                cy.get('.col-sm-6 > .checkbox > :nth-child(4) > label').click({multiple: true})
                cy.get('.col-sm-6 > .checkbox > :nth-child(5) > label').click({multiple: true})
                cy.get('.col-sm-6 > .checkbox > :nth-child(6) > label').click({multiple: true})
                cy.get('.col-sm-6 > .checkbox > :nth-child(7) > label').click({multiple: true})
                cy.get('#schedule-from').clear().type('00:00').tab()
                cy.get('#schedule-to').clear().type('23:59').tab()
                cy.get('#schedule-aceptar').click({force:true})
                cy.get('#tbc_nocontact').clear().type('0')
                cy.get('#guardar').click()
            }
        })
  
        cy.saveLocalStorage()
    })


    it('Add agent to dialer', function(){
        cy.restoreLocalStorage()
        cy.get('#navigation > .menu > li:nth-child(2)').click()
        cy.get('#campaigns').click()
        // set dispositions active
        cy.get('#tablaVoiceCampaignsBody').contains('AutomationDialerPD').click()
        cy.get('#ui-id-3').click()
        cy.wait(2000)
        cy.get('#show_dispositions').click({force: true})
        cy.get('#guardar').click()
        cy.get('#tabVoiceMembers-tab').click()
        cy.wait(3000)
        cy.get('#tablaCampanasVoiceMemb_filter > label > input').clear().type('AutomationDialerPD')
        cy.get('#tablaCampanasVoiceMembBody > .gradeA > .sorting_1').click()
        cy.wait(3000)

        //Selecciono la campana a agregar el agente 
        //Si no hay agentes en la campana agrego al AutomationAgent
        //Si el agente se encuentra en la campana continuo 

            cy.get('#tablaMiembrosBody').then(($agentmember) => {
                if ($agentmember.text().includes('No data available in table')) {
                    cy.get('#tablaAgentesVoiceCamp_filter > label > input').type('AutomationAgent')
                    cy.get('#agente_4070 > .sorting_1').first().click()
                    cy.get('#btnAgregarVoiceMemb').click()
                    cy.get('#toast-container').contains('Action performed successfully')
                }
            })

        cy.saveLocalStorage()
    })

    it('create disposition', function(){
        cy.restoreLocalStorage()
        cy.get('#dispositions').click()
        cy.get('#tableDispositions_filter > label > input').type('displevel1')
        cy.get('#tableDispositionsBody').then(($checkdispositions)=> {
            if($checkdispositions.text().includes('AutomationDialerPD')){

            } else {
                cy.get('#channelType_chosen').click()
                cy.get('.active-result').contains('telephony').click()
                cy.get('#channelCampaigns_chosen').click()
                cy.get('.active-result').contains('AutomationDialerPD').click()
                cy.get('#level1').type('displevel1')
                cy.get('#level2').type('displevel2')
                cy.get('#level3').type('displevel3')
                cy.get('#saveDisposition').click()
                cy.wait(2000)
            }
        })
        
        cy.saveLocalStorage()
    })

    it('upload a base', function(){
        cy.restoreLocalStorage()
        cy.get('#navigation2 .dropdown-toggle').contains('Dialers').click()
        cy.get('#dialerdash').click()
        cy.get('#chosencampanas_chosen > .chosen-single > span').click()
        cy.get('.chosen-results').contains('AutomationDialerPD<-').click()
        cy.get('#tablistas').click()
        cy.get('#tablaListasBody').then(($havelist) => {
            if($havelist.text().includes('automationPD')) {
                //Have a list
            } 
            else  {
                cy.request({
                    method: 'POST',
                    url: 'https://203.ucontactcloud.com/Integra/resources/Dialers/uploadbase', // baseUrl is prepended to url
                    form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
                    body: {
                        filename: 'automationPD.csv',
                        fileb64: 'QXV0b21hdGlvbkRpYWxlclBEPC07OTk5NDQ0NDQ0O3N0YXRlPUtZOnZhcmlhYmxlMj12YWwyO0g9MD05OTk1NTU1NTU6Vz0wPTk5OTY2NjY2Njs5OTk5OwpBdXRvbWF0aW9uRGlhbGVyUEQ8LTs5OTkxMTExMTE7c3RhdGU9TlY6dmFyaWFibGUyPXZhbDI7OTk5MjIyMjIyOjk5OTMzMzMzMzs5OTk5OwpBdXRvbWF0aW9uRGlhbGVyUEQ8LTs5OTk3Nzc3Nzc7c3RhdGU9OnZhcmlhYmxlMj12YWwyOzk5OTg4ODg4ODo5OTk5OTk5OTk7OTk5OTs=',
                        campaign: 'AutomationDialerPD<-',
                        cant: '3',
                        username: 'SuperUserVoice',
                    }
                })
            }
        })
        cy.saveLocalStorage()
    })

    it('base modification', function(){
        cy.restoreLocalStorage()
        cy.wait(2000)

        // Corrobra lista activa
        cy.get('#tablaListasBody > tr:nth-child(1) > td:nth-child(4) > a').then(($activelist) => {
            if($activelist.hasClass('active-red')) {
                // already active
            } else {
                cy.get('#tablaListasBody > tr:nth-child(1) > td:nth-child(4)').click()
            }
        })

        // Fija prioridad        
        cy.get(':nth-child(1) > :nth-child(7) > .modalPorcentaje').click()
        cy.wait(2000)
        cy.get('#labelTotal').then(($prioritymeasure) => {
            //Define un valor numerico para la constante

            if ($prioritymeasure.text().includes('100')) {
                cy.get('#guardarPorcentajes').click()
            }
            else {
                cy.get('#labelTotal').invoke('text').then((text)=>{ 
                    var fullText = text;
                    var pattern = /[0-9]+/g;
                    var number = fullText.match(pattern);
                    console.log(number);
                    cy.get('.inputPercentage').first().clear().type(100 - number)    
                   })
                cy.get('#guardarPorcentajes').click()
            }
        })

        cy.saveLocalStorage()
    })

    it('delete bases and start dialer', function(){
        cy.restoreLocalStorage()
        cy.get('.btnDeleteBase').each(function(){
            cy.get('.btnDeleteBase').first().click()
            cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
            cy.wait(2000)
        })
        cy.get('#play').click()
        cy.saveLocalStorage()
    })

    it('Supervisor Successful Logout', function(){
        cy.restoreLocalStorage()
        cy.get('#current-user').click()
        cy.get('#btnLogoff').click() 
        cy.saveLocalStorage()
    })
})
  /////////////////////////////////////////////
 // aqui se encuentra la seccion del agente //
/////////////////////////////////////////////
context('Agent take call and disposition', () => {

    it('Agent Successful Login', function(){
        cy.restoreLocalStorage()
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Agent').click() //Selecciona Perfil

            cy.get('#cmbIdiomas_chosen').click() //Abro idiomas y veo cual esta seleccionado, siempre entro en Ingles
            cy.get('.chosen-results').contains("es").then(($language) => {
                if ($language.hasClass("result-selected")) {
                    cy.get('#cmbIdiomas_chosen > .chosen-drop > .chosen-results > [data-option-array-index="1"]').click() // ingles hardcodeado
                }
            })

        cy.get('[name="user"]').clear().type('AutomationAgent')
        cy.get('[name="pass"]').type('123456{enter}')
        cy.location('href').should('contain', '/views/agent')
        cy.get('#mm-blocker').click()

            cy.request({
                method: 'POST',
                url: 'https://203.ucontactcloud.com/Integra/resources/Dialers/uploadbase', // baseUrl is prepended to url
                form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
                body: {
                    filename: 'automationPD.csv',
                    fileb64: 'QXV0b21hdGlvbkRpYWxlclBEPC07OTk5MTExMTExO3N0YXRlPU5WOnZhcmlhYmxlMj12YWwyOzk5OTIyMjIyMjo5OTkzMzMzMzM7OTk5OQ==',
                    campaign: 'AutomationDialerPD<-',
                    cant: '1',
                    username: 'SuperUserVoice',
                }
            })

        cy.saveLocalStorage()
    })  

    it('New Disposition', function(){
        cy.restoreLocalStorage()
            cy.wait(3000)
            cy.get('#hangUpButton').click()
            cy.get('#modalTypLevel1').select('displevel1')
            cy.get('#modalTypLevel2').select('displevel2')
            cy.get('#modalTypLevel3').select('displevel3')
            // Lo siguiente sirve en caso de hacer reschedule
            // cy.get('#datetimepickerDispo > .input-group-addon').click()
            // cy.get('tbody > :nth-child(2) > .active').click()
            // cy.get('#datetimepickerDispo > .input-group-addon').click()
            cy.get('#btnSaveDisposition').click()
        cy.saveLocalStorage()
    })

    it('Agent Successful Logout', function(){
        cy.restoreLocalStorage()
        cy.get('#current-user').click()
        cy.get('#btnLogoff').click() 
        cy.saveLocalStorage()
    })  
})
  ///////////////////////////////////////////////////////////////
 // desde aqui comienza el final de la prueba, baja de dialer //
///////////////////////////////////////////////////////////////
context('Dialer deletes', () => {

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

        cy.get('[name="user"]').type('SuperUserVoice')
        cy.get('[name="pass"]').type('123456{enter}')
        cy.location('href').should('contain', '/views/portal')
        cy.get('#mm-blocker').click()
        cy.saveLocalStorage()
    })

    it('delete dialer', function(){
        cy.restoreLocalStorage()
        cy.get('#sideBarIcon').click()
        cy.get('#navigation > .menu > li:nth-child(5)').click()
        cy.get('#dialers').click()
        cy.get('#tablaDiscadores_filter > label > input').clear().type('AutomationDialerPD')
        cy.get('#tablaDiscadoresBody').contains('AutomationDialerPD').click()
        cy.get('#eliminar').click()
        cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
        cy.get('#toast-container').contains('Action performed successfully').click()
        cy.saveLocalStorage()
    })

    it('delete dispositions', function(){
        cy.restoreLocalStorage()
        cy.get('#navigation > .menu > li:nth-child(2)').click()
        cy.get('#dispositions').click()
        cy.get('#tableDispositions_filter > label > input').clear().type('displevel1')
        cy.get('#tableDispositionsBody').contains('AutomationDialerPD').click()
        cy.get('#deleteDisposition').click()
        cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
        cy.saveLocalStorage()
    })

    it('Supervisor Successful Logout', function(){
        cy.restoreLocalStorage()
        cy.get('#current-user').click()
        cy.get('#btnLogoff').click() 
        cy.saveLocalStorage()
    })  

}) 