let tg = window.Telegram.WebApp; 

let send_reg = document.querySelector('[name="send_reg"]') 

send_reg.addEventListener('click', () => {
    let user_name = document.querySelector('[name="user_full_name"]').value, 
        user_email = document.querySelector('[name="user_email"]').value,
        user_tel = document.querySelector('[name="user_tel"]').value;

    let user_data = { 
        data_type: 'user_sub', 
        data_name: user_name, 
        data_email: user_email, 
        data_tel: user_tel 
    }
    tg.sendData(JSON.stringify(user_data)); 
    tg.close();
})

class WebAppDataFilter(Filter):

   async def __call__(self, message: types.Message, **kwargs) -> Union[bool, Dict[str, Any]]:
       return dict(web_app_data=message.web_app_data) if message.web_app_data else False

@dp.message(WebAppDataFilter())
async def web_app_handler(message: types.Message):
   res = json.loads(message.web_app_data.data)


   await message.answer(f'ФИО: {res["data_name"]}\nEmail: {res["data_email"]}\nТелефон: {res["data_tel"]}')
