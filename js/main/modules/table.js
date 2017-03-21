function Table(cfg) {

    var _header = cfg.header;
    var tbl = cfg.table;
    var _rowMapper = cfg.rowMapper;
    var _elements = [];

    this.addElement = function(e) {
        _elements.push(e);
    }

    var drawHeader = function() {
        var header = tbl.createTHead();
        var headerRow = header.insertRow(0);
        var i = 0;
        _header.forEach(function(e) {
            var cell = headerRow.appendChild(document.createElement('th'));
            cell.innerHTML = e
            i = i + 1;
        });
    }

    var drawBody = function() {
        var body = tbl.appendChild(document.createElement('tbody'));
        _elements.forEach(function(e) {
            var row = body.appendChild(document.createElement('tr'));
            for (var i = 0; i < _header.length; i++) {
                var value = _rowMapper(i, e);
                var col = row.appendChild(document.createElement('td'));
                col.innerHTML = value;
            }
        });
    }

    var drawFooter = function() {

    }

    var removeContent = function() {
        tbl.innerHTML = "";
    }

    this.draw = function() {
        removeContent();
        drawHeader();
        drawBody();
        drawFooter();
    }
}
