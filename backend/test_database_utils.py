from random import randint
from sqlite3 import connect
from database_utils.database_utils import *
from database_utils.create_database import create_database


conn = connect('db/test.db')
cursor = conn.cursor()

create_database(cursor)

def test_Course_functions():
    courses = [
        { 'CourseTitle': 'Course 1' },
        { 'CourseTitle': 'Course 2' },
    ]

    for i in range(len(courses)):
        CourseTitle = courses[i]['CourseTitle']
        add_Course(cursor, CourseTitle)
        result = get_Course(cursor, i + 1)
        assert result["CourseTitle"] == CourseTitle

def test_User_functions():
    users = [
        { 'UserId': 253190, 'Name': 'Andrii', 'Surname': 'Bialkovskyi' },
        { 'UserId': 252501, 'Name': 'Dmytro', 'Surname': 'Malinovskyi' },
        { 'UserId': 253811, 'Name': 'Aliaksandr', 'Surname': 'Yurusau' },
        { 'UserId': 253805, 'Name': 'Mikita', 'Surname': 'Dzeviatau' },
    ]

    for i in range(len(users)):
        user = users[i]
        add_User(cursor, user['UserId'], user['Name'], user['Surname'], '123')
        result = get_User(cursor, user['UserId'])
        assert result['UserId'] == user['UserId']
        assert result['Name'] == user['Name']
        assert result['Surname'] == user['Surname']
        assert result['Password'] == '123'

def test_Level_functions():
    levels = ['Pochodne', 'Różniczki', 'Granice', 'Ciągi', 'Pierwotne']
    for i in range(len(levels)):
        add_Level(cursor, levels[i], i, 1)
    result = get_all_Levels(cursor, 1)
    assert len(result) == len(levels)
    for i in range(len(result)):
        l1 = result[i]
        l2 = levels[i]
        assert l1['LevelId'] == i + 1
        assert l1['LevelTitle'] == l2
        assert l1['OrderNumber'] == i
        assert l1['CourseId'] == 1

test_Course_functions()
test_User_functions()
test_Level_functions()

conn.commit()
conn.close()