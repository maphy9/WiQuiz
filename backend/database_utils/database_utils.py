from sqlite3 import Cursor

# -----------------------
# COURSE METHODS
# -----------------------

def add_Course(cursor: Cursor, title: str):
    cursor.execute("INSERT INTO Course (CourseTitle) VALUES (?)", (title,))

def get_Course(cursor: Cursor, courseId: int):
    cursor.execute(
        "SELECT * FROM Course WHERE CourseId = ?",
        (courseId,)
    )
    row = cursor.fetchone()
    if row is None:
        return None
    return {
        'CourseId': row[0],
        'CourseTitle': row[1]
    }

# -----------------------
# USER METHODS
# -----------------------

def add_User(cursor: Cursor, userId: int, name: str, password: str):
    cursor.execute(
        "INSERT INTO User VALUES (?, ?, ?)",
        (userId, name, password)
    )

def get_User(cursor: Cursor, userId: int):
    cursor.execute(
        "SELECT * FROM User WHERE UserId = ?",
        (userId,)
    )
    row = cursor.fetchone()
    if row is None:
        return None
    return {
        'UserId': row[0],
        'Name': row[1],
        'Password': row[3],
    }

def get_All_Users(cursor: Cursor):
    cursor.execute("SELECT * FROM User")
    rows = cursor.fetchall()
    result = []
    for row in rows:
        print(row)
        user = {
            'UserId': row[0],
            'Name': row[1],
            'Password': row[2],
        }
        result.append(user)
    return result

# -----------------------
# LEVEL METHODS
# -----------------------

def add_Level(cursor: Cursor, title: str, orderNumber: int, courseId: int):
    cursor.execute(
        """
        INSERT INTO Level (LevelTitle, OrderNumber, CourseId)
        VALUES (?, ?, ?)
        """,
        (title, orderNumber, courseId)
    )

def get_all_Levels(cursor: Cursor, courseId: int):
    cursor.execute(
        """
        SELECT LevelId, LevelTitle, OrderNumber, CourseId
        FROM Level
        WHERE CourseId = ?
        ORDER BY OrderNumber
        """,
        (courseId,)
    )
    rows = cursor.fetchall()
    return [{
        'LevelId': row[0],
        'LevelTitle': row[1],
        'OrderNumber': row[2],
        'CourseId': row[3],
    } for row in rows]

def get_Level(cursor: Cursor, levelId: int):
    cursor.execute(
        """
        SELECT LevelId, LevelTitle, OrderNumber, CourseId
        FROM Level
        WHERE LevelId = ?
        """,
        (levelId,)
    )
    row = cursor.fetchone()
    if row is None:
        return None
    return {
        'LevelId': row[0],
        'LevelTitle': row[1],
        'OrderNumber': row[2],
        'CourseId': row[3],
    }

def update_Level(cursor: Cursor, levelId: int, title: str, orderNumber: int, courseId: int):
    cursor.execute(
        """
        UPDATE Level
        SET LevelTitle = ?, OrderNumber = ?, CourseId = ?
        WHERE LevelId = ?
        """,
        (title, orderNumber, courseId, levelId)
    )

def delete_Level(cursor: Cursor, levelId: int):
    # First delete all questions and their answers for this level
    cursor.execute(
        """
        DELETE FROM Answer 
        WHERE QuestionId IN (
            SELECT QuestionId FROM Question WHERE LevelId = ?
        )
        """,
        (levelId,)
    )
    cursor.execute(
        "DELETE FROM Question WHERE LevelId = ?",
        (levelId,)
    )
    cursor.execute(
        "DELETE FROM Level WHERE LevelId = ?",
        (levelId,)
    )

# -----------------------
# QUESTION METHODS
# -----------------------

def add_Question(cursor: Cursor, questionTitle: str, questionText: str, orderNumber: int, levelId: int):
    cursor.execute(
        """
        INSERT INTO Question (QuestionTitle, QuestionText, OrderNumber, LevelId)
        VALUES (?, ?, ?, ?)
        """,
        (questionTitle, questionText, orderNumber, levelId)
    )

def get_all_Questions(cursor: Cursor, levelId: int):
    cursor.execute(
        """
        SELECT QuestionId, QuestionTitle, QuestionText, OrderNumber, LevelId
        FROM Question
        WHERE LevelId = ?
        ORDER BY OrderNumber
        """,
        (levelId,)
    )
    rows = cursor.fetchall()
    return [{
        'QuestionId': row[0],
        'QuestionTitle': row[1],
        'QuestionText': row[2],
        'OrderNumber': row[3],
        'LevelId': row[4],
    } for row in rows]

def get_Question(cursor: Cursor, questionId: int):
    cursor.execute(
        """
        SELECT QuestionId, QuestionTitle, QuestionText, OrderNumber, LevelId
        FROM Question
        WHERE QuestionId = ?
        """,
        (questionId,)
    )
    row = cursor.fetchone()
    if row is None:
        return None
    return {
        'QuestionId': row[0],
        'QuestionTitle': row[1],
        'QuestionText': row[2],
        'OrderNumber': row[3],
        'LevelId': row[4],
    }

def update_Question(cursor: Cursor, questionId: int, questionTitle: str, questionText: str, orderNumber: int, levelId: int):
    cursor.execute(
        """
        UPDATE Question
        SET QuestionTitle = ?, QuestionText = ?, OrderNumber = ?, LevelId = ?
        WHERE QuestionId = ?
        """,
        (questionTitle, questionText, orderNumber, levelId, questionId)
    )

def delete_Question(cursor: Cursor, questionId: int):
    # First delete all answers for this question
    cursor.execute(
        "DELETE FROM Answer WHERE QuestionId = ?",
        (questionId,)
    )
    cursor.execute(
        "DELETE FROM Question WHERE QuestionId = ?",
        (questionId,)
    )

