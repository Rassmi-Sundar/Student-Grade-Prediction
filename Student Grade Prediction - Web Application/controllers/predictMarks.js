const semesterOne = require('../models/semesterOne');
const semesterTwo = require('../models/semesterTwo');
const semesterThree = require('../models/semesterThree');
const semesterFour = require('../models/semesterFour');
const predictionModel = require('../models/prediction');
const axios = require('axios');
const Event = require('../utils/pdf.js');
const nodemailer = require('nodemailer');
const { cloudinary } = require("../cloudinary");
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowedFormats: ['jpeg','jpg','png','JFIF','pdf']
    }
});

function calc_gpa(counter, sum) {
    return Number(sum) / Number(counter)
}

function computation(array) {
    let summation1 = 0
    let summation2 = 0
    let summation3 = 0
    let summation4 = 0
    let summation5 = 0
    let total_credits1 = 0
    let total_credits2 = 0
    let total_credits3 = 0
    let total_credits4 = 0
    let total_credits5 = 0
    let total_count1 = 0
    let total_count2 = 0
    let total_count3 = 0
    let total_count4 = 0
    let total_count5 = 0
    let counter = 0
    array.forEach(x => {
        if (x.part == 1) {
            counter += Number(x.credit)
            total_credits1 += Number(x.credit)
            total_count1 += 1
            summation1 += Number(x.point)
        } else if (x.part == 2) {
            counter += Number(x.credit)
            total_credits2 += Number(x.credit)
            total_count2 += 1
            summation2 += Number(x.point)
        } else if (x.part == 3) {
            counter += Number(x.credit)
            total_credits3 += Number(x.credit)
            total_count3 += 1
            summation3 += Number(x.point)
        } else if (x.part == 4) {
            counter += Number(x.credit)
            total_credits4 += Number(x.credit)
            total_count4 += 1
            summation4 += Number(x.point)
        } else if (x.part == 5) {
            counter += Number(x.credit)
            total_credits5 += Number(x.credit)
            total_count5 += 1
            summation5 += Number(x.point)
        }
    })
    // console.log(counter)
    // console.log(total_count1,total_count2,total_count3,total_count4,total_count5)
    // console.log(summation1,summation2,summation3,summation4,summation5)
    let sum1 = Number(summation1 / total_count1) || 0
    let sum2 = Number(summation2 / total_count2) || 0
    let sum3 = Number(summation3 / total_count3) || 0
    let sum4 = Number(summation4 / total_count4) || 0
    let sum5 = Number(summation5 / total_count5) || 0
    let multiply1 = Number(total_credits1 * sum1) || 0
    let multiply2 = Number(total_credits2 * sum2) || 0
    let multiply3 = Number(total_credits3 * sum3) || 0
    let multiply4 = Number(total_credits4 * sum4) || 0
    let multiply5 = Number(total_credits5 * sum5) || 0
    const sum = multiply1 + multiply2 + multiply3 + multiply4 + multiply5
    let gpa = calc_gpa(counter, sum)
    return gpa
}

function mapping(form_result) {
    let array = []
    const course_part_1 = form_result.course_part_1
    const course_credits_1 = form_result.course_credits_1
    const course_grade_points_1 = form_result.course_grade_points_1
    const course_part_2 = form_result.course_part_2
    const course_credits_2 = form_result.course_credits_2
    const course_grade_points_2 = form_result.course_grade_points_2
    const course_part_3 = form_result.course_part_3
    const course_credits_3 = form_result.course_credits_3
    const course_grade_points_3 = form_result.course_grade_points_3
    const course_part_4 = form_result.course_part_4
    const course_credits_4 = form_result.course_credits_4
    const course_grade_points_4 = form_result.course_grade_points_4
    const course_part_5 = form_result.course_part_5
    const course_credits_5 = form_result.course_credits_5
    const course_grade_points_5 = form_result.course_grade_points_5
    const course_part_6 = form_result.course_part_6
    const course_credits_6 = form_result.course_credits_6
    const course_grade_points_6 = form_result.course_grade_points_6
    const course_part_7 = form_result.course_part_7
    const course_credits_7 = form_result.course_credits_7
    const course_grade_points_7 = form_result.course_grade_points_7
    const course_part_8 = form_result.course_part_8
    const course_credits_8 = form_result.course_credits_8
    const course_grade_points_8 = form_result.course_grade_points_8
    array.push(
        {
            part: course_part_1,
            credit: course_credits_1,
            point: course_grade_points_1
        },
        {
            part: course_part_2,
            credit: course_credits_2,
            point: course_grade_points_2
        },
        {
            part: course_part_3,
            credit: course_credits_3,
            point: course_grade_points_3
        },
        {
            part: course_part_4,
            credit: course_credits_4,
            point: course_grade_points_4
        },
        {
            part: course_part_5,
            credit: course_credits_5,
            point: course_grade_points_5
        },
        {
            part: course_part_6,
            credit: course_credits_6,
            point: course_grade_points_6
        },
        {
            part: course_part_7,
            credit: course_credits_7,
            point: course_grade_points_7
        },
        {
            part: course_part_8,
            credit: course_credits_8,
            point: course_grade_points_8
        }
    )
    return array
}

