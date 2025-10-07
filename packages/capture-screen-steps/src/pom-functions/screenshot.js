/* eslint-disable */
// noinspection All

function _screenshot() {
    const times = new Date().getTime();
    cy.screenshot(`${times}`, { timeout: 30000, capture: 'fullPage' });
}
