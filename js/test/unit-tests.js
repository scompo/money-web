document.addEventListener("DOMContentLoaded", domLoaded);

function assertEqual(expected, actual) {
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

    unitTest('this should fail', function(t) {
        assertEqual(true, false);
    });

    unitTest('this should pass', function(t) {
        assertEqual(true, true);
    });

    unitTest('table.addElement() should add an element', function(t) {
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

        assertEqual(1, tbl.tBodies.length);
        assertEqual(3, tbl.rows.length);
        assertEqual('first', tbl.rows[0].cells[0].innerHTML);
        assertEqual('second', tbl.rows[0].cells[1].innerHTML);
        assertEqual('a1', tbl.rows[1].cells[0].innerHTML);
        assertEqual('a2', tbl.rows[1].cells[1].innerHTML);
        assertEqual('b1', tbl.rows[2].cells[0].innerHTML);
        assertEqual('b2', tbl.rows[2].cells[1].innerHTML);
    });

}
