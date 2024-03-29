###### **Проект Best Courses Ever**
Образовательная платформа с возможностью смотреть и редактировать медиа контент.
Пользователи могут редактировать и смотреть созданные курсы.
Пользователи могут создавать собственные курсы.
Курсы содержат описание и наборы занятий.
Список и описание всех курсов (а также описание занятий) доступно всем пользователям.
Также есть возможность добавлять комментарии к занятию и видеть комментарии других пользователей.
Каждое занятие может содержать описание, видео, ссылки, файлы как другой тип ресурсов.

###### **Запуск проекта**
Установить node.js на ПК
Из корневой директории проекта в терминале вызвать последовательно команды:
 -npm i,
 -docker compose up, 
 -npm run start
В браузере перейти по url: https:// localhost:3001

###### **Модели данных**
_Пользователь (UserDto):_
   - Идентификатор пользователя (id),
   - Имя (firstName),
   - Фамилия (lastName), 
   - Возраст (age), 
   - Аватар (avatar),
   - Email (email),
   - Пароль (password),
   - Дата регистрации (registerAt),
   - Забанен ли пользователь (isBanned),
   - Роли (roles- массив),
   - Курсы (courses- массив),
   - Уроки (lessons- массив),
   - Комментарии (comments - массив),
   - Отзывы (reviews - массив)

_Курс (Course):_
   - Идентификатор курса (id),
   - Идентификатор автора (authorId), 
   - Название (title),
   - Описание (description),
   - Дата создания курса (startedAt),
   - Дата последнего обновления курса (updatedAt),
   - Продолжительность курса (duration),
   - Стоимость курса (price),
   - Уроки (lessons - массив),
   - Отзывы (reviews - массив)

_Урок (Lesson):_
   - Идентификатор урока (id),
   - Идентификатор курса (courseId),
   - Идентификатор автора (authorId),
   - Путь к медиаконтенту (videoUrl), 
   - Путь к PDF (pdfUrl), 
   - Название (title),
   - Описание (description),
   - Дата создания урока (startedAt),
   - Дата последнего обновления урока (updatedAt),
   - Комментарии (comments - массив)
   
_Комментарий (Comment):_
   - Идентификатор комментария (id),
   - Название (title),
   - Текст комментария (message),
   - Дата создания комментария (startedAt),
   - Идентификатор автора (authorId),
   - Идентификатор урока (lessonId)
   
_Отзыв (Review):_
   - Идентификатор отзыва (id),
   - Название (title),
   - Текст отзыва (message),
   - Дата создания отзыва (startedAt),
   - Идентификатор автора (authorId),
   - Идентификатор курса (courseId)

######  **Основные моменты по архитектуре проекта**
Все запросы к API реализуются через соответствующий метод HTTP запроса (GET, POST, PUT, PATCH, DELETE)
Основная структура приложения находится в корневой папке:
 созданы отдельные директории для контроллеров, сервисов, моделей, мидлваров, тестов, статических файлов
Все роуты, относящиеся к API, находятся в корневой папке проекта в controllers
В проекте используется база данных - MongoDB
