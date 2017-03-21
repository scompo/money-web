document.addEventListener("DOMContentLoaded", domLoaded);

function Application(appCfg) {

    var latestElementsNumber = 5;
    var _moneyService = new MoneyService();

    var currentAmountCfg = {
        callbacks: {
            get: function() {
                return _moneyService.getCurrentAmount();
            }
        },
        ui: appCfg.ui.amount
    };

    var _currentAmountModule = new CurrentAmountModule(currentAmountCfg);

    var currentExpensesCfg = {
        callbacks: {
            get: function() {
                return _moneyService.getCurrentExpenses();
            }
        },
        ui: appCfg.ui.expenses
    };

    var _currentExpensesModule = new CurrentExpensesModule(currentExpensesCfg);

    var currentIncomesCfg = {
        callbacks: {
            get: function() {
                return _moneyService.getCurrentIncomes();
            }
        },
        ui: appCfg.ui.incomes
    };

    var _currentIncomesModule = new CurrentIncomesModule(currentIncomesCfg);

    var latestMovementsCfg = {
        callbacks: {
            get: function() {
                return _moneyService.loadLatestMovements(latestElementsNumber);
            }
        },
        ui: appCfg.ui.latestMovements
    };

    var _latestMovementsModule = new LatestMovementsModule(latestMovementsCfg);

    var insertMovementCfg = {
        callbacks: {
            save: function(mvt) {
                _moneyService.insertNew(mvt);
            },
            afterSave: function() {
                _latestMovementsModule.refresh();
                _currentAmountModule.refresh();
                _currentExpensesModule.refresh();
                _currentIncomesModule.refresh();
            }
        },
        ui: appCfg.ui.insert
    }

    var _insertMovementModule = new InsertMovementModule(insertMovementCfg);
}

// called when the DOM is loaded
function domLoaded(event) {
    console.debug("DOM is loaded!");
    var appCfg = {
        ui: {
            amount: {
                txt: document.getElementById("current-amount-txt")
            },
            expenses: {
                txt: document.getElementById("current-expenses-txt")
            },
            incomes: {
                txt: document.getElementById("current-incomes-txt")
            },
            latestMovements: {
                table: document.getElementById("latest-movements")
            },
            insert: {
                dateTxt: document.getElementById("date-txt"),
                amountTxt: document.getElementById("amount-txt"),
                descriptionTxt: document.getElementById("description-txt"),
                addBtn: document.getElementById("insert-btn")
            }
        }
    }
    var application = new Application(appCfg);
}
