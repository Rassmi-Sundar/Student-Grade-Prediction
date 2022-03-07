const { jsPDF } = require("jspdf");
require('jspdf-autotable')

function TablePDF(semesterone, semestertwo, semesterthree, semesterfour, prediction) {

    const doc = new jsPDF()
    doc.setFontSize(12)
    doc.autoTable({
        head: [['Conversion of Marks to Grade Points and Letter Grade']]
    })
    doc.autoTable({
        head: [['RANGE OF MARKS', 'GRADE POINTS', 'LETTER GRADE', 'DESCRIPTION']],
        body: [
            ['90 - 100', '9.0 - 10.0', 'O', 'Outstanding'],
            ['80 - 89', '8.0 - 8.9', 'D+', 'Excellent'],
            ['75 - 79', '7.5 - 7.9', 'D', 'Distinction'],
            ['70 - 74', '7.0 - 7.4', 'A+', 'Very Good'],
            ['60 - 69', '6.0 - 6.9', 'A', 'Good'],
            ['50 - 59', '5.0 - 5.9', 'B', 'Average'],
            ['40 - 49', '4.0 - 4.9', 'C', 'Statisfactory'],
            ['00 - 39', '0.0', 'RA', 'Re-appear'],
            ['ABSENT', '0.0', 'AAA', 'Absent'],
        ]
    })

    const date_of_birth = semesterone.dob.toString().split(' ')
    const combine = date_of_birth[0] + ' ' + date_of_birth[1] + ' ' + date_of_birth[2] + ' ' + date_of_birth[3]
    doc.autoTable({
        head: [['PERSONAL INFORMATION']]
    })
    doc.autoTable({
        head: [['Name', 'Register Number', 'DOB', 'Gender', 'Student Email ID']],
        body: [
            [semesterone.name, semesterone.registerNumber, combine, semesterone.gender, semesterone.studentEmail]
        ]
    })
    doc.autoTable({
        head: [['SEMESTER 1']]
    })
    doc.autoTable({
        head: [['Course Code', 'Part', 'Course Title', 'Credits', 'Grade Points', 'Grade']],
        body: [
            [semesterone.course_code_1, semesterone.course_part_1, semesterone.course_title_1, semesterone.course_credits_1, semesterone.course_grade_points_1, semesterone.course_grade_1],
            [semesterone.course_code_2, semesterone.course_part_2, semesterone.course_title_2, semesterone.course_credits_2, semesterone.course_grade_points_2, semesterone.course_grade_2],
            [semesterone.course_code_3, semesterone.course_part_3, semesterone.course_title_3, semesterone.course_credits_3, semesterone.course_grade_points_3, semesterone.course_grade_3],
            [semesterone.course_code_4, semesterone.course_part_4, semesterone.course_title_4, semesterone.course_credits_4, semesterone.course_grade_points_4, semesterone.course_grade_4],
            [semesterone.course_code_5, semesterone.course_part_5, semesterone.course_title_5, semesterone.course_credits_5, semesterone.course_grade_points_5, semesterone.course_grade_5],
            [semesterone.course_code_6, semesterone.course_part_6, semesterone.course_title_6, semesterone.course_credits_6, semesterone.course_grade_points_6, semesterone.course_grade_6],
            [semesterone.course_code_7, semesterone.course_part_7, semesterone.course_title_7, semesterone.course_credits_7, semesterone.course_grade_points_7, semesterone.course_grade_7],
            [semesterone.course_code_8, semesterone.course_part_8, semesterone.course_title_8, semesterone.course_credits_8, semesterone.course_grade_points_8, semesterone.course_grade_8],
        ]
    })
    doc.addPage()
    doc.autoTable({
        head: [['SEMESTER 2']]
    })
    doc.autoTable({
        head: [['Course Code', 'Part', 'Course Title', 'Credits', 'Grade Points', 'Grade']],
        body: [
            [semestertwo.course_code_1, semestertwo.course_part_1, semestertwo.course_title_1, semestertwo.course_credits_1, semestertwo.course_grade_points_1, semestertwo.course_grade_1],
            [semestertwo.course_code_2, semestertwo.course_part_2, semestertwo.course_title_2, semestertwo.course_credits_2, semestertwo.course_grade_points_2, semestertwo.course_grade_2],
            [semestertwo.course_code_3, semestertwo.course_part_3, semestertwo.course_title_3, semestertwo.course_credits_3, semestertwo.course_grade_points_3, semestertwo.course_grade_3],
            [semestertwo.course_code_4, semestertwo.course_part_4, semestertwo.course_title_4, semestertwo.course_credits_4, semestertwo.course_grade_points_4, semestertwo.course_grade_4],
            [semestertwo.course_code_5, semestertwo.course_part_5, semestertwo.course_title_5, semestertwo.course_credits_5, semestertwo.course_grade_points_5, semestertwo.course_grade_5],
            [semestertwo.course_code_6, semestertwo.course_part_6, semestertwo.course_title_6, semestertwo.course_credits_6, semestertwo.course_grade_points_6, semestertwo.course_grade_6],
            [semestertwo.course_code_7, semestertwo.course_part_7, semestertwo.course_title_7, semestertwo.course_credits_7, semestertwo.course_grade_points_7, semestertwo.course_grade_7],
            [semestertwo.course_code_8, semestertwo.course_part_8, semestertwo.course_title_8, semestertwo.course_credits_8, semestertwo.course_grade_points_8, semestertwo.course_grade_8],
        ]
    })
    doc.addPage()
    doc.autoTable({
        head: [['SEMESTER 3']]
    })
    doc.autoTable({
        head: [['Course Code', 'Part', 'Course Title', 'Credits', 'Grade Points', 'Grade']],
        body: [
            [semesterthree.course_code_1, semesterthree.course_part_1, semesterthree.course_title_1, semesterthree.course_credits_1, semesterthree.course_grade_points_1, semesterthree.course_grade_1],
            [semesterthree.course_code_2, semesterthree.course_part_2, semesterthree.course_title_2, semesterthree.course_credits_2, semesterthree.course_grade_points_2, semesterthree.course_grade_2],
            [semesterthree.course_code_3, semesterthree.course_part_3, semesterthree.course_title_3, semesterthree.course_credits_3, semesterthree.course_grade_points_3, semesterthree.course_grade_3],
            [semesterthree.course_code_4, semesterthree.course_part_4, semesterthree.course_title_4, semesterthree.course_credits_4, semesterthree.course_grade_points_4, semesterthree.course_grade_4],
            [semesterthree.course_code_5, semesterthree.course_part_5, semesterthree.course_title_5, semesterthree.course_credits_5, semesterthree.course_grade_points_5, semesterthree.course_grade_5],
            [semesterthree.course_code_6, semesterthree.course_part_6, semesterthree.course_title_6, semesterthree.course_credits_6, semesterthree.course_grade_points_6, semesterthree.course_grade_6],
            [semesterthree.course_code_7, semesterthree.course_part_7, semesterthree.course_title_7, semesterthree.course_credits_7, semesterthree.course_grade_points_7, semesterthree.course_grade_7],
            [semesterthree.course_code_8, semesterthree.course_part_8, semesterthree.course_title_8, semesterthree.course_credits_8, semesterthree.course_grade_points_8, semesterthree.course_grade_8],
        ]
    })
    doc.addPage()
    doc.autoTable({
        head: [['SEMESTER 4']]
    })
    doc.autoTable({
        head: [['Course Code', 'Part', 'Course Title', 'Credits', 'Grade Points', 'Grade']],
        body: [
            [semesterfour.course_code_1, semesterfour.course_part_1, semesterfour.course_title_1, semesterfour.course_credits_1, semesterfour.course_grade_points_1, semesterfour.course_grade_1],
            [semesterfour.course_code_2, semesterfour.course_part_2, semesterfour.course_title_2, semesterfour.course_credits_2, semesterfour.course_grade_points_2, semesterfour.course_grade_2],
            [semesterfour.course_code_3, semesterfour.course_part_3, semesterfour.course_title_3, semesterfour.course_credits_3, semesterfour.course_grade_points_3, semesterfour.course_grade_3],
            [semesterfour.course_code_4, semesterfour.course_part_4, semesterfour.course_title_4, semesterfour.course_credits_4, semesterfour.course_grade_points_4, semesterfour.course_grade_4],
            [semesterfour.course_code_5, semesterfour.course_part_5, semesterfour.course_title_5, semesterfour.course_credits_5, semesterfour.course_grade_points_5, semesterfour.course_grade_5],
            [semesterfour.course_code_6, semesterfour.course_part_6, semesterfour.course_title_6, semesterfour.course_credits_6, semesterfour.course_grade_points_6, semesterfour.course_grade_6],
            [semesterfour.course_code_7, semesterfour.course_part_7, semesterfour.course_title_7, semesterfour.course_credits_7, semesterfour.course_grade_points_7, semesterfour.course_grade_7],
            [semesterfour.course_code_8, semesterfour.course_part_8, semesterfour.course_title_8, semesterfour.course_credits_8, semesterfour.course_grade_points_8, semesterfour.course_grade_8],
        ]
    })

    doc.autoTable({
        head: [['Predicted Grade On Final Year']],
        body: [
            [prediction]
        ]
    })

    doc.save('table.pdf')
}

exports.TablePDF = TablePDF;