const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const SemesterOne = new Schema({
    name: String,
    images: [ImageSchema],
    registerNumber: Number,
    dob: Date,
    gender: String,
    studentEmail: String,
    course_code_1: String,
    course_part_1: Number,
    course_title_1: String,
    course_credits_1: Number,
    course_grade_points_1: Number,
    course_grade_1: String,
    course_code_2: String,
    course_part_2: Number,
    course_title_2: String,
    course_credits_2: Number,
    course_grade_points_2: Number,
    course_grade_2: String,
    course_code_3: String,
    course_part_3: Number,
    course_title_3: String,
    course_credits_3: Number,
    course_grade_points_3: Number,
    course_grade_3: String,
    course_code_4: String,
    course_part_4: Number,
    course_title_4: String,
    course_credits_4: Number,
    course_grade_points_4: Number,
    course_grade_4: String,
    course_code_5: String,
    course_part_5: Number,
    course_title_5: String,
    course_credits_5: Number,
    course_grade_points_5: Number,
    course_grade_5: String,
    course_code_6: String,
    course_part_6: Number,
    course_title_6: String,
    course_credits_6: Number,
    course_grade_points_6: Number,
    course_grade_6: String,
    course_code_7: String,
    course_part_7: Number,
    course_title_7: String,
    course_credits_7: Number,
    course_grade_points_7: Number,
    course_grade_7: String,
    course_code_8: String,
    course_part_8: Number,
    course_title_8: String,
    course_credits_8: Number,
    course_grade_points_8: Number,
    course_grade_8: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, opts);

module.exports = mongoose.model('SemesterOne', SemesterOne);