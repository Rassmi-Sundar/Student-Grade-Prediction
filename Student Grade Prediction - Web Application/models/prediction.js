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

const Prediction = new Schema({
    semester_one_gpa: Number,
    semester_two_gpa: Number,
    semester_three_gpa: Number,
    semester_four_gpa: Number,
    first_year_grade_letter: String,
    second_year_grade_letter: String,
    report: [ImageSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, opts);

module.exports = mongoose.model('prediction', Prediction);