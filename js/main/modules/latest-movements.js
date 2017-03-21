function LatestMovementsModule(cfg) {

    var _cfg = cfg;
    var tblCfg = {
        table: _cfg.ui.table,
        rowMapper: function(i, e) {
            switch (i) {
                case 0:
                    return dateToString(e.date);
                case 1:
                    return e.description;
                case 2:
                    return moneyToString(e.amount)
                default:
                    return '';
            }
        },
        header: ['Date', 'Description', 'Amount']
    };

    var tbl = new Table(tblCfg);

    this.draw = function(latestMovements) {
        tbl.removeElements();
        latestMovements.forEach(function(e) {
            tbl.addElement(e);
        });
        tbl.draw();
    }

    this.refresh = function() {
        var latestMovements = _cfg.callbacks.get();
        this.draw(latestMovements);
    }

    this.refresh();
}