function grade_letter(grade_points) {
    if (grade_points >= 9.0 && grade_points <= 10.0) {
        return "O"
    } else if (grade_points >= 8.0 && grade_points <= 8.9) {
        return "D+"
    } else if (grade_points >= 7.5 && grade_points <= 7.9) {
        return "D"
    } else if (grade_points >= 7.0 && grade_points <= 7.4) {
        return "A+"
    } else if (grade_points >= 6.0 && grade_points <= 6.9) {
        return "A"
    } else if (grade_points >= 5.0 && grade_points <= 5.9) {
        return "B"
    } else if (grade_points >= 4.0 && grade_points <= 4.9) {
        return "C"
    } else if (grade_points >= 0.1 && grade_points <= 3.9) {
        return "RA"
    } else if (grade_points == 0.0 && grade_points == 0.0) {
        return "AAA"
    }
}

module.exports.index = async (req, res) => {
    const semesterone = await semesterOne.find({}).populate('popupText');
    const semestertwo = await semesterTwo.find({}).populate('popupText');
    const semesterthree = await semesterThree.find({}).populate('popupText');
    const semesterfour = await semesterFour.find({}).populate('popupText');
    res.render('predict/index', { semesterone, semestertwo, semesterthree, semesterfour })
}

module.exports.prediction = async (req, res, next) => {
    let prediction;
    let pdfUrl;
    const form_result1 = req.body.semesterone
    const form_result2 = req.body.semestertwo
    const form_result3 = req.body.semesterthree
    const form_result4 = req.body.semesterfour
    const array1 = mapping(form_result1)
    const array2 = mapping(form_result2)
    const array3 = mapping(form_result3)
    const array4 = mapping(form_result4)
    // SEMESTER 1 GPA
    const semester_one_gpa = computation(array1)
    // console.log('sem gpa 1', semester_one_gpa)
    // SEMESTER 2 GPA
    const semester_two_gpa = computation(array2)
    // console.log('sem gpa 2', semester_two_gpa)
    // SEMESTER 3 GPA
    const semester_three_gpa = computation(array3)
    // console.log('sem gpa 3', semester_three_gpa)
    // SEMESTER 4 GPA
    const semester_four_gpa = computation(array4)
    // console.log('sem gpa 4', semester_four_gpa)

    const first_year = Number((semester_one_gpa + semester_two_gpa) / 2)
    const second_year = Number((semester_three_gpa + semester_four_gpa) / 2)
    const first_year_grade_letter = grade_letter(first_year)
    const second_year_grade_letter = grade_letter(second_year)
    const url = `https://student-grade-prediction-be.herokuapp.com?sem_1=${semester_one_gpa}&sem_2=${semester_two_gpa}&sem_3=${semester_three_gpa}&sem_4=${semester_four_gpa}`

    await axios.get(url).then(res => {
        // console.log('response',res)
        prediction = res.data.predicted_grade
    })

    const pred =  new predictionModel({
        semester_one_gpa,
        semester_two_gpa,
        semester_three_gpa,
        semester_four_gpa,
        first_year_grade_letter,
        second_year_grade_letter
    })

    const semesterone = new semesterOne(req.body.semesterone);
    const semestertwo = new semesterTwo(req.body.semestertwo);
    const semesterthree = new semesterThree(req.body.semesterthree);
    const semesterfour = new semesterFour(req.body.semesterfour);

    semesterone.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    semesterone.author = req.user._id;
    await semesterone.save();
    await semestertwo.save();
    await semesterthree.save();
    await semesterfour.save();
    // res.redirect('/predict/result')
    await Event.TablePDF(semesterone,semestertwo,semesterthree,semesterfour,prediction)
    pred.report = await cloudinary.uploader.upload("table.pdf", { folder: "YelpCamp", access_mode: "public" },
    function(error, result) {
        pdfUrl = result.url
        console.log(result, error); 
    });
    console.log('url',pdfUrl)
    await pred.save()
    req.flash('success','Successfully predicted !')
    res.render('predict/result', { semesterone, pdfUrl })
}

module.exports.sendMail = async(req,res) => {
    const email = req.query.email
    console.log(email)
    let mailTransporter = new nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_MAIL_ID,
            pass: process.env.USER_PASS
        }
    });
      
    let mailDetails = {
        from: process.env.USER_MAIL_ID,
        to: email,
        subject: 'Student Report',
        text: "This report is mainly to convey the message of the student's final year grade.",
        attachments: [{
            filename: 'Student Report.pdf',
            path: './table.pdf'
        }]
    };
    console.log(mailDetails)
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs',err);
        } else {
            console.log('Email sent successfully !');
        }
    });
    res.send('Mail sent successfully !')
}