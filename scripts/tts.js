const tts = [
    [null, "C", "L", "I", "E", "N", "T", "S", "I", "D", "E", null, null],
    [null, "L", null, null, null, null, null, "E", null, null, null, null, null],
    [null, "O", null, null, null, null, null, "R", "E", "D", "U", "C", "E"],
    [null, "S", null, null, "B", null, null, "V", null, null, null, null, null],
    [null, "U", null, null, "L", null, "L", "E", "X", "I", "C", "A", "L"],
    [null, "R", null, null, "O", null, null, "R", null, null, null, null, null],
    [null, "E", null, null, "C", null, null, "S", null, null, "H", null, null],
    [null, null, null, null, "K", null, null, "I", null, null, "O", null, null,],
    [null, null, null, null, "S", "H", "A", "D", "O", "W", "I", "N", "G"],
    [null, null, "W", null, "C", null, null, "E", null, null, "S", null, null,],
    [null, null, "H", null, "O", null, null, null, null, null, "T", null, null,],
    [null, null, "I", null, "P", null, null, null, null, null, "I", null, null,],
    ["F", "I", "L", "T", "E", "R", null, null, null, null, "N", null, null,],
    [null, null, "E", null, null, null, null, null, null, null, "G", null, null,]
]

function makeLayout() {
    //[y,x]
    var num = [[0, 1], [2, 7], [4, 6], [8, 4], [12, 0], [9, 2], [3, 4], [0, 7], [6, 10]]
    var tb = document.getElementById("tts-table")
    tb.innerHTML = ""
    for (let row in tts) {
        var r = document.createElement("tr");
        for (let col in tts) {
            var th = document.createElement("th");


            var ipt = document.createElement("input");
            if (tts[Number(row)][Number(col)] == null) {
                ipt.disabled = true
                ipt.className = "dis-input"
                ipt.hidden = true

            }
            else {
                ipt.className = "nor-input"
            }
            var idx = arrInArr([Number(row), Number(col)], num)

            if (idx != -1) {
                var span = document.createElement("span")
                span.textContent = idx + 1
                th.appendChild(span)
            }
            th.appendChild(ipt);


            r.appendChild(th);

        }
        tb.appendChild(r);

    }

}

function startTTS() {
    var checkButt = document.getElementById("check")
    var startButt = document.getElementById("start")
    var con = document.getElementById("container")
    var score = document.getElementById("score")

    score.hidden = true
    startButt.hidden = true
    checkButt.hidden = false
    con.hidden = false

    makeLayout()
}

function checkAnswers() {
    var tb = document.getElementById("tts-table")
    var score = 0
    var tbChildren = tb.children
    var isWrong = false;
    for (row in tbChildren) {
        if (row == "item") {
            break
        }
        var rChildren = tbChildren[row].children;
        if (rChildren.length != 0) {

            for (col in rChildren) {
                if (col == "item") {
                    break
                }
                var ipt = rChildren[col].getElementsByClassName("nor-input")
                if (ipt.length != 0) {
                    console.log(ipt[0].value)
                    // console.log(tts[row][col])
                    if (ipt[0].value.toUpperCase() != tts[row][col]) {
                        ipt[0].className = "wrong-input"
                        isWrong = true
                    }
                    else {
                        ipt[0].className = "correct-input"
                        score += 50;
                    }
                }

            }
        }
    }

    if (isWrong) {
        var retryButt = document.getElementById("retry")
        var checkButt = document.getElementById("check")
        var scoreText = document.getElementById("score")

        scoreText.innerText = `Score: ${score}`
        checkButt.hidden = true
        retryButt.hidden = false
    }
    else {
        var retryButt = document.getElementById("retry")
        var checkButt = document.getElementById("check")
        var startButt = document.getElementById("start")
        var con = document.getElementById("container")
        var scoreText = document.getElementById("score")

        scoreText.innerText = `Score: ${score}`
        scoreText.hidden = false
        startButt.hidden = false
        con.hidden = true
        checkButt.hidden = true
        retryButt.hidden = true
    }

}

function retry() {
    var retryButt = document.getElementById("retry")
    var checkButt = document.getElementById("check")
    var startButt = document.getElementById("start")
    var con = document.getElementById("container")
    var scoreText = document.getElementById("score")

    scoreText.hidden = false
    startButt.hidden = false
    con.hidden = true
    checkButt.hidden = true
    retryButt.hidden = true
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function arrInArr(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;

    for (let arr in b) {
        // console.log(arr)
        if (arraysEqual(b[Number(arr)], a)) {

            return Number(arr)
        }
    }
    return -1
}