module.exports = {
    name: '@cypress-craft/plugin-steps',
    version: '1.0.0',
    description: 'Agrega step definitions para autenticación',
    register(context) {
        context.stepDefinitions.Given.push([/^I authenticate with OAuth$/, () => {
            cy.log('Autenticando con OAuth (plugin de prueba)');
            // Simula lógica
        }]);
        context.pom.extend({
            oauthRequest: (url) => cy.request({ url, method: 'POST', body: { token: 'test' } }),
        });
    },
    onUpdate(oldVersion, newVersion) {
        console.log(`Actualizando plugin-steps de ${oldVersion} a ${newVersion}`);
    }
};