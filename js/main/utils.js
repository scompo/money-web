var moneyToString = function(number) {
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(number)
}

var stringToMoney = function(str) {
    return Number(str.replace(",", "."));
}

var dateToString = function(dt) {
    return moment(dt).format("DD/MM/YYYY HH:mm");
}

var stringToDate = function(str) {
    return moment(str, "DD/MM/YYYY HH:mm");
}

var movementByDateDesc = function(a, b) {
    if (a.date.isBefore(b.date)) {
        return 1;
    } else if (a.date.isAfter(b.date)) {
        return -1;
    }
    return 0;
}
