from database_utils.database_utils import *
from database_utils.create_database import create_database
import sqlite3
from random import randint

conn = sqlite3.connect("db/kck.db")
cursor = conn.cursor()

create_database(cursor)

users = [
    { 'UserId': 253190, 'Name': 'Andrii', 'Surname': 'Bialkovskyi' },
    { 'UserId': 252501, 'Name': 'Dmytro', 'Surname': 'Malinovskyi' },
    { 'UserId': 253811, 'Name': 'Aliaksandr', 'Surname': 'Yurusau' },
    { 'UserId': 253805, 'Name': 'Mikita', 'Surname': 'Dzeviatau' },
]

for user in users:
    add_User(cursor, user['UserId'], user['Name'], user['Surname'], '123')

courses = [
    { 'CourseTitle': 'Analiza Matematyczna' },
    { 'CourseTitle': 'Programowanie Obiektowe 2' },
]

for course in courses:
    add_Course(cursor, course['CourseTitle'])

levels1 = ['Pochodne', 'Różniczki', 'Granice', 'Ciągi', 'Pierwotne']
for i in range(len(levels1)):
    add_Level(cursor, levels1[i], i, 1)

levels2 = ['Java - wprowadzenie', 'Typy danych', 'Klasy, Obiekty']
for i in range(len(levels2)):
    add_Level(cursor, levels2[i], i, 2)

for user in users:
    add_UserCourseData(cursor, user['UserId'], randint(1, 5))
    add_UserCourseData(cursor, user['UserId'], randint(6, 8))

question_id = 1
for i in range(len(levels1)):
    levelId = i + 1
    for j in range(randint(3, 7)):
        add_Question(cursor, f"Question #{j + 1}", i, levelId)
        for k in range(4):
            add_Answer(cursor, f"Answer #{i + 1}", k == 2, question_id)
        question_id += 1

for i in range(len(levels2)):
    levelId = i + 6
    for j in range(randint(3, 7)):
        add_Question(cursor, f"Question #{j + 1}", i, levelId)
        for k in range(4):
            add_Answer(cursor, f"Answer #{i + 1}", k == 2, question_id)
        question_id += 1

conn.commit()
conn.close()