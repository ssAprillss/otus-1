# otus-1
Homework#1

## Мини-анкета

Учебное приложение: backend на Python (Flask) + frontend на чистом HTML/JS.

### Возможности

- `GET /questions` — список вопросов анкеты (жёстко заданные, текстовые и с выбором варианта)
- `POST /answers` — приём и сохранение ответов пользователя (в памяти процесса)
- `GET /answers` — просмотр всех сохранённых ответов
- Frontend загружает вопросы, отображает форму, отправляет ответы и показывает «Спасибо!» после отправки

### Структура проекта

```
backend/
  app.py            — Flask-сервер, API и раздача frontend как статики
  requirements.txt
frontend/
  index.html
  app.js
  style.css
```

### Запуск

```bash
python -m venv .venv
.venv/Scripts/python.exe -m pip install -r backend/requirements.txt
.venv/Scripts/python.exe backend/app.py
```

Приложение будет доступно на http://127.0.0.1:5000

### Примечание

Ответы хранятся только в оперативной памяти — при перезапуске сервера они теряются.
