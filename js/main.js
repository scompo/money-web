document.addEventListener("DOMContentLoaded", domLoaded);

function Application(appConfig) {

    var latestMovements = [];
    var _appConfig = appConfig;

    function setupLatestMovements() {
        latestMovements = loadLatestMovements()
        latestMovements.sort(movementByDateDesc);
        latestMovements.forEach(function(value) {
            var row = _appConfig.latestMovementsTbl.tBodies[0].insertRow();
            var c1 = row.insertCell(0);
            var c2 = row.insertCell(1);
            var c3 = row.insertCell(2);
            c1.innerHTML = value.date;
            c2.innerHTML = value.description;
            c3.innerHTML = value.amount;
        });
    }

    function movementByDateDesc(a, b) {
        return a - b;
    }

    function loadLatestMovements() {
        return [{
                date: new Date(2017, 01, 05, 10, 30, 0, 0),
                description: "Got money!",
                amount: "100,00"
            },
            {
                date: new Date(2017, 01, 05, 10, 45, 0, 0),
                description: "Bought stuff",
                amount: "5,00"
            },
            {
                date: new Date(2017, 01, 05, 10, 50, 0, 0),
                description: "Bought other stuff",
                amount: "5,00"
            },
            {
                date: new Date(2017, 01, 05, 11, 0, 0, 0),
                description: "Bought some more stuff",
                amount: "10,00"
            }
        ];
    }

    function setupCurrentAmount() {
        var currentAmount = getCurrentAmount();
        _appConfig.currentAmountTxt.innerHTML = currentAmount;
    }

    function getCurrentAmount() {
        return "80,00";
    }

    function setupCurrentExpenses() {
        var currentExpenses = getCurrentExpenses();
        _appConfig.currentExpensesTxt.innerHTML = currentExpenses;
    }

    function getCurrentExpenses() {
        return "-20,00";
    }

    function setupCurrentIncomes() {
        var currentIncomes = getCurrentIncomes();
        _appConfig.currentIncomesTxt.innerHTML = currentIncomes;
    }

    function getCurrentIncomes() {
        return "100,00"
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
        currentIncomesTxt: document.getElementById("current-incomes-txt")
    };
    application = new Application(appConfig);
    application.setup();
}