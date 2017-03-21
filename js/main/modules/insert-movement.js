function InsertMovementModule(cfg) {

    var _cfg = cfg;

    var resetFields = function() {
        _cfg.ui.dateTxt.value = "";
        _cfg.ui.descriptionTxt.value = "";
        _cfg.ui.amountTxt.value = "";
    }

    this.resetFields = resetFields

    var insertNewMovement = function(e) {
        e.preventDefault();
        var mvt = new Movement(
            _cfg.ui.amountTxt.value,
            _cfg.ui.descriptionTxt.value,
            _cfg.ui.dateTxt.value
        );
        _cfg.callbacks.save(mvt);
        _cfg.callbacks.afterSave();
        resetFields();
    }

    _cfg.ui.addBtn.addEventListener("click", insertNewMovement);
    resetFields();
}
