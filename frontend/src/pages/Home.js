import React from 'react';

import Tariff from '../components/tariff/tariff';

import main_img from '../assets/img/message-online-chat-social-text-concept 1.jpg';
import features_1_img from '../assets/img/running.svg';
import features_2_img from '../assets/img/template.svg';
import features_3_img from '../assets/img/constructor.svg';
import possibility_1_img from '../assets/img/possibility1.jpg';
import possibility_2_img from '../assets/img/possibility2.jpg';
import possibility_3_img from '../assets/img/possibility3.jpg';
import about_img from '../assets/img/about.jpg';

const Home = () => {
    return (
        <div>
            <section class="main">
                <div class="container">
                    <div class="main-block">
                        <div class="main-img"><img src={main_img} alt="Главное изображение" /></div>
                        <div class="main-content">
                            <h1 class="main-title">Email рассылка</h1>
                            <p class="main-text">Надежная доставка Email писем Вашим клиентам по выгодным ценам. Став нашим клиентом, вы начнете сильно экономить свое время. Попробуйте уже сейчас.</p>
                            <div class="buttons">
                                <a href="" class="button">Войти</a>
                                <a href="" class="button button-dark">Регистрация</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="features">
                <div class="container">
                    <ul class="features-list">
                        <li class="features-item">
                            <img src={features_1_img} alt="Преимущество" />
                            <h2>Быстрый старт рассылки</h2>
                            <p>Для начала рассылки вам необходима только база клиентов</p>
                        </li>
                        <li class="features-item">
                            <img src={features_2_img} alt="Преимущество" />
                            <h2>Многообразие шаблонов</h2>
                            <p>Вы можете использовать любой из имеющихся у нас шаблонов </p>
                        </li>
                        <li class="features-item">
                            <img src={features_3_img} alt="Преимущество" />
                            <h2>Удобный конструктор</h2>
                            <p>Для начала рассылки вам необходима только база клиентов</p>
                        </li>
                    </ul>
                </div>
            </section>

            <section class="possibility">
                <div class="container">
                    <ul class="possibility-list">
                        <li class="possibility-item">
                            <img src={possibility_1_img} alt="Возможность" />
                            <div class="possibility-text">
                                <h2>Увеличивайте прибыль</h2>
                                <p>Ваши продажи зчительно увеличатся, после того, как вы начнете пользоваться нашим сервисом. Через рассылку вы можете сообщить своим клиентам про предстоящие акции или про новые товары.</p>
                            </div>
                        </li>
                        <li class="possibility-item">
                            <img src={possibility_2_img} alt="Возможность" />
                            <div class="possibility-text">
                                <h2>Автоматезируйте свои действия</h2>
                                <p>Вам больше не придется проводить много времени в почтовом ящике, все письма теперь будут отправляться автоматически, из-за чего у вас будет больше времени, которое можно потратить с пользой.</p>
                            </div>
                        </li>
                        <li class="possibility-item">
                            <img src={possibility_3_img} alt="Возможность" />
                            <div class="possibility-text">
                                <h2>Экономьте свои деньги</h2>
                                <p>С нашим сервисом, вы начнете экономить много денег, ведь у нас очень выгодные условия и есть несколько тарифов. Вы с легкостью сможете выбрать для себя наиболее подходящие условияю</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section class="about">
                <div class="container">
                    <div class="about-content">
                        <div class="about-img">
                            <img src={about_img} alt="Почему стоит выбрать нас?" />
                        </div>
                        
                        <div class="about-text">
                            <h2>Почему стоит выбрать нас?</h2>
                            <p>Если вам требуется сделать рассылку большому количеству людей, то вы можете автоматизировать этот процесс, доверив это нам. Наш сервис за вас отправит всё необходимое. Вам только нужно выбрать один из наших шаблонов</p>
                            <p>Если же вы считаете, что вам не подходит не один из имеющихся шаблонов, вы можете воспользоваться нашим удобным конструктором. В нем вы с легкостью сможете сделать такой шаблон, который точно вам подойдет.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="rate">
                <div class="container">
                    <h2>Ознакомьтесь с нашими ценами</h2>
                    <p>Мы можем предложить вам следующие тарифы:</p>
                    <Tariff />
                </div>
            </section>
        </div>
    )
}

export default Home

