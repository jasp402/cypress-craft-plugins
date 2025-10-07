/* global When, pageObject */

// step: capture full page screenshot as evidence
When('el usuario captura evidencia de la pantalla', () => {
    pageObject._screenshot();
});
