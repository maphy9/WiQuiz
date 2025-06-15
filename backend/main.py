# main.py

import sqlite3
import random
from typing import Dict, Any
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database_utils.database_utils import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rooms: Dict[str, Dict[str, Any]] = {}


def generate_team_code() -> str:
    return ''.join(str(random.randint(0, 9)) for _ in range(6))

async def broadcast_players_update(room_code: str):
    room = rooms.get(room_code)
    if not room:
        return
    data = {
        "type": "players_update",
        "players": room["players"],
    }
    for ws in room["websockets"]:
        await ws.send_json(data)


async def connect_player_to_room(room_code: str, player: Dict[str, Any], websocket: WebSocket):
    for code, room in list(rooms.items()):
        if websocket in room["websockets"]:
            await disconnect_player_from_room(code, websocket)

    if room_code not in rooms:
        rooms[room_code] = {
            "players": [],
            "stage": "main-menu",
            "levelId": None,
            "websockets": []
        }

    room = rooms[room_code]

    if len(room["players"]) < 3:
        room["players"].append(player)
        room["websockets"].append(websocket)
        await broadcast_players_update(room_code)


async def disconnect_player_from_room(room_code: str, websocket: WebSocket):
    room = rooms.get(room_code)
    if not room:
        return
    try:
        idx = room["websockets"].index(websocket)
    except ValueError:
        return
    room["websockets"].pop(idx)
    room["players"].pop(idx)
    if not room["players"]:
        del rooms[room_code]
    else:
        await broadcast_players_update(room_code)


@app.websocket("/ws/{room_code}/{player_id}")
async def websocket_endpoint(websocket: WebSocket, room_code: str, player_id: str):
    await websocket.accept()

    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()

    # Assume your User table has columns: UserId (PK), Name, Avatar
    cursor.execute(
        "SELECT UserId, Name FROM User WHERE UserId = ?",
        (player_id,),
    )
    row = cursor.fetchone()
    if not row:
        await websocket.close(code=1008)
        conn.close()
        return

    user_id, name = row

    cursor.execute(
        "SELECT MaxLevelId FROM UserCourseData WHERE UserId = ?",
        (user_id,),
    )
    ucd_row = cursor.fetchone()
    max_level_id = ucd_row[0]

    max_level = get_Level(cursor, max_level_id)

    conn.close()
    player = {
        "id": user_id,
        "name": name,
        "maxOrderNumber": -1
    }
    if (not max_level is None):
        player = {
            "id": user_id,
            "name": name,
            "maxOrderNumber": max_level["OrderNumber"]
        }
    

    await connect_player_to_room(room_code, player, websocket)

    try:
        while True:
            data = await websocket.receive_json()
            room = rooms[room_code]

            if data.get("type") == "change_stage":
                room["stage"] = data["stage"]
                if "levelIndex" in data:
                    room["levelIndex"] = data["levelIndex"]

            # Broadcast whatever the client sent to everyone else in this room:
            for ws in room["websockets"]:
                await ws.send_json(data)

    except WebSocketDisconnect:
        await disconnect_player_from_room(room_code, websocket)


# Pydantic Models
class LevelCreate(BaseModel):
    LevelTitle: str
    OrderNumber: int
    CourseId: int = 1  # Default to course 1


class LevelUpdate(BaseModel):
    LevelTitle: str
    OrderNumber: int
    CourseId: int = 1


class AnswerCreate(BaseModel):
    AnswerText: str
    IsCorrect: bool
    QuestionId: int


class QuestionCreate(BaseModel):
    QuestionTitle: str
    QuestionText: str
    OrderNumber: int
    LevelId: int
    answers: list[AnswerCreate]


class AnswerUpdate(BaseModel):
    AnswerId: int
    AnswerText: str
    IsCorrect: bool

class QuestionUpdate(BaseModel):
    QuestionTitle: str
    QuestionText: str
    OrderNumber: int
    LevelId: int
    answers: list[AnswerUpdate]

class UserUpdate(BaseModel):
    UserId: int
    CourseId: int
    NewMaxLevelId: int | None

class GetMaxOrderNumberForBebrik(BaseModel):
    UserId: int
    CourseId: int

class AddAnswerForBebrik(BaseModel):
    UserId: int
    CourseId: int
    IsCorrect: bool

class GetStats(BaseModel):
    CourseId: int

