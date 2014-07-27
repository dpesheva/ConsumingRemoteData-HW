$(function () {
    requestModule.get();
    $('#btn-add-student').on('click', function () {
        var student;
        student = {
            name: $('#tb-name').val(),
            grade: $('#tb-grade').val()
        };
        requestModule.add(student);
    });

    $('#btn-delete-student').on('click', function () {
        var student;
        student = {
            id: $('#tb-id').val()
        };
        requestModule.deleteStudent(student);
    });
});

