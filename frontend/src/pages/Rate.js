import React from "react";

import Tariff from "../components/tariff/tariff";

const Rate = () => {
    return (
        <section className="rate rate-main">
            <div className="container">
                <h1>Ознакомьтесь с тарифами в нашем сервисе</h1>
                <Tariff />
            </div>
        </section>
    )
}

export default Rate