/* eslint-disable */
// noinspection All

function _waitCustom(time, type) {
    // 1. Usa un objeto para mapear unidades de tiempo a milisegundos para mayor claridad y extensibilidad.
    const TIME_UNITS_IN_MS = {
        segundo: 1000,
        segundos: 1000,
        minuto: 60000,
        minutos: 60000,
    };

    // 2. Valida la unidad de tiempo y obtén el multiplicador. El mensaje de error es más descriptivo.
    const multiplier = TIME_UNITS_IN_MS[type];
    if (!multiplier) {
        const validUnits = Object.keys(TIME_UNITS_IN_MS).join(', ');
        throw new Error(`La unidad de tiempo '${type}' no es válida. Use una de: ${validUnits}.`);
    }

    let waitValue;

    // 3. Maneja la lógica de valores dinámicos de forma más segura.
    // Se comprueba si las funciones 'isDynamic' y 'extractAndSetDynamicValue' existen antes de usarlas.
    if (typeof isDynamic === 'function' && isDynamic(time)) {
        if (typeof extractAndSetDynamicValue !== 'function') {
            throw new Error("La función 'extractAndSetDynamicValue' no está disponible para resolver valores dinámicos.");
        }
        waitValue = extractAndSetDynamicValue(time, this.currentEndPoint, this);
    } else {
        // 4. Si no es dinámico, se convierte a un entero.
        waitValue = parseInt(time, 10);
    }

    // 5. Centraliza la validación para asegurar que tenemos un número antes de continuar.
    if (isNaN(waitValue)) {
        throw new Error(`El valor de tiempo '${time}' no es un entero válido ni un valor dinámico que resuelva a un número.`);
    }

    const waitTimeInMs = waitValue * multiplier;

    // 6. Añade logs más descriptivos para facilitar la depuración.
    cy.log(`Endpoint actual: ${this.currentEndPoint}`);
    cy.log(`Esperando por ${waitValue} ${type} (${waitTimeInMs}ms)`);
    cy.wait(waitTimeInMs);
}