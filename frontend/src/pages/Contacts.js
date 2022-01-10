import React from 'react'

const Contacts = () => {
    return (
        <section class="contact">
            <div class="container">
                <div class="contact-top">
                    <div class="contact-content">
                        <h1>Контакты</h1>
                        <div class="contact-text">
                            <p>Телефон для связи: 8(958)825-27-11</p>
                            <p>Email: andre.frolov44@gmail.com</p>
                            <p>Адрес: г. Москва, ул. Вишневая, д. 4</p>
                            <p>Контактное лицо: Фролов Андрей</p>
                        </div>
                        <h2>Чтобы связаться с нами Вы можете воспользоваться формой обратной связи</h2>
                    </div>
                    <div class="contact-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1057.613323393729!2d37.44709648661001!3d55.82787651702508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b5487544b3f607%3A0x8f117dbdeb9f3256!2sVishnovaya%20Ulitsa%2C%204%2C%20Moskva%2C%20125362!5e0!3m2!1sen!2sru!4v1634160654836!5m2!1sen!2sru" width="543" height="348" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
                <form action="#" class="contact-form">
                    <div class="contact-element">
                        <div class="contact-inputs">
                            <input type="text" placeholder="Введите имя" />
                            <input type="text" placeholder="Введите почту" />
                            <input type="text" placeholder="Тема" />
                        </div>
                        <div class="contact-form-text">
                            <textarea name="text" id="text" cols="30" rows="10" placeholder="Текст"></textarea>
                        </div>
                    </div>
                    <button class="button">Отправить</button>
                </form>
            </div>
        </section>
    )
}

export default Contacts;
