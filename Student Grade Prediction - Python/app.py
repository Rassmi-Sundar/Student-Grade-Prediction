from flask import Flask, render_template, request, jsonify
import pickle as pkl
import pandas as pd

filename = 'finalized_grade_prediction.pkl'
classifier = pkl.load(open(filename, 'rb'))

app = Flask(__name__)

convert_prediction = {1: 'O',2: 'D+',3: 'D',4: 'A+',5: 'A',6: 'B',7: 'C',8: 'RA',9: 'AAA'}

@app.route('/',methods=['GET'])
def predict():

    if request.method == 'GET':
        sem_1 = float(request.args.get('sem_1'))
        sem_2 = float(request.args.get('sem_2'))
        sem_3 = float(request.args.get('sem_3'))
        sem_4 = float(request.args.get('sem_4'))
        first_year_grade_point = ( sem_1 + sem_2 ) / 2
        second_year_grade_point = ( sem_3 + sem_4 ) / 2
        first_year_grade_letter = grade(first_year_grade_point)
        second_year_grade_letter = grade(second_year_grade_point)
        one_hot_encode = one_hot_encoding([str("year_1_" + first_year_grade_letter),str("year_2_" + second_year_grade_letter)])
        prediction = classifier.predict(one_hot_encode)
        result = convert_prediction.get(int(prediction))
        return jsonify(predicted_grade=result)

def grade(grade_points):
    if grade_points >= 9.0 and grade_points <= 10.0:
        return "O"
    elif grade_points >= 8.0 and grade_points <= 8.9:
        return "D+"
    elif grade_points >= 7.5 and grade_points <= 7.9:
        return "D"
    elif grade_points >= 7.0 and grade_points <= 7.4:
        return "A+"
    elif grade_points >= 6.0 and grade_points <= 6.9:
        return "A"
    elif grade_points >= 5.0 and grade_points <= 5.9:
        return "B"
    elif grade_points >= 4.0 and grade_points <= 4.9:
        return "C"
    elif grade_points >= 0.1 and grade_points <= 3.9:
        return "RA"
    elif grade_points == 0.0 and grade_points == 0.0:
        return "AAA"

def one_hot_encoding(grade_letter):
    data = {'year_1_A': [0], 'year_1_A+': [0], 'year_1_AAA': [0],
            'year_1_B': [0], 'year_1_C': [0], 'year_1_D': [0],
            'year_1_D+': [0], 'year_1_O': [0], 'year_1_RA': [0],
            'year_2_A': [0], 'year_2_A+': [0], 'year_2_AAA': [0],
            'year_2_B': [0], 'year_2_C': [0], 'year_2_D': [0],
            'year_2_D+': [0], 'year_2_O': [0], 'year_2_RA': [0]}

    for value in data:
        if ( str(value) == grade_letter[0] ):
            data[value] = [1]
        elif ( str(value) == grade_letter[1] ):
            data[value] = [1]
    
    dataframe = pd.DataFrame(data,columns=['year_1_A', 'year_1_A+', 'year_1_AAA', 'year_1_B', 'year_1_C',
       'year_1_D', 'year_1_D+', 'year_1_O', 'year_1_RA', 'year_2_A',
       'year_2_A+', 'year_2_AAA', 'year_2_B', 'year_2_C', 'year_2_D',
       'year_2_D+', 'year_2_O', 'year_2_RA'])
    
    return dataframe


if __name__ == '__main__':
	app.run()