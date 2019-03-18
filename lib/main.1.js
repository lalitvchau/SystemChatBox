var botui = new BotUI('chatBox');
var answer = null;
var question = null;

botui.message.bot("Welcome Recruit !")
    .then(
        function () {
            return botui.action.text({
                action: {
                    placeholder: 'Enter you name ?'
                }
            })
        }
    ).then(
        function (res) {
            answer = res.value
            botui.message.bot("Welcome !" + answer);
            questions()
        }
    );

var questions = function () {
    botui.action.text({
        action: {
            placeholder: "Please ask the questions"
        }
    }).then(function (res) {
        question = res.value;
        console.log(question)
        answers(Math.floor(Math.random() * (1000 - 100) + 100) % 100)
    })
}
var answers = function (aNo) {
    resultData(aNo);
    futureQuestion();
}

var printAns = function (msg) {
    botui.message.bot(msg)
}

var futureQuestion = function () {
    botui.message.bot("Do you want to ask more question ?").then(function () {
        return botui.action.button({
            delay: 1000,
            action: [{
                icon: 'check',
                text: 'Yes',
                value: 'yes'
            }, {
                icon: 'cancel',
                text: 'No',
                value: 'no'
            }]
        })
    }).then(function (res) {
        if (res.value == 'no') {
            end();
        } else {
            questions();
        }
    });
}


var end = function end() {
    botui.message.bot("Thank you for Joining us !");
}

var resultData = function (id) {
    var request = new XMLHttpRequest()
    request.open('GET', 'http://5c8f63828447f30014cb825c.mockapi.io/api/qAns/' + id, true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            console.log(data.answer)
            printAns(data.answer)
        } else {
            console.log('error')
        }
    }

    request.send()
}
