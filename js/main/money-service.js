function MoneyService() {

    var _movements = [
        new Movement("100,00", "Got money!", "05/01/2017 10:30"),
        new Movement("-4,75", "Bought stuff", "05/01/2017 10:45"),
        new Movement("-5,25", "Bought other stuff", "05/01/2017 11:50"),
        new Movement("-10", "Bought some more stuff", "05/01/2017 11:00"),
        new Movement("-10", "I'm out of money but I buy stuff", "04/01/2017 10:00"),
        new Movement("-20", "Need some more money to buy stuff", "04/01/2017 15:00")
    ];

    this.loadLatestMovements = function(num) {
        var latest = [];
        _movements.sort(movementByDateDesc);
        for (var i = 0; i < num && i < _movements.length; i++) {
            latest.push(_movements[i]);
        }
        return latest;
    }

    this.getCurrentAmount = function() {
        var sum = 0;
        for (var i = 0; i < _movements.length; i++) {
            sum = sum + _movements[i].amount;
        }
        return sum;
    }

    this.getCurrentExpenses = function() {
        var exps = 0;
        for (var i = 0; i < _movements.length; i++) {
            if (_movements[i].amount < 0) {
                exps = exps + _movements[i].amount;
            }
        }
        return exps;
    }

    this.getCurrentIncomes = function() {
        var incs = 0;
        for (var i = 0; i < _movements.length; i++) {
            if (_movements[i].amount >= 0) {
                incs = incs + _movements[i].amount;
            }
        }
        return incs;
    }

    this.insertNew = function(mvm) {
        _movements.push(mvm);
    }
}
