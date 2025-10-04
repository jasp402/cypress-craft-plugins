//step wait for time (e.g. Esperar 8 Seg). [num] | [Seg, Min, Hora]
Then('Esperar {word} {word}', (time, type) => {
    pageObject._waitCustom(time, type);
});