@app.get("/getCourse")
def getCourse():
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()

    res = get_Course(cursor, 1)
    conn.close()
    return { "title": res["CourseTitle"] }

@app.post("/getStats", status_code=201)
def getStats(payload: GetStats):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()

    res = get_Stats(cursor, payload.CourseId)
    conn.close()
    return res

@app.post("/addAnswerForBebrik", status_code=201)
def addAnswerForBebrik(payload: AddAnswerForBebrik):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()

    add_AnswerStats(cursor, payload.UserId, payload.CourseId, payload.IsCorrect)
    conn.commit()
    conn.close()
    return {"message": "Recursion is working correctly - bebra/<52>/"}

@app.post("/getMaxOrderNumberForBebrik", status_code=201)
def getMaxOrderNumberForBebrik(payload: GetMaxOrderNumberForBebrik):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()

    maxLevel = get_UserCourseData_and_Level(cursor, payload.UserId, payload.CourseId)
    conn.close()
    if (maxLevel is None):
        return {
            "MaxOrderNumber": -1
        }
    return {
        "MaxOrderNumber": maxLevel["OrderNumber"]
    }

@app.post("/updateMaxLevelId", status_code=201)
def updateMaxLevelId(payload: UserUpdate):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()
    update_MaxLevelId(
        cursor,
        payload.UserId,
        payload.CourseId,
        payload.NewMaxLevelId
    )

    conn.commit()
    conn.close()
    return {"message": "MaxLevelId updated successfully"}

# -----------------------
# LEVEL CRUD
# -----------------------

@app.get("/levels")
def read_levels():
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()
    course_id = 1

    levels = get_all_Levels(cursor, course_id)
    for level in levels:
        qs = get_all_Questions(cursor, level["LevelId"])
        for q in qs:
            answers = get_Question_Answers(cursor, q["QuestionId"])
            q["answers"] = answers
        level["questions"] = qs

    conn.close()
    return levels


@app.get("/level/{level_id}")
def read_level(level_id: int):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()
    level = get_Level(cursor, level_id)
    if not level:
        conn.close()
        raise HTTPException(status_code=404, detail="Level not found")
    
    # Get questions for this level
    questions = get_all_Questions(cursor, level_id)
    for q in questions:
        answers = get_Question_Answers(cursor, q["QuestionId"])
        q["answers"] = answers
    level["questions"] = questions
    
    conn.close()
    return level


@app.post("/levels/", status_code=201)
def create_level(payload: LevelCreate):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()
    add_Level(cursor, payload.LevelTitle, payload.OrderNumber, payload.CourseId)
    new_id = cursor.lastrowid
    conn.commit()
    new_level = get_Level(cursor, new_id)
    new_level["questions"] = []
    conn.close()
    return new_level


@app.put("/levels/{level_id}")
def update_level(level_id: int, payload: LevelUpdate):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()
    existing = get_Level(cursor, level_id)
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Level not found")
    
    update_Level(cursor, level_id, payload.LevelTitle, payload.OrderNumber, payload.CourseId)
    conn.commit()
    conn.close()
    return {"message": "Level updated"}


@app.delete("/levels/{level_id}", status_code=204)
def delete_level(level_id: int):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()
    existing = get_Level(cursor, level_id)
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Level not found")
    
    delete_Level(cursor, level_id)
    conn.commit()
    conn.close()
    return


# -----------------------
# QUESTION CRUD
# -----------------------

@app.post("/questions/", status_code=201)
def create_question(payload: QuestionCreate):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()

    add_Question(cursor, payload.QuestionTitle, payload.QuestionText, payload.OrderNumber, payload.LevelId)
    question_id = cursor.lastrowid

    for ans in payload.answers:
        add_Answer(cursor, ans.AnswerText, ans.IsCorrect, question_id)

    conn.commit()

    new_question = get_Question(cursor, question_id)
    new_question["answers"] = get_Question_Answers(cursor, new_question["QuestionId"])

    conn.close()
    return new_question


@app.get("/questions/{level_id}")
def read_questions(level_id: int):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()
    questions = get_all_Questions(cursor, level_id)
    for q in questions:
        answers = get_Question_Answers(cursor, q["QuestionId"])
        q["answers"] = answers
    conn.close()
    return questions


@app.get("/question/{question_id}")
def read_question(question_id: int):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()
    q = get_Question(cursor, question_id)
    if not q:
        conn.close()
        raise HTTPException(status_code=404, detail="Question not found")
    answers = get_Question_Answers(cursor, question_id)
    q["answers"] = answers
    conn.close()
    return q


