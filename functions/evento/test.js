function generar_nombre(nombre){
    nombre = nombre.toUpperCase();
    const nombres = nombre.split(' ').filter((part) => {return !part.includes('.') && part !== 'DE' && part !== 'LOS'});

    if(nombres.length <= 3){
        return nombres[0] + ' ' + nombres[1];
    } else {
        return nombres[0] + ' ' + nombres[2];
    }
}

console.log(generar_nombre('Dr. Mario rafael Ruiz Vargas'));