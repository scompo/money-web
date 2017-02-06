document.addEventListener("DOMContentLoaded", domLoaded);

var formatMoney = function(number) {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(number)
}

var movementByDateDesc = function(a, b) {
    return b.date - a.date;
}

function MockedService() {

    var _movements = [{
            date: new Date(2017, 01, 05, 10, 30, 0, 0),
            description: "Got money!",
            amount: 100
        },
        {
            date: new Date(2017, 01, 05, 10, 45, 0, 0),
            description: "Bought stuff",
            amount: -4.75
        },
        {
            date: new Date(2017, 01, 05, 10, 50, 0, 0),
            description: "Bought other stuff",
            amount: -5.25
        },
        {
            date: new Date(2017, 01, 05, 11, 0, 0, 0),
            description: "Bought some more stuff",
            amount: -10
        },
        {
            date: new Date(2017, 01, 04, 10, 0, 0, 0),
            description: "I'm out of money but I buy stuff",
            amount: -10
        },
        {
            date: new Date(2017, 01, 04, 15, 0, 0, 0),
            description: "Need some more money to buy stuff",
            amount: -10
        }
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
}

function Application(appConfig) {

    var latestMovements = [];
    var _appConfig = appConfig;
    var _service = new MockedService();
    var _lastMovementNumber = 5;

    function setupLatestMovements() {
        latestMovements = _service.loadLatestMovements(_lastMovementNumber);
        latestMovements.sort(movementByDateDesc);
        latestMovements.forEach(function(value) {
            var row = _appConfig.latestMovementsTbl.tBodies[0].insertRow();
            var c1 = row.insertCell(0);
            var c2 = row.insertCell(1);
            var c3 = row.insertCell(2);
            c1.innerHTML = value.date;
            c2.innerHTML = value.description;
            c3.innerHTML = formatMoney(value.amount);
        });
    }

    function setupCurrentAmount() {
        var currentAmount = _service.getCurrentAmount();
        _appConfig.currentAmountTxt.innerHTML = formatMoney(currentAmount);
    }

    function setupCurrentExpenses() {
        var currentExpenses = _service.getCurrentExpenses();
        _appConfig.currentExpensesTxt.innerHTML = formatMoney(currentExpenses);
    }

    function setupCurrentIncomes() {
        var currentIncomes = _service.getCurrentIncomes();
        _appConfig.currentIncomesTxt.innerHTML = formatMoney(currentIncomes);
    }

    this.setup = function() {
        console.debug("Setting up application!");
        setupLatestMovements();
        setupCurrentAmount();
        setupCurrentExpenses();
        setupCurrentIncomes();
    };
}

var application;

// called when the DOM is loaded
function domLoaded(event) {
    console.debug("DOM is loaded!");
    var appConfig = {
        latestMovementsTbl: document.getElementById("latest-movements"),
        currentAmountTxt: document.getElementById("current-amount-txt"),
        currentExpensesTxt: document.getElementById("current-expenses-txt"),
        currentIncomesTxt: document.getElementById("current-incomes-txt"),
        insertDateTxt: document.getElementById("date-txt"),
        insertAmountTxt: document.getElementById("amount-txt"),
        insertDescriptionTxt: document.getElementById("description-txt")
    };
    application = new Application(appConfig);
    application.setup();
}