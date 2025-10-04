_waitCustom(time, type){
    const num = parseFloat(time);
    let isInteger = !isNaN(num) && Number.isInteger(num);
    // Asumimos que isDynamic y extractAndSetDynamicValue están definidos en el contexto del POM del usuario
    // o son provistos por otro plugin/core de Cypress-Craft.
    if(!['minuto', 'minutos', 'segundo', 'segundos'].includes(type)) throw new Error(`The time [${type}] is bad.`);
    if (isInteger) time = parseInt(time, 10)
    else if (typeof isDynamic !== 'undefined' && isDynamic(time)) time = extractAndSetDynamicValue(time, this.currentEndPoint, this)
    else throw new Error("Escribir correctamente el tiempo de espera")
    cy.log("El endpoint es: "+this.currentEndPoint)
    cy.wait(Number(time) * Number(( type === 'segundo' || type === 'segundos') ? 1000 : 60000));
    //cy.log("estoy esperando: "+ Number(time) * Number(( type === 'segundo' || type === 'segundos') ? 1000 : 60000))
}