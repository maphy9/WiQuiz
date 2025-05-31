from database_utils.database_utils import *
from database_utils.create_database import create_database
import sqlite3
from random import randint

conn = sqlite3.connect("db/kck.db")
cursor = conn.cursor()

create_database(cursor)

courses = [
    { 'CourseTitle': 'Analiza Matematyczna' },
    { 'CourseTitle': 'Programowanie Obiektowe 2' },
]

add_Course(cursor, 'Analiza Matematyczna')

conn.commit()
conn.close()