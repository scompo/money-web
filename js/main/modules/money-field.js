function MoneyField(cfg) {

    var _cfg = cfg;

    this.refresh = function() {
        _cfg.ui.txt.innerHTML = moneyToString(_cfg.callbacks.get());
    }

    this.refresh();
}
