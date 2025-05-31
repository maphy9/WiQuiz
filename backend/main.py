# main.py

import sqlite3
import random
from typing import Dict, List, Any
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database_utils import (
    get_all_Levels,
    get_Level,
    add_Level,
    update_Level,
    delete_Level,
    get_all_Questions,
    get_Question,
    add_Question,
    update_Question,
    delete_Question,
    get_Question_Answers,
    get_Answer,
    add_Answer,
    update_Answer,
    delete_Answer,
)

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

async def connect_player_to_room(room_code: str, player: Dict[str, Any], websocket: WebSocket):
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

@app.websocket("/ws/{room_code}/{player_id}")
async def websocket_endpoint(websocket: WebSocket, room_code: str, player_id: str):
    await websocket.accept()
    player = { "id": player_id }
    await connect_player_to_room(room_code, player, websocket)

    try:
        while True:
            data = await websocket.receive_json()
            room = rooms[room_code]

            if data.get("type") == "change_stage":
                room["stage"] = data["stage"]
                if "levelId" in data:
                    room["levelId"] = data["levelId"]

            if data.get("type") == "use_bonus":
                # data should contain "bonusId" and any other needed fields
                pass

            if data.get("type") == "vote":
                # data should contain "questionId", "selectedAnswer", etc.
                pass

            # broadcast to all players in the same room
            for ws in room["websockets"]:
                await ws.send_json(data)

    except WebSocketDisconnect:
        await disconnect_player_from_room(room_code, websocket)

# ----------------------------
# REST Endpoints for CRUD
# ----------------------------

class LevelCreate(BaseModel):
    LevelTitle: str
    OrderNumber: int
    CourseId: int

class LevelUpdate(BaseModel):
    LevelTitle: str
    OrderNumber: int
    CourseId: int

class QuestionCreate(BaseModel):
    QuestionText: str
    OrderNumber: int
    LevelId: int

class QuestionUpdate(BaseModel):
    QuestionText: str
    OrderNumber: int
    LevelId: int

class AnswerCreate(BaseModel):
    AnswerText: str
    IsCorrect: bool
    QuestionId: int

class AnswerUpdate(BaseModel):
    AnswerText: str
    IsCorrect: bool
    QuestionId: int

@app.post("/levels/", status_code=201)
def create_level(payload: LevelCreate):
    conn = sqlite3.connect("your_database.db")
    cursor = conn.cursor()
    add_Level(cursor, payload.LevelTitle, payload.OrderNumber, payload.CourseId)
    conn.commit()
    conn.close()
    return {"message": "Level created"}

@app.get("/levels/{course_id}")
def read_levels(course_id: int):
    conn = sqlite3.connect("your_database.db")
    cursor = conn.cursor()
    levels = get_all_Levels(cursor, course_id)
    for level in levels:
        questions = get_all_Questions(cursor, level["LevelId"])
        for question in questions:
            answers = get_Question_Answers(cursor, question["QuestionId"])
            question["answers"] = answers
        level["questions"] = questions
    conn.close()
    return levels

@app.get("/level/{level_id}")
def read_level(level_id: int):
    conn = sqlite3.connect("your_database.db")
    cursor = conn.cursor()
    level = get_Level(cursor, level_id)
    if not level:
        conn.close()
        raise HTTPException(status_code=404, detail="Level not found")
    questions = get_all_Questions(cursor, level_id)
    for question in questions:
        answers = get_Question_Answers(cursor, question["QuestionId"])
        question["answers"] = answers
    level["questions"] = questions
    conn.close()
    return level

@app.put("/levels/{level_id}")
def update_level_endpoint(level_id: int, payload: LevelUpdate):
    conn = sqlite3.connect("your_database.db")
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
def delete_level_endpoint(level_id: int):
    conn = sqlite3.connect("your_database.db")
    cursor = conn.cursor()
    existing = get_Level(cursor, level_id)
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Level not found")
    delete_Level(cursor, level_id)
    conn.commit()
    conn.close()
    return

# --- Question CRUD ---

@app.post("/questions/", status_code=201)
def create_question(payload: QuestionCreate):
    conn = sqlite3.connect("your_database.db")
    cursor = conn.cursor()
    # Optionally verify that LevelId exists before inserting
    add_Question(cursor, payload.QuestionText, payload.OrderNumber, payload.LevelId)
    conn.commit()
    conn.close()
    return {"message": "Question created"}

@app.get("/questions/{level_id}")
def read_questions(level_id: int):
    conn = sqlite3.connect("your_database.db")
    cursor = conn.cursor()
    questions = get_all_Questions(cursor, level_id)
    for question in questions:
        answers = get_Question_Answers(cursor, question["QuestionId"])
        question["answers"] = answers
    conn.close()
    return questions

@app.get("/question/{question_id}")
def read_question(question_id: int):
    conn = sqlite3.connect("your_database.db")
    cursor = conn.cursor()
    question = get_Question(cursor, question_id)
    if not question:
        conn.close()
        raise HTTPException(status_code=404, detail="Question not found")
    answers = get_Question_Answers(cursor, question_id)
    question["answers"] = answers
    conn.close()
    return question

@app.put("/questions/{question_id}")
def update_question_endpoint(question_id: int, payload: QuestionUpdate):
    conn = sqlite3.connect("your_database.db")
    cursor = conn.cursor()
    existing = get_Question(cursor, question_id)
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Question not found")
    update_Question(cursor, question_id, payload.QuestionText, payload.OrderNumber, payload.LevelId)
    conn.commit()
    conn.close()
    return {"message": "Question updated"}

@app.delete("/questions/{question_id}", status_code=204)
def delete_question_endpoint(question_id: int):
    conn = sqlite3.connect("your_database.db")
    cursor = conn.cursor()
    existing = get_Question(cursor, question_id)
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Question not found")
    delete_Question(cursor, question_id)
    conn.commit()
    conn.close()
    return

# --- Answer CRUD ---

@app.post("/answers/", status_code=201)
def create_answer(payload: AnswerCreate):
    conn = sqlite3.connect("your_database.db")
    cursor = conn.cursor()
    # Optionally verify that QuestionId exists before inserting
    add_Answer(cursor, payload.AnswerText, payload.IsCorrect, payload.QuestionId)
    conn.commit()
    conn.close()
    return {"message": "Answer created"}

@app.get("/answers/{question_id}")
def read_answers(question_id: int):
    conn = sqlite3.connect("your_database.db")
    cursor = conn.cursor()
    answers = get_Question_Answers(cursor, question_id)
    conn.close()
    return answers

@app.get("/answer/{answer_id}")
def read_answer(answer_id: int):
    conn = sqlite3.connect("your_database.db")
    cursor = conn.cursor()
    answer = get_Answer(cursor, answer_id)
    if not answer:
        conn.close()
        raise HTTPException(status_code=404, detail="Answer not found")
    conn.close()
    return answer

@app.put("/answers/{answer_id}")
def update_answer_endpoint(answer_id: int, payload: AnswerUpdate):
    conn = sqlite3.connect("your_database.db")
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
    conn = sqlite3.connect("your_database.db")
    cursor = conn.cursor()
    existing = get_Answer(cursor, answer_id)
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Answer not found")
    delete_Answer(cursor, answer_id)
    conn.commit()
    conn.close()
    return
