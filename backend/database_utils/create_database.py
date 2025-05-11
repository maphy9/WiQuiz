from sqlite3 import Cursor

def create_database(cursor: Cursor):
  cursor.execute("""
  CREATE TABLE IF NOT EXISTS User (
    UserId INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Surname TEXT NOT NULL,
    Password TEXT
  )
  """)

  cursor.execute("""
  CREATE TABLE IF NOT EXISTS Course (
    CourseId INTEGER PRIMARY KEY AUTOINCREMENT,
    CourseTitle TEXT NOT NULL
  )
  """)

  cursor.execute("""
  CREATE TABLE IF NOT EXISTS Level (
    LevelId INTEGER PRIMARY KEY AUTOINCREMENT,
    LevelTitle TEXT,
    OrderNumber INTEGER,
    CourseId INTEGER,
    FOREIGN KEY (CourseId) REFERENCES Course (CourseId)
  )
  """)

  cursor.execute("""
  CREATE TABLE IF NOT EXISTS UserCourseData (
    UserCourseDataId INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER,
    MaxLevelId INTEGER,
    FOREIGN KEY (UserId) REFERENCES User (UserId),
    FOREIGN KEY (MaxLevelId) REFERENCES Level (LevelId)
  )
  """)

  cursor.execute("""
  CREATE TABLE IF NOT EXISTS Question (
    QuestionId INTEGER PRIMARY KEY AUTOINCREMENT,
    QuestionText TEXT,
    OrderNumber INTEGER,
    LevelId INTEGER,
    FOREIGN KEY (LevelId) REFERENCES Level (LevelId)
  )
  """)

  cursor.execute("""
  CREATE TABLE IF NOT EXISTS Answer (
    AnswerId INTEGER PRIMARY KEY AUTOINCREMENT,
    AnswerText TEXT,
    IsCorrect BOOLEAN,
    QuestionId INTEGER,
    FOREIGN KEY (QuestionId) REFERENCES Question (QuestionId)
  )
  """)