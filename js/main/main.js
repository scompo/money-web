document.addEventListener("DOMContentLoaded", domLoaded);

var moneyToString = function(number) {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(number)
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

function MockedService() {

    var _movements = [{
            date: stringToDate("05/01/2017 10:30"),
            description: "Got money!",
            amount: stringToMoney("100,00")
        },
        {
            date: stringToDate("05/01/2017 10:45"),
            description: "Bought stuff",
            amount: stringToMoney("-4,75")
        },
        {
            date: stringToDate("05/01/2017 11:50"),
            description: "Bought other stuff",
            amount: stringToMoney("-5,25")
        },
        {
            date: stringToDate("05/01/2017 11:00"),
            description: "Bought some more stuff",
            amount: stringToMoney("-10")
        },
        {
            date: stringToDate("04/01/2017 10:00"),
            description: "I'm out of money but I buy stuff",
            amount: stringToMoney("-10")
        },
        {
            date: stringToDate("04/01/2017 15:00"),
            description: "Need some more money to buy stuff",
            amount: stringToMoney("-20")
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

    this.insertNew = function(mvm) {
        _movements.push(mvm);
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
        _appConfig.latestMovementsTbl.tBodies[0].remove();
        _appConfig.latestMovementsTbl.appendChild(document.createElement('tbody'));
        latestMovements.forEach(function(value) {
            var row = _appConfig.latestMovementsTbl.tBodies[0].insertRow();
            var c1 = row.insertCell(0);
            var c2 = row.insertCell(1);
            var c3 = row.insertCell(2);
            c1.innerHTML = dateToString(value.date);
            c2.innerHTML = value.description;
            c3.innerHTML = moneyToString(value.amount);
        });
    }

    function setupCurrentAmount() {
        var currentAmount = _service.getCurrentAmount();
        _appConfig.currentAmountTxt.innerHTML = moneyToString(currentAmount);
    }

    function setupCurrentExpenses() {
        var currentExpenses = _service.getCurrentExpenses();
        _appConfig.currentExpensesTxt.innerHTML = moneyToString(currentExpenses);
    }

    function setupCurrentIncomes() {
        var currentIncomes = _service.getCurrentIncomes();
        _appConfig.currentIncomesTxt.innerHTML = moneyToString(currentIncomes);
    }

    function setupInsertModule() {
        _appConfig.insertAddBtn.addEventListener("click", insertNewMovement);
        setupInsertFields();
    }

    function setupInsertFields() {
        _appConfig.insertDateTxt.value = "";
        _appConfig.insertDescriptionTxt.value = "";
        _appConfig.insertAmountTxt.value = "";
    }

    var insertNewMovement = function(e) {
        e.preventDefault();
        var dateToInsert = stringToDate(_appConfig.insertDateTxt.value);
        var descriptionToInsert = _appConfig.insertDescriptionTxt.value;
        var amountToInsert = stringToMoney(_appConfig.insertAmountTxt.value);
        var movementToInsert = {
            date: dateToInsert,
            description: descriptionToInsert,
            amount: amountToInsert

        };
        _service.insertNew(movementToInsert);

        setupLatestMovements();
        setupCurrentAmount();
        setupCurrentExpenses();
        setupCurrentIncomes();
        setupInsertFields();
    }

    this.setup = function() {
        console.debug("Setting up application!");
        setupLatestMovements();
        setupCurrentAmount();
        setupCurrentExpenses();
        setupCurrentIncomes();
        setupInsertModule();
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
        insertDescriptionTxt: document.getElementById("description-txt"),
        insertAddBtn: document.getElementById("insert-btn")
    };
    application = new Application(appConfig);
    application.setup();
}