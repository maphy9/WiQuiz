from sqlite3 import Cursor

def add_Course(cursor: Cursor, title: str):
    cursor.execute("INSERT INTO Course (CourseTitle) VALUES (?)", (title,))

def get_Course(cursor: Cursor, courseId: int):
    cursor.execute("SELECT * FROM Course WHERE CourseId = ?", (courseId,))
    output = cursor.fetchone()
    result = {
        'CourseId': output[0],
        'CourseTitle': output[1]
    }
    return result

def add_User(cursor: Cursor, userId: int, name: str, surname: str, password: str):
    cursor.execute("INSERT INTO User VALUES (?, ?, ?, ?)", (userId, name, surname, password))

def get_User(cursor: Cursor, userId: int):
    cursor.execute("SELECT * FROM User WHERE UserId = ?", (userId,))
    output = cursor.fetchone()
    result = {
        'UserId': output[0],
        'Name': output[1],
        'Surname': output[2],
        'Password': output[3],
    }
    return result

def add_Level(cursor: Cursor, title: str, orderNumber: int, courseId: int):
    cursor.execute(
        """
        INSERT INTO Level (LevelTitle, OrderNumber, CourseId) 
        VALUES (?, ?, ?)
        """, (title, orderNumber, courseId)
    )

def get_all_Levels(cursor: Cursor, courseId: int):
    cursor.execute(
    """
    SELECT *
    FROM Level
    WHERE CourseId = ?
    """, (courseId,)
    )
    output = cursor.fetchall()
    result = [{
        'LevelId': level[0],
        'LevelTitle': level[1],
        'OrderNumber': level[2],
        'CourseId': level[3],
    } for level in output]
    return result

def add_UserCourseData(cursor: Cursor, userId: int, maxLevelId: int):
    cursor.execute(
    """
    INSERT INTO UserCourseData (UserId, MaxLevelId)
    VALUES (?, ?)
    """, (userId, maxLevelId)
    )

def get_UserCourseData(cursor: Cursor, userId: int, courseId: int):
    cursor.execute(
    """
    SELECT UserCourseDataId, MaxLevelId, LevelTitle
    FROM UserCourseData
    JOIN Level ON LevelId = MaxLevelId
    WHERE UserId = ? AND CourseId = ?
    """, (userId, courseId)
    )
    output = cursor.fetchall()
    result = {
        'UserCourseDataId': output[0],
        'UserId': output[1],
        'MaxLevelId': output[2],
    }
    return result

def add_Question(cursor: Cursor, questionText: str, orderNumber: int, levelId: int):
    cursor.execute(
    """
    INSERT INTO Question (QuestionText, OrderNumber, LevelId)
    VALUES (?, ?, ?)
    """, (questionText, orderNumber, levelId)
    )

def get_all_Questions(cursor: Cursor, levelId: int):
    cursor.execute(
        """
        SELECT QuestionId, QuestionText, OrderNumber
        FROM Question
        WHERE LevelId = ?
        """, (levelId,)
    )
    output = cursor.fetchall()
    return [{
        'QuestionId': row[0],
        'QuestionText': row[1],
        'OrderNumber': row[2]
    } for row in output]

def add_Answer(cursor: Cursor, answerText: str, isCorrect: bool, questionId: int):
    cursor.execute(
    """
    INSERT INTO Answer (AnswerText, IsCorrect, QuestionId)
    VALUES (?, ?, ?)
    """, (answerText, isCorrect, questionId)
    )

def get_Question_Answers(cursor: Cursor, questionId: int):
    cursor.execute(
    """
    SELECT AnswerId, AnswerText, isCorrect
    FROM Answer
    WHERE QuestionId = ?
    """, (questionId)
    )
    output = cursor.fetchall()
    result = [{
        'AnswerId': level[0],
        'AnswerText': level[1],
        'IsCorrect': level[2],
        'QuestionId': level[3],
    } for level in output]
    return result