@app.put("/questions/{question_id}")
def update_question(question_id: int, payload: QuestionUpdate):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()

    existing = get_Question(cursor, question_id)
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Question not found")

    update_Question(cursor, question_id, payload.QuestionTitle, payload.QuestionText, payload.OrderNumber, payload.LevelId)

    existing_answers = get_Question_Answers(cursor, question_id)
    existing_ids = {a["AnswerId"] for a in existing_answers}

    seen_ids = set()

    for answer in payload.answers:
        if answer.AnswerId is not None:
            if answer.AnswerId in existing_ids:
                update_Answer(cursor, answer.AnswerId, answer.AnswerText, answer.IsCorrect)
                seen_ids.add(answer.AnswerId)
        else:
            add_Answer(cursor, answer.AnswerText, answer.IsCorrect, question_id)

    to_delete = existing_ids - seen_ids
    for answer_id in to_delete:
        delete_Answer(cursor, answer_id)

    conn.commit()
    updated = get_Question(cursor, question_id)
    conn.close()
    return updated


@app.delete("/questions/{question_id}", status_code=204)
def delete_question_endpoint(question_id: int):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()
    existing = get_Question(cursor, question_id)
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Question not found")
    delete_Question(cursor, question_id)
    conn.commit()
    conn.close()
    return


# -----------------------
# ANSWER CRUD
# -----------------------

@app.post("/answers/", status_code=201)
def create_answer(payload: AnswerCreate):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()
    add_Answer(cursor, payload.AnswerText, payload.IsCorrect, payload.QuestionId)
    new_id = cursor.lastrowid
    conn.commit()
    new_answer = get_Answer(cursor, new_id)
    conn.close()
    return new_answer


@app.get("/answers/{question_id}")
def read_answers(question_id: int):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()
    answers = get_Question_Answers(cursor, question_id)
    conn.close()
    return answers


@app.get("/answer/{answer_id}")
def read_answer(answer_id: int):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()
    a = get_Answer(cursor, answer_id)
    if not a:
        conn.close()
        raise HTTPException(status_code=404, detail="Answer not found")
    conn.close()
    return a


@app.put("/answers/{answer_id}")
def update_answer_endpoint(answer_id: int, payload: AnswerUpdate):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()
    existing = get_Answer(cursor, answer_id)
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Answer not found")
    update_Answer(cursor, answer_id, payload.AnswerText, payload.IsCorrect, payload.QuestionId)
    conn.commit()
    conn.close()
    return {"message": "Answer updated"}


@app.delete("/answers/{answer_id}", status_code=204)
def delete_answer_endpoint(answer_id: int):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()
    existing = get_Answer(cursor, answer_id)
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Answer not found")
    delete_Answer(cursor, answer_id)
    conn.commit()
    conn.close()
    return


class LoginRequest(BaseModel):
    name: str
    password: str

@app.post("/login")
def login_user(payload: LoginRequest):
    conn = sqlite3.connect("db/kck.db")
    cursor = conn.cursor()

    user = get_User_by_name(cursor, payload.name)
    course_id = 1

    if user:
        if user["Password"] != payload.password:
            conn.close()
            raise HTTPException(status_code=401, detail="Invalid password")
    else:
        cursor.execute("INSERT INTO User (Name, Password) VALUES (?, ?)", (payload.name, payload.password))
        user_id = cursor.lastrowid

        level = get_first_Level_of_course(cursor, course_id)
        if not level:
            conn.close()
            raise HTTPException(status_code=500, detail="No levels found in the course")

        cursor.execute("""
            INSERT INTO UserCourseData (UserId, MaxLevelId, CourseId, CorrectAnswers, TotalAnswers)
            VALUES (?, ?, ?, ?, ?)
        """, (user_id, level["LevelId"], 1, 0, 0))
        conn.commit()

        user = {
            "UserId": user_id,
            "Name": payload.name,
            "Password": payload.password
        }

    user_course_data = get_UserCourseData_and_Level(cursor, user["UserId"], course_id)
    if not user_course_data:
        conn.close()
        raise HTTPException(status_code=500, detail="UserCourseData not found")
    max_level = get_Level(cursor, user_course_data["MaxLevelId"])

    conn.close()

    return {
        "UserId": user["UserId"],
        "Name": user["Name"],
        "MaxOrderNumber": max_level["OrderNumber"]
    }