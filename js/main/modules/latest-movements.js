function LatestMovementsModule(cfg) {

    this._cfg = cfg;

    this.draw = function(latestMovements) {
        var table = this._cfg.ui.table;
        table.tBodies[0].remove();
        table.appendChild(document.createElement('tbody'));
        latestMovements.forEach(function(value) {
            var row = table.tBodies[0].insertRow();
            var c1 = row.insertCell(0);
            var c2 = row.insertCell(1);
            var c3 = row.insertCell(2);
            c1.innerHTML = dateToString(value.date);
            c2.innerHTML = value.description;
            c3.innerHTML = moneyToString(value.amount);
        });
    }

    this.refresh = function() {
        var latestMovements = cfg.callbacks.get();
        this.draw(latestMovements);
    }

    this.refresh();
}
