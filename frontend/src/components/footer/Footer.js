import React from 'react'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <nav className="footer-nav">
                        <ul className="footer-ul">
                            <li className="footer-li"><a href="#">Главная</a></li>
                            <li className="footer-li"><a href="#">Тарифы</a></li>
                            <li className="footer-li"><a href="#">Меню</a></li>
                            <li className="footer-li"><a href="#">Контакты</a></li>
                        </ul>
                    </nav>
                    <a href="#" className="footer-reg">Зарегистрироваться</a>
                </div>
                <div className="footer-contact">
                    <div className="footer-contact-item">Email: andre.frolov44@gmail.com</div>
                    <div className="footer-contact-item">Телефон: 8(958)-825-27-11</div>
                    <div className="footer-contact-item">Адрес: тут нужно указать адрес</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
