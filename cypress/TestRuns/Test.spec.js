context('Upload dialer base', () => {

    it('Sending webchat', function() {
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
})