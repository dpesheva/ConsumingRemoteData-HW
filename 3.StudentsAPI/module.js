var requestModule = (function () {
    var $errorMessage,
        $successMessage,
        addStudent,
        reloadStudents,
        resourceUrl,
        deleteStudent;

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
                        .addClass('student-grade')
                        .html(student.grade))
                      .append($('<span />')
                        .addClass('student-id')
                        .html(student.id))
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

    deleteStudent = function (data) {
        return $.post('http://localhost:3000/students/' + data.id + '/', { _method: 'delete' }, 'json')
        .then(function (data) {
            $successMessage
            .html('Successfully deleted')
            .show()
            .fadeOut(2000);
            reloadStudents();
        }, function (err) {
            $errorMessage
            .html('Error happened: ' + err)
            .show()
            .fadeOut(2000);
        });
    }

    return {
        add: addStudent,
        get: reloadStudents,
        deleteStudent: deleteStudent
    }
}).call(this);

