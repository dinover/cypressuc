context('Agent actions', () => {
    
    it('Agent Successful Login', function(){
        cy.visit("https://oficina.ucontactcloud.com")
            cy.get('#cmbRol_chosen').click()
            cy.get('.active-result').contains('Agent').click() //Selecciona Perfilr
            cy.get('#cmbIdiomas_chosen').click() //Abro idiomas y veo cual esta seleccionado, siempre entro en Ingles
            cy.get('.chosen-results').contains("es").then(($language) => {
                if ($language.hasClass("result-selected")) {
                    cy.get('#cmbIdiomas_chosen > .chosen-drop > .chosen-results > [data-option-array-index="1"]').click() // ingles hardcodeado
                }
            })
            cy.get('[name="user"]').clear().type('AutomationAgentP1')
            cy.get('[name="pass"]').type('123456{enter}')
        cy.location('href').should('contain', '/views/agent')
        cy.get('#mm-blocker').click()
        cy.wait(2000)
        cy.saveLocalStorage()
    })  

    it('Agent Break/Resume', function(){
        cy.restoreLocalStorage()
            cy.get('#navigation > .menu > li.dropdown').eq(0).trigger('mouseover')
            cy.get('#Lunch').click()
            cy.get('[style=""] > .toast-message').click()
        cy.wait(3000)
            cy.get('#navigation > .menu > li.dropdown').eq(0).trigger('mouseover')
            cy.get('#Personal').click()
            cy.get('[style=""] > .toast-message').click()
        cy.wait(3000)
            cy.get('#navigation > .menu > li.dropdown').eq(0).trigger('mouseover')
            cy.get('#StopBreak').click()
            cy.get('[style=""] > .toast-message').click()
        cy.saveLocalStorage()
    })

    it('Make Call and Disposition', function(){
        cy.restoreLocalStorage()
        cy.get('#mainmenu').click()
            cy.get('[value="1"]').click()
            cy.get('[value="4"]').click()
            cy.get('[value="4"]').click()
            cy.get('[value="8"]').click()
            cy.get('[value="5"]').click()
            cy.get('[value="4"]').click()
            cy.get('#botoneraLlamada > #place_call').click()
        cy.saveLocalStorage()
    })

    it('New Disposition', function(){
        cy.restoreLocalStorage()
        cy.get('#mm-blocker').click()
            cy.get('#modalTypLevel1').select('level1')
            cy.get('#modalTypLevel2').select('level2')
            cy.get('#modalTypLevel3').select('level3')
            // Lo siguiente sirve en caso de hacer reschedule
            // cy.get('#datetimepickerDispo > .input-group-addon').click()
            // cy.get('tbody > :nth-child(2) > .active').click()
            // cy.get('#datetimepickerDispo > .input-group-addon').click()
            cy.get('#btnSaveDisposition').click()
        cy.saveLocalStorage()
    })

    it('Open Form and make disposition', function(){
        cy.restoreLocalStorage()
        
        // En esta seccion estamos haciendo hover en el desplegable de Forms.
        // cy.get('#navigation > ul > li:nth-child(5)').trigger('mouseover')        
        // cy.get('#formsMenu > :nth-child(1) > a').click()
        // cy.get('#navigation > ul > li:nth-child(5)').trigger('mouseout')     
        
        cy.get('#nameIframetab0')
        .then(function ($iframe) {
            const $body = $iframe.contents().find('body')

            cy.wrap($body)
            .find('#cmbRes2_chosen').click() // Primero debemos abrir el combo para encontrar sus resultados

            cy.wrap($body)
            .find('.chosen-results').contains('level2').click() // Luego hacemos find al padre inmediato al texto que buscamos.

            cy.wrap($body)
            .find('#cmbRes3_chosen').click() // Primero debemos abrir el combo para encontrar sus resultados

            cy.wrap($body)
            .find('.chosen-results').contains('level3').click() // Luego hacemos find al padre inmediato al texto que buscamos.

            cy.wrap($body)
            .find('#btnGuardar').click()

        })
        cy.wait(3000)
        cy.saveLocalStorage()
    })  

    it('Check Profile', function(){
        cy.restoreLocalStorage()
        cy.get('#current-user > .dropdown-toggle').click()
        cy.get('#btnPerfil').click()
        cy.get(':nth-child(3) > .listevento > .listinformacion').contains('Break Lunch')
        cy.get(':nth-child(3) > [data-i18n="ucontact.PERSONAL"]')
        cy.get('#modalProfile').click('left')
        cy.wait(3000)
        cy.saveLocalStorage()
    })

    it('Lock&Unlock', function(){
        cy.restoreLocalStorage()
        cy.get('#current-user > .dropdown-toggle').click()
        cy.get('#btnBloquear').click()
        cy.wait(3000)
        cy.get(':nth-child(1) > .input-group > .form-control').type('123456{enter}')
        cy.get('#imgAgentTop')
        cy.saveLocalStorage()
    })

    // it('Start SMS', function(){
    //     cy.restoreLocalStorage()
    //     cy.get('#startInteractionbutton').click({force: true})
    //     cy.get('[data-channel="sms"]').click({force: true})
    //     cy.get('#startsms-number').type('095876123')
    //     cy.get('#startsms-message').type('Hello World! :)')
    //     cy.get('#startsmsmodal').click()
    //     cy.saveLocalStorage()
    // })

    it('Agent Successful Logout', function(){
        cy.restoreLocalStorage()
        cy.get('#btnLogOut').click({force: true})
    })  

})   