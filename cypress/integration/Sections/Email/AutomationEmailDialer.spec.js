context('Supervisor section', () => {

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
        cy.get('[name="user"]').type('SuperUserEmail')
        cy.get('[name="pass"]').type('123456{enter}')
        cy.location('href').should('contain', '203.ucontactcloud.com').then(($portal) => {
            if($portal.valueOf().includes('/views/portal')) {

            } else {
                cy.get('#btnLogin').click()
            }
        })
        cy.get('#mm-blocker').click()
        cy.get('#username').should('contain', 'SuperUserEmail')
        cy.saveLocalStorage()
    })
  //////////////////////////////
 // se configura el marcador //
//////////////////////////////
    
    it('Alta Email Sender', function() {
        cy.restoreLocalStorage()
        cy.get('#sideBarIcon').click()
        cy.get('#navigation > .menu > li:nth-child(2)').click()
        cy.get('#emailcampaigns').click()
        
        //Creación de campaña - verifico si ya existe
            cy.get('#tablaCampanasEmail_filter > label > input').type('AutomatedEmailSender')
            cy.get('#tablaAgentesEmail').then(($campaignresult) => {
                if($campaignresult.text().includes('AutomatedEmailSender')) {

                } else {
                    //Validación de campos obligatorios
                    cy.get('#guardarEmail').click()
                    cy.get('#toast-container').contains('Must type SMTP ip and port')
                    cy.get('#toast-container').contains('Must type a password')
                    cy.get('#toast-container').contains('Must type an email')
                    cy.get('#toast-container').contains('Must choose strategy')
                    cy.get('#toast-container').contains('Type service level')
                    cy.get('#toast-container').contains('Campaign name allows characters A-Z, 0-9, _ , - ')
                    //Completa los campos requeridos
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
        cy.wait(2000) // Este queda para que de tiempo de renderizar
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

    it('Add agent to campaigns', function() {
        cy.restoreLocalStorage()
        cy.get('#tabEmailMembers-tab').click()

        cy.get('#tablaCampMiembrosEmail_filter > label > input').type('AutomatedEmailSender')
        cy.get('#tablaCampMiembrosEmailBody > .gradeA > .sorting_1').click()
        cy.wait(2000)
        cy.get('#tablaMiembrosCampanaBody').then(($checkmember) => {
            if($checkmember.text().includes('AutomationAgent')){
                //already in the campaign
            } else {
                cy.get('#tablaMiembros_filter > label > input').type('AutomationAgent')
                cy.get('#agente_4070 > .sorting_1').click()
                cy.get('#btnAgregarWebChatMembers').click()
                cy.get('.toast').contains('Action performed successfully')
            }
        })
        cy.get('#tablaCampMiembrosEmailBody > .gradeA > .sorting_1').click()
        cy.get('#tablaCampMiembrosEmail_filter > label > input').clear().type('AutomatedEmailInbox')
        cy.get('#tablaCampMiembrosEmailBody > .gradeA > .sorting_1').click()
        cy.wait(2000)
        cy.get('#tablaMiembrosCampanaBody').then(($checkmemberin) => {
            if($checkmemberin.text().includes('AutomationAgent')){
                //already in the campaign  
            } else {
                cy.get('#tablaMiembros_filter > label > input').clear().type('AutomationAgent')
                cy.get('#agente_4070 > .sorting_1').click()
                cy.get('#btnAgregarWebChatMembers').click()
                cy.get('.toast').contains('Action performed successfully')
            }
        })
        cy.saveLocalStorage()
    })

    it('create disposition', function(){
        cy.restoreLocalStorage()
        cy.get('#dispositions').click()
        cy.get('#tableDispositions_filter > label > input').type('displevel1')
        cy.get('#tableDispositionsBody').then(($checkdispositions)=> {
            if($checkdispositions.text().includes('AutomatedEmailInbox')){

            } else {
                cy.get('#channelType_chosen').click()
                cy.get('.active-result').contains('email').click()
                cy.get('#channelCampaigns_chosen').click()
                cy.get('.active-result').contains('AutomatedEmailInbox').click()
                cy.get('#level1').type('displevel1')
                cy.get('#level2').type('displevel2')
                cy.get('#level3').type('displevel3')
                cy.get('#saveDisposition').click()
            }
        })
        
        cy.saveLocalStorage()
    })

    it('Alta email dialer', function(){
        cy.restoreLocalStorage()
        cy.get('#navigation > .menu > li:nth-child(5)').click()
        cy.get('#emaildialer').click()
        cy.wait(2000)
        // Verifica que no exista el marcador
        cy.get('#tablaDiscadoresEmailBody').then(($checkemaildialer)=> {
            if($checkemaildialer.text().includes('AutomatedEmailSender')) {
                //already exists
            } else {
                cy.get('#campanasEmail_chosen').click()
                cy.get('.active-result').contains('AutomatedEmailSender').click()
                cy.get('#guardarEmailDialer').click()
            }
        })
        cy.saveLocalStorage()
    })

    it('Modificate email dialer', function(){
        cy.restoreLocalStorage()
        cy.get('#tablaDiscadoresEmailBody').contains('AutomatedEmailSender').click()

        //Verifica si el marcador ya fue modificado
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
            }
            cy.get('#attachSchedule').then(($ischecked)=>{
                if($ischecked.prop('checked') == true) {
                    //already checked
                } else {
                    cy.get('#attachSchedule').click({force:true})
                    cy.get('#scheduleTitle').type('AutomatedSchedule')
                    cy.get('#scheduleOrganizer').type('Automation')
                    cy.get('#inputDate1').clear().type('2020-12-30 00:00:00')
                    cy.get('#inputDate2').clear().type('2020-12-31 00:00:00')
                    cy.get('#guardarEmailDialer').click()
                }
            })
            
        })
        cy.saveLocalStorage()
    })

    

    it('Upload email base', function(){
        cy.restoreLocalStorage()
        cy.get('#navigation2 .dropdown-toggle').contains('Dialers').click()
        cy.get('#emaildash').click()
        cy.get('#chosendiscadoresemail_chosen > .chosen-single > span').click()
        cy.get('.chosen-results').contains('AutomatedEmailSender').click()
        cy.get('#tablistas').click()

        cy.get('#emailbasestable').then(($checkemailbase) => {
            if($checkemailbase.text().includes('automationEmail')){
                // Base already uploaded
            } else {
                cy.request({
                    method: 'POST',
                    url: 'https://203.ucontactcloud.com/IntegraChannels/resources/DialersResources/uploadDialerBase', // baseUrl is prepended to url
                    form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
                    body: {
                        channel: 'email',
                        filename: 'automationEmail.csv',
                        fileb64: 'QXV0b21hdGVkRW1haWxTZW5kZXI7YXV0b21hdGlvbnRlc3RpbnRlZ3JhckBnbWFpbC5jb207RXN0ZSBlcyB1biBtZW5zYWplIGRlIGVqZW1wbG87OyJWYXIxIjoidmFsdWUiLCJWYXIyIjoidmFsdWUiOzk5OTk=',
                        dialer: 'AutomatedEmailSender',
                        cant: '1',
                    }
                })
                cy.get('.activateemailbase').click()
            }
            cy.get('#tabdash').click()
            cy.get('#playEmailDialer').click({force:true})
            cy.get('#noprocesadas').invoke('text').should('eq', '1')
            cy.get('#noprocesadas').invoke('text').should('eq', '0')
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
  /////////////////////////////////////////////
 // aqui se encuentra la seccion del agente //
/////////////////////////////////////////////
context('Agent section', () => {

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
        cy.saveLocalStorage()
    })

    it('Receive Email and Answer', function(){
        cy.restoreLocalStorage()
        // cy.wait(15000)
            cy.get(':nth-child(10) > .dropdown-toggle').click()
            cy.get('.interactiontitle').then(($senderemail) => {
                if($senderemail.text().includes('AutomatedEmailSender')) {
                    cy.get('.liInteraction').contains('AutomatedEmailSender').click()
                    cy.get('.tituloChatClass').contains('AutomatedEmailSender')
                    cy.get('.clickeableMail').first().click()
                    cy.get('.responseBody').first().click()
                    cy.get('.note-editable').type('The automated answer')
                    cy.get('.note-send').click()
                    cy.get('.closeInteraction').click()
                    cy.get('#modalTypLevel1').select('displevel1')
                    cy.get('#modalTypLevel2').select('displevel2')
                    cy.get('#modalTypLevel3').select('displevel3')
                    cy.get('#btnSaveDisposition').click()
                }
            })
            
            //Evaluar la respuesta del mail

            // cy.get(':nth-child(10) > .dropdown-toggle').click()
            // cy.get('#listaemails').then(($checkmail) => {
            //     if($checkmail.text().includes('AutomatedEmailInbox')) {
            //         cy.get('.liInteraction').click()
            //         cy.get('.closeInteraction').click()
            //         cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
            //     }
            // })

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

context('Deletes', () => {

    it('Supervisor Successful Login', function(){
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Supervisor').click()
        cy.get('#cmbIdiomas_chosen').click() //Abro idiomas y veo cual esta seleccionado, siempre entro en Ingles
            cy.get('.chosen-results').contains("es").then(($language) => {
                if ($language.hasClass("result-selected")) {
                    cy.get('#cmbIdiomas_chosen > .chosen-drop > .chosen-results > [data-option-array-index="1"]').click() // ingles hardcodeado
                }
            })
        cy.get('[name="user"]').clear().type('SuperUserEmail')
        cy.get('[name="pass"]').type('123456{enter}')
        cy.location('href').should('contain', '/views/portal')
        cy.get('#mm-blocker').click()
        cy.get('#username').should('contain', 'SuperUserEmail')
        cy.saveLocalStorage()
    })

    // it('Delete email dialer', function(){
    //     cy.restoreLocalStorage()
    //     cy.get('#sideBarIcon').click()
    //     cy.get('#navigation > .menu > li:nth-child(5)').click()
    //     cy.get('#emaildialer').click()
    //     cy.wait(2000)
    //     // Verifica que exista el marcador
    //     cy.get('#tablaDiscadoresEmailBody').then(($selectdialer)=> {
    //         if($selectdialer.text().includes('AutomatedEmailSender')) {
    //             cy.get('#tablaDiscadoresEmailBody').contains('AutomatedEmailSender').click()
    //             cy.get('#eliminarEmailDialer').click()
    //             cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
    //         }
    //     })
    //     cy.saveLocalStorage()
    // })

    it('Baja Email', function(){    
        cy.restoreLocalStorage()
        cy.get('#sideBarIcon').click()
        cy.get('#navigation > .menu > li:nth-child(2)').click()
        cy.get('#emailcampaigns').click()
        cy.wait(2000)
        cy.get('#tablaCampanasEmail_filter > label > input').clear({force:true}).type('AutomatedEmailSender')
        cy.get('#tablaAgentesEmail').then(($campaignresultout) => {
            if($campaignresultout.text().includes('AutomatedEmailSender')) {
                cy.get('.sorting_1').click()
                cy.get('#borrarEmail').click()
                cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
                cy.get('.toast-success')
            }
        })
        cy.wait(2000)
        cy.get('#tablaCampanasEmail_filter > label > input').clear().type('AutomatedEmailInbox')
        cy.get('#tablaAgentesEmail').then(($campaignresultin) => {
            if($campaignresultin.text().includes('AutomatedEmailInbox')) {
                cy.get('.sorting_1').click()
                cy.get('#borrarEmail').click()
                cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
                cy.get('.toast-success')
            }
        })
        cy.get('#current-user').click()
        cy.get('#btnLogoff').click()        
        cy.saveLocalStorage()
    })

}) 