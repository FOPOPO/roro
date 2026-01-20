let tg = window.Telegram.WebApp; // созаем объект класса WebApp

let send_reg = document.querySelector('[name="send_reg"]') // создаем переменную с информацией о кнопке Отправить

send_reg.addEventListener('click', () => { // перехватываем событие нажатия на кнопку Отправить
    let user_name = document.querySelector('[name="user_full_name"]').value, // содаем переменную с содержимым поля ФИО
        user_email = document.querySelector('[name="user_email"]').value, // содаем переменную с содержимым поля Email
        user_tel = document.querySelector('[name="user_tel"]').value; // содаем переменную с содержимым поля Телефон

    let user_data = { // содаем объект (не класса) с передаваемой информацией
        data_type: 'user_sub', // вид/обозначение передаваемой информации
        data_name: user_name, // ФИО пользователя
        data_email: user_email, // Email пользователя
        data_tel: user_tel // Телефон пользователя
    }
    tg.sendData(JSON.stringify(user_data)); // преобразуем объект с передаваемой инфомацией в JSON-строку

    tg.close(); // закрываем веб-приложение
})

class WebAppDataFilter(Filter):

   async def __call__(self, message: types.Message, **kwargs) -> Union[bool, Dict[str, Any]]:
       return dict(web_app_data=message.web_app_data) if message.web_app_data else False

@dp.message(WebAppDataFilter())
async def web_app_handler(message: types.Message):
   res = json.loads(message.web_app_data.data)

   await message.answer(f'ФИО: {res["data_name"]}\nEmail: {res["data_email"]}\nТелефон: {res["data_tel"]}')