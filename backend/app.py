from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory

FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"

app = Flask(__name__, static_folder=str(FRONTEND_DIR), static_url_path="")
app.json.ensure_ascii = False

QUESTIONS = [
    {"id": 1, "type": "text", "text": "Как вас зовут?"},
    {"id": 2, "type": "text", "text": "Сколько вам лет?"},
    {
        "id": 3,
        "type": "choice",
        "text": "Как вы узнали о курсе?",
        "options": ["Интернет", "Друзья", "Реклама", "Другое"],
    },
    {
        "id": 4,
        "type": "choice",
        "text": "Оцените курс от 1 до 5",
        "options": ["1", "2", "3", "4", "5"],
    },
    {"id": 5, "type": "text", "text": "Ваш комментарий (необязательно)"},
]

# Хранилище ответов в памяти: каждая отправка анкеты — один элемент списка
answers_storage = []


@app.get("/questions")
def get_questions():
    return jsonify(QUESTIONS)


@app.post("/answers")
def post_answers():
    data = request.get_json(silent=True)
    if not isinstance(data, dict) or "answers" not in data:
        return jsonify({"error": "Ожидается JSON вида {\"answers\": [...]}"}), 400

    answers_storage.append(data["answers"])
    return jsonify({"status": "ok"}), 201


@app.get("/answers")
def get_answers():
    return jsonify(answers_storage)


@app.get("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