# -----------------------
# ANSWER METHODS
# -----------------------

def add_Answer(cursor: Cursor, answerText: str, isCorrect: bool, questionId: int):
    cursor.execute(
        """
        INSERT INTO Answer (AnswerText, IsCorrect, QuestionId)
        VALUES (?, ?, ?)
        """,
        (answerText, isCorrect, questionId)
    )

def get_Question_Answers(cursor: Cursor, questionId: int):
    cursor.execute(
        """
        SELECT AnswerId, AnswerText, IsCorrect, QuestionId
        FROM Answer
        WHERE QuestionId = ?
        """,
        (questionId,)
    )
    rows = cursor.fetchall()
    return [{
        'AnswerId': row[0],
        'AnswerText': row[1],
        'IsCorrect': bool(row[2]),
        'QuestionId': row[3],
    } for row in rows]

def get_Answer(cursor: Cursor, answerId: int):
    cursor.execute(
        """
        SELECT AnswerId, AnswerText, IsCorrect, QuestionId
        FROM Answer
        WHERE AnswerId = ?
        """,
        (answerId,)
    )
    row = cursor.fetchone()
    if row is None:
        return None
    return {
        'AnswerId': row[0],
        'AnswerText': row[1],
        'IsCorrect': bool(row[2]),
        'QuestionId': row[3],
    }

def update_Answer(cursor: Cursor, answerId: int, answerText: str, isCorrect: bool):
    cursor.execute(
        """
        UPDATE Answer
        SET AnswerText = ?, IsCorrect = ?
        WHERE AnswerId = ?
        """,
        (answerText, isCorrect, answerId)
    )

def delete_Answer(cursor: Cursor, answerId: int):
    cursor.execute(
        "DELETE FROM Answer WHERE AnswerId = ?",
        (answerId,)
    )

def get_User_by_name(cursor: Cursor, name: str):
    cursor.execute("SELECT * FROM User WHERE Name = ?", (name,))
    output = cursor.fetchone()
    if not output:
        return None
    return {
        'UserId': output[0],
        'Name': output[1],
        'Password': output[2],
    }

def get_first_Level_of_course(cursor: Cursor, courseId: int):
    cursor.execute("""
    SELECT * FROM Level
    WHERE CourseId = ?
    ORDER BY OrderNumber ASC
    LIMIT 1
    """, (courseId,))
    row = cursor.fetchone()
    if not row:
        return None
    return {
        'LevelId': row[0],
        'LevelTitle': row[1],
        'OrderNumber': row[2],
        'CourseId': row[3],
    }

def get_UserCourseData_and_Level(cursor: Cursor, userId: int, courseId: int):
    cursor.execute("""
    SELECT 
      UserCourseData.UserCourseDataId,
      UserCourseData.MaxLevelId,
      Level.LevelTitle,
      Level.OrderNumber,
      Level.CourseId,
      UserCourseData.CorrectAnswers,
      UserCourseData.TotalAnswers
    FROM UserCourseData
    JOIN Level ON Level.LevelId = UserCourseData.MaxLevelId
    WHERE UserId = ? AND Level.CourseId = ?
    """, (userId, courseId))
    row = cursor.fetchone()
    if not row:
        return None
    return {
        'UserCourseDataId': row[0],
        'MaxLevelId': row[1],
        'LevelTitle': row[2],
        'OrderNumber': row[3],
        'CourseId': row[4],
        'CorrectAnswers': row[5],
        'TotalAnswers': row[6],
    }


def update_MaxLevelId(cursor: Cursor, user_id: int, course_id: int, new_max_level_id: int, db_path="db/kck.db"):
    cursor.execute("""
        SELECT 1 FROM UserCourseData
        WHERE UserId = ? AND CourseId = ?
    """, (user_id, course_id))
    exists = cursor.fetchone()

    cursor.execute("""
        UPDATE UserCourseData
        SET MaxLevelId = ?
        WHERE UserId = ? AND CourseId = ?
    """, (new_max_level_id, user_id, course_id))


def add_AnswerStats(cursor: Cursor, userId: int, courseId: int, isCorrect: bool):
    userCourseData = get_UserCourseData_and_Level(cursor, userId, courseId)
    totalAnswers = userCourseData['TotalAnswers']
    correctAnswers = userCourseData['CorrectAnswers']
    cursor.execute("""
        UPDATE UserCourseData
        SET TotalAnswers = ?
        WHERE UserId = ? AND CourseId = ?
    """, (totalAnswers + 1, userId, courseId))

    if isCorrect:
        cursor.execute("""
            UPDATE UserCourseData
            SET CorrectAnswers = ?
            WHERE UserId = ? AND CourseId = ?
        """, (correctAnswers + 1, userId, courseId))


def get_Stats(cursor: Cursor, courseId: int):
    users = get_All_Users(cursor)
    res = []
    for user in users:
        userCourseData = get_UserCourseData_and_Level(cursor, user["UserId"], courseId)
        totalAnswers = userCourseData["TotalAnswers"]
        correctAnswers = userCourseData["CorrectAnswers"]
        numberOfLevels = len(get_all_Levels(cursor, courseId))
        correctPercentage = 0 if totalAnswers == 0 else round(correctAnswers / totalAnswers * 100, 2)
        isComplete = numberOfLevels == userCourseData["OrderNumber"]
        stats = {
            "Name": user["Name"],
            "MaxLevelReached": userCourseData["OrderNumber"],
            "CorrectPercentage": correctPercentage,
            "IsComplete": isComplete
        }
        res.append(stats)
    return res
