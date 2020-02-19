context('SMS dialer configuration', () => {
// Se comentan los wait para que queden mientras usamos la configuración con timeout 30000

    it('Supervisor successfull login', function() {
        cy.visit("https://203.ucontactcloud.com")
        cy.get('#cmbRol_chosen').click()
        cy.get('.active-result').contains('Supervisor').click({force: true})
        cy.get('#cmbIdiomas_chosen').click() //Abro idiomas y veo cual esta seleccionado, siempre entro en Ingles
            cy.get('.chosen-results').contains("es").then(($language)=>{
                if ($language.hasClass("result-selected")) {
                    cy.get('#cmbIdiomas_chosen > .chosen-drop > .chosen-results > [data-option-array-index="1"]').click() // ingles hardcodeado
                }
            })
        cy.get('[name="user"]').type('SuperUserSMS')
        cy.get('[name="pass"]').type('123456{enter}')
        cy.location('href').should('contain', '203.ucontactcloud.com').then(($portal) => {
            if($portal.valueOf().includes('/views/portal')) {

            } else {
                cy.get('#btnLogin').click()
            }
        })        
        cy.get('#mm-blocker').click()
        cy.saveLocalStorage()
    })

    //Alta de prveedor SMS
    it('Alta SMS provider', function(){
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

    it('Alta SMS dialer', function(){
        cy.restoreLocalStorage()
        cy.get('#navigation > .menu > li:nth-child(5)').click()
        cy.get('#sms').click()
        cy.wait(2000)
        cy.get('#tablaDiscadoresSmsBody').then(($checksmsdialer)=> {
            if($checksmsdialer.text().includes('AutomatedSMSDialer')) {
                // dialer already exists
            } else {
                cy.get('#guardar').click()
                cy.get('#toast-container').contains('Missing SMS Provider')
                cy.get('#toast-container').contains('Must type dial string')
                cy.get('#toast-container').contains('Must type time between messages')
                cy.get('#toast-container').contains('Campaign name allows characters A-Z, 0-9, _ , - ')
                cy.get('#nombreCampana').type('AutomatedSMSDialer')
                cy.get('#smsProvider_chosen').click()
                cy.get('.active-result').contains('AutomaticProvider').click()
                cy.get('#cadenaDeMarcado').type('24054070')
                cy.get('#tiempoEntreMensajes').type(10)
                cy.get('#guardar').click()
            }
        })
        cy.saveLocalStorage()
    })

    it('SMS dialer modification', function(){
        cy.restoreLocalStorage()
        cy.get('#tablaDiscadoresSmsBody').contains('AutomatedSMSDialer').click()
        cy.get('#schedule-input > option').then(($checkfulltime)=> {
            if($checkfulltime.text().includes('sun,mon,tue,wed,thu,fri,sat;00:00-23:59')){
                // is fulltime
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
                cy.get('#guardar').click()
            }
        })
        cy.saveLocalStorage()
    })

    it('upload sms list', function(){
        cy.restoreLocalStorage()
        cy.get('#navigation2 .dropdown-toggle').contains('Dialers').click()
        cy.get('#smsdash').click()
        cy.get('#chosendiscadoressms_chosen').click()
        cy.get('.active-result').contains('AutomatedSMSDialer').click()
        cy.wait(2000)
        cy.get('#noprocesadas').invoke('text').then((text)=> {
            if(text == 0) {
                cy.request({
                    method: 'POST',
                    url: 'https://203.ucontactcloud.com/Integra/resources/SMS/uploadbase', // baseUrl is prepended to url
                    form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
                    body: {
                        filename: 'automationSMS.csv',
                        fileb64: 'QXV0b21hdGVkU01TRGlhbGVyOzA5MTExMTExMTtIaSBXb3JsZDs5OTk5CkF1dG9tYXRlZFNNU0RpYWxlcjswOTIyMjIyMjI7SGkgQ2l0eTs4ODg4CkF1dG9tYXRlZFNNU0RpYWxlcjswOTMzMzMzMzM7SGkgUGVvcGxlOzc3Nzc=',
                        campaign: 'AutomatedSMSDialer',
                    }
                })
                cy.get('#noprocesadas').invoke('text').should('eq', '3')
                cy.get('#play').click()
                cy.get('#noprocesadas').invoke('text').should('eq', '0')
            }
        })
    })

    it('delete dialer', function(){
        cy.restoreLocalStorage()
        cy.get('#navigation > .menu > li:nth-child(5)').click()
        cy.get('#sms').click()
        cy.wait(2000)
        cy.get('#tablaDiscadoresSmsBody').contains('AutomatedSMSDialer').click()
        cy.get('#eliminar').click()
        cy.get('.bootbox > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
        cy.saveLocalStorage()
    })

    it('delete provider', function(){
        cy.restoreLocalStorage()
        cy.get('#navigation > .menu > li:nth-child(3)').click()
        cy.get('#smsproviders').click()
        cy.wait(2000)
        cy.get('#smsProviderTableBody').contains('AutomaticProvider').click()
        cy.get('.btn-danger').click()
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