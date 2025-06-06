from database_utils.database_utils import *
from database_utils.create_database import create_database
import sqlite3
from random import randint

conn = sqlite3.connect("db/kck.db")
cursor = conn.cursor()

create_database(cursor)

add_Course(cursor, 'Podstawy inżynierii oprogramowania')

add_Level(cursor, "Wprowadzenie do inżynierii oprogramowania", 1, 1)
cursor.execute("SELECT last_insert_rowid()")
level_id = cursor.fetchone()[0]

add_Question(cursor, "Pytanie 1", "Czym zajmuje się inżynieria oprogramowania?", 1, level_id)
cursor.execute("SELECT last_insert_rowid()")
q1 = cursor.fetchone()[0]
add_Answer(cursor, "Tylko testowaniem", False, q1)
add_Answer(cursor, "Tworzeniem systemów", True, q1)
add_Answer(cursor, "Tylko kodowaniem", False, q1)
add_Answer(cursor, "Naprawą komputerów", False, q1)

add_Question(cursor, "Pytanie 2", "Które z poniższych NIE jest fazą cyklu życia oprogramowania?", 2, level_id)
cursor.execute("SELECT last_insert_rowid()")
q2 = cursor.fetchone()[0]
add_Answer(cursor, "Analiza wymagań", False, q2)
add_Answer(cursor, "Implementacja", False, q2)
add_Answer(cursor, "Pieczenie ciasta", True, q2)
add_Answer(cursor, "Testowanie", False, q2)

add_Question(cursor, "Pytanie 3", "Która z dyscyplin inżynierii oprogramowania odpowiada za określenie funkcji systemu?", 3, level_id)
cursor.execute("SELECT last_insert_rowid()")
q3 = cursor.fetchone()[0]
add_Answer(cursor, "Testowanie", False, q3)
add_Answer(cursor, "Zarządzanie projektem", False, q3)
add_Answer(cursor, "Analiza wymagań", True, q3)
add_Answer(cursor, "Programowanie", False, q3)

add_Question(cursor, "Pytanie 4", "Jakie są główne cele inżynierii oprogramowania?", 4, level_id)
cursor.execute("SELECT last_insert_rowid()")
q4 = cursor.fetchone()[0]
add_Answer(cursor, "Szybkość, chaos, ignorowanie błędów", False, q4)
add_Answer(cursor, "Tworzenie oprogramowania wysokiej jakości, na czas, w budżecie", True, q4)
add_Answer(cursor, "Tylko dokumentacja", False, q4)
add_Answer(cursor, "Zmiana sprzętu", False, q4)

add_Level(cursor, "Modele cyklu życia oprogramowania", 2, 1)
cursor.execute("SELECT last_insert_rowid()")
level_id = cursor.fetchone()[0]

add_Question(cursor, "Pytanie 1", "Który z modeli cyklu życia charakteryzuje się sekwencyjnym podejściem?", 1, level_id)
cursor.execute("SELECT last_insert_rowid()")
q1 = cursor.fetchone()[0]
add_Answer(cursor, "Model przyrostowy", False, q1)
add_Answer(cursor, "Model spiralny", False, q1)
add_Answer(cursor, "Model kaskadowy", True, q1)
add_Answer(cursor, "Model zwinny", False, q1)

add_Question(cursor, "Pytanie 2", "W którym modelu cyklu życia projekt jest rozwijany iteracyjnie z oceną ryzyka?", 2, level_id)
cursor.execute("SELECT last_insert_rowid()")
q2 = cursor.fetchone()[0]
add_Answer(cursor, "Model kaskadowy", False, q2)
add_Answer(cursor, "Model spiralny", True, q2)
add_Answer(cursor, "Model V", False, q2)
add_Answer(cursor, "Model prototypowy", False, q2)

add_Question(cursor, "Pytanie 3", "Model V to rozszerzenie którego modelu?", 3, level_id)
cursor.execute("SELECT last_insert_rowid()")
q3 = cursor.fetchone()[0]
add_Answer(cursor, "Modelu zwinnego", False, q3)
add_Answer(cursor, "Modelu spiralnego", False, q3)
add_Answer(cursor, "Modelu kaskadowego", True, q3)
add_Answer(cursor, "Modelu przyrostowego", False, q3)

add_Question(cursor, "Pytanie 4", "Który model najlepiej nadaje się do projektów z niejasnymi wymaganiami?", 4, level_id)
cursor.execute("SELECT last_insert_rowid()")
q4 = cursor.fetchone()[0]
add_Answer(cursor, "Model kaskadowy", False, q4)
add_Answer(cursor, "Model spiralny", False, q4)
add_Answer(cursor, "Model prototypowy", True, q4)
add_Answer(cursor, "Model V", False, q4)

add_Level(cursor, "Zarządzanie wymaganiami", 3, 1)
cursor.execute("SELECT last_insert_rowid()")
level_id = cursor.fetchone()[0]

add_Question(cursor, "Pytanie 1", "Co to jest wymaganie funkcjonalne?", 1, level_id)
cursor.execute("SELECT last_insert_rowid()")
q1 = cursor.fetchone()[0]
add_Answer(cursor, "Opisuje, co system ma robić", True, q1)
add_Answer(cursor, "Opisuje wygląd systemu", False, q1)
add_Answer(cursor, "Opisuje ograniczenia sprzętowe", False, q1)
add_Answer(cursor, "Opisuje sposób testowania", False, q1)

add_Question(cursor, "Pytanie 2", "Co to jest wymaganie niefunkcjonalne?", 2, level_id)
cursor.execute("SELECT last_insert_rowid()")
q2 = cursor.fetchone()[0]
add_Answer(cursor, "Opisuje, co system ma robić", False, q2)
add_Answer(cursor, "Dotyczy wydajności, bezpieczeństwa lub użyteczności", True, q2)
add_Answer(cursor, "Jest to wymaganie tymczasowe", False, q2)
add_Answer(cursor, "Dotyczy tylko dokumentacji", False, q2)

add_Question(cursor, "Pytanie 3", "Jak nazywa się proces zbierania i analizy wymagań?", 3, level_id)
cursor.execute("SELECT last_insert_rowid()")
q3 = cursor.fetchone()[0]
add_Answer(cursor, "Implementacja", False, q3)
add_Answer(cursor, "Walidacja", False, q3)
add_Answer(cursor, "Inżynieria wymagań", True, q3)
add_Answer(cursor, "Projektowanie", False, q3)

add_Question(cursor, "Pytanie 4", "Który z poniższych jest narzędziem do zarządzania wymaganiami?", 4, level_id)
cursor.execute("SELECT last_insert_rowid()")
q4 = cursor.fetchone()[0]
add_Answer(cursor, "Jira", True, q4)
add_Answer(cursor, "Docker", False, q4)
add_Answer(cursor, "Git", False, q4)
add_Answer(cursor, "Visual Studio Code", False, q4)

add_Level(cursor, "Projektowanie systemów", 4, 1)
cursor.execute("SELECT last_insert_rowid()")
level_id = cursor.fetchone()[0]

add_Question(cursor, "Pytanie 1", "Co oznacza wzorzec projektowy Singleton?", 1, level_id)
cursor.execute("SELECT last_insert_rowid()")
q1 = cursor.fetchone()[0]
add_Answer(cursor, "Tworzenie tylko jednej instancji klasy", True, q1)
add_Answer(cursor, "Tworzenie wielu instancji klasy", False, q1)
add_Answer(cursor, "Dziedziczenie z wielu klas", False, q1)
add_Answer(cursor, "Dynamiczne wiązanie metod", False, q1)

add_Question(cursor, "Pytanie 2", "Co to jest UML?", 2, level_id)
cursor.execute("SELECT last_insert_rowid()")
q2 = cursor.fetchone()[0]
add_Answer(cursor, "Język modelowania systemów", True, q2)
add_Answer(cursor, "Narzędzie do testowania", False, q2)
add_Answer(cursor, "Metoda zarządzania projektami", False, q2)
add_Answer(cursor, "System operacyjny", False, q2)

add_Question(cursor, "Pytanie 3", "Który diagram UML przedstawia interakcje między obiektami?", 3, level_id)
cursor.execute("SELECT last_insert_rowid()")
q3 = cursor.fetchone()[0]
add_Answer(cursor, "Diagram klas", False, q3)
add_Answer(cursor, "Diagram sekwencji", True, q3)
add_Answer(cursor, "Diagram przypadków użycia", False, q3)
add_Answer(cursor, "Diagram aktywności", False, q3)

add_Question(cursor, "Pytanie 4", "Co oznacza zasada SOLID w projektowaniu?", 4, level_id)
cursor.execute("SELECT last_insert_rowid()")
q4 = cursor.fetchone()[0]
add_Answer(cursor, "Zbiór zasad poprawiających czytelność i utrzymanie kodu", True, q4)
add_Answer(cursor, "Zestaw narzędzi do debugowania", False, q4)
add_Answer(cursor, "Metoda testowania jednostkowego", False, q4)
add_Answer(cursor, "System kontroli wersji", False, q4)

add_Level(cursor, "Testowanie oprogramowania", 5, 1)
cursor.execute("SELECT last_insert_rowid()")
level_id = cursor.fetchone()[0]

add_Question(cursor, "Pytanie 1", "Co to jest test jednostkowy?", 1, level_id)
cursor.execute("SELECT last_insert_rowid()")
q1 = cursor.fetchone()[0]
add_Answer(cursor, "Testowanie pojedynczej jednostki kodu", True, q1)
add_Answer(cursor, "Testowanie całego systemu", False, q1)
add_Answer(cursor, "Testowanie wydajności", False, q1)
add_Answer(cursor, "Testowanie integracji komponentów", False, q1)

add_Question(cursor, "Pytanie 2", "Jakie są typy testów w cyklu życia oprogramowania?", 2, level_id)
cursor.execute("SELECT last_insert_rowid()")
q2 = cursor.fetchone()[0]
add_Answer(cursor, "Testy jednostkowe, integracyjne, systemowe, akceptacyjne", True, q2)
add_Answer(cursor, "Tylko testy jednostkowe", False, q2)
add_Answer(cursor, "Testy manualne i automatyczne", False, q2)
add_Answer(cursor, "Testy regresyjne i eksploracyjne", False, q2)

add_Question(cursor, "Pytanie 3", "Co to jest test regresyjny?", 3, level_id)
cursor.execute("SELECT last_insert_rowid()")
q3 = cursor.fetchone()[0]
add_Answer(cursor, "Testowanie ponowne po zmianach w kodzie", True, q3)
add_Answer(cursor, "Testowanie wydajności", False, q3)
add_Answer(cursor, "Testowanie bezpieczeństwa", False, q3)
add_Answer(cursor, "Testowanie akceptacyjne", False, q3)

add_Question(cursor, "Pytanie 4", "Jakie są narzędzia do automatyzacji testów?", 4, level_id)
cursor.execute("SELECT last_insert_rowid()")
q4 = cursor.fetchone()[0]
add_Answer(cursor, "Selenium, JUnit, pytest", True, q4)
add_Answer(cursor, "Git, Docker, Kubernetes", False, q4)
add_Answer(cursor, "Photoshop, Illustrator", False, q4)
add_Answer(cursor, "Slack, Trello", False, q4)

conn.commit()
conn.close()