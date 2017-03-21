document.addEventListener("DOMContentLoaded", domLoaded);

function assert(expected, actual) {
    if (expected != actual) {
        throw 'expected: "' + expected + '" but found "' + actual + '"';
    }
}

function domLoaded(event) {

    var unitTest = function(name, fn) {
        var before = function(name) {
            return {
                name: name,
                fixture: document.getElementById('test'),
                results: document.getElementById('results')
            };
        }
        var after = function(t) {
            t.fixture.innerHTML = "";
        }
        var success = function(t) {
            p = t.results.appendChild(document.createElement('p'))
            p.innerHTML = t.name + ": success";
        }
        var error = function(t, e) {
            p = t.results.appendChild(document.createElement('p'))
            p.innerHTML = t.name + ": error -> " + e;
        }

        var ts = before(name);
        try {
            fn(ts);
            success(ts);
        } catch (e) {
            error(ts, e);
        } finally {
            after(ts);
        }
    }

    unitTest('test table', function(t) {
        var tbl = t.fixture.appendChild(document.createElement('table'));
        var tblCfg = {
            rowMapper: function(i, e) {
                return e[i];
            },
            table: tbl,
            header: ['first', 'second'],
        };
        var myTable = new Table(tblCfg);
        myTable.addElement(['a1', 'a2']);
        myTable.addElement(['b1', 'b2']);
        myTable.draw();

        assert(1, tbl.tBodies.length);
        assert(3, tbl.rows.length);
        assert('first', tbl.rows[0].cells[0].innerHTML);
        assert('second', tbl.rows[0].cells[1].innerHTML);
        assert('a1', tbl.rows[1].cells[0].innerHTML);
        assert('a2', tbl.rows[1].cells[1].innerHTML);
        assert('b1', tbl.rows[2].cells[0].innerHTML);
        assert('b2', tbl.rows[2].cells[1].innerHTML);
    });

    unitTest('test that fails', function(t) {
        assert(true, false);
    });

    unitTest('test that passes', function(t) {
        assert(true, true);
    });

}
