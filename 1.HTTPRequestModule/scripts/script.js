var success = function (data) {
    var list,
        i,
        len,
        student;
    list = document.createElement('ul');
    jsonData = JSON.parse(data);
    len = jsonData.count;
    for (i = 0; i < len; i += 1) {
        student = jsonData.students[i];
        item = document.createElement('li');
        item.innerHTML = student.name + ' is in ' + student.grade + ' grade';
        list.appendChild(item);
    }
    document.getElementById('http-response').appendChild(list);
};

var error = function (err) {
    document.getElementById("http-response").innerHTML = "<div style='color:red;font-weight:bold'>Error</div>";
};


httpRequest.postJSON("http://localhost:3000/students",
    {
        name: "Pesho", grade: 12
    },
    {
        contentType: 'application/json',
        accept: 'application/json'
    })
    .then(success, error);

httpRequest.getJSON("http://localhost:3000/students",
    {
        contentType: 'application/json',
        accept: 'application/json'
    })
    .then(success, error);
