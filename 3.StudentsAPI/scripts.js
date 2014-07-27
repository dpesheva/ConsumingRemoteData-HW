(function () {
    var $errorMessage, $successMessage, addStudent, reloadStudents, resourceUrl;

    resourceUrl = 'http://localhost:3000/students';

    $successMessage = $('.messages .success');

    $errorMessage = $('.messages .error');

    addStudent = function (data) {
        return $.post(resourceUrl, data, 'json')
         .then(function (data) {
             $successMessage
             .html('' + data.name + ' successfully added')
             .show()
             .fadeOut(2000);
             reloadStudents();
         }, function (err) {
             $errorMessage
             .html('Error happened: ' + err)
             .show()
             .fadeOut(2000);
         });
    };

    reloadStudents = function () {
        $.getJSON(resourceUrl)
            .then(function (data) {
                var student, $studentsList, i, len;
                $studentsList = $('<ul/>').addClass('students-list');
                for (i = 0, len = data.students.length; i < len; i++) {
                    student = data.students[i];
                    $('<li />')
                      .addClass('student-item')
                      .append($('<strong /> ')
                        .html(student.name))
                      .append($('<span />')
                        .html(student.grade))
                      .appendTo($studentsList);
                }
                $('#students-container').html($studentsList);
            }, function () {
                $errorMessage
                  .html("Error happened: " + err)
                  .show()
                  .fadeOut(2000);
            });
    };

    $(function () {
        reloadStudents();
        $('#btn-add-student').on('click', function () {
            var student;
            student = {
                name: $('#tb-name').val(),
                grade: $('#tb-grade').val()
            };
            addStudent(student);
        });
    });

}).call(this);

