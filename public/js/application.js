setInterval(()=>{
    document.querySelector('.header_img').style.left = `${(document.querySelector('body').clientWidth / 2) - 50}px`;
}, 5);


import {createElement} from './createElem.js';


if (document.querySelector('.calculator')){

    document.querySelector('.calculator').addEventListener('submit', async (event) => {

        event.preventDefault();
        event.stopPropagation();

        let quantity = Number(document.querySelector('.quantity').value);
        let volume = Number(document.querySelector('.volume').value);
        let weight = Number(document.querySelector('.weight').value);
        let dispatchLocation = document.querySelector('.dispatch_location').value;
        let destinationLocation = document.querySelector('.destination_location').value;


        let responseToken = await fetch('/payment/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

            })
        });

        const resultToken = await responseToken.json();


        let response = await fetch(`https://vozovoz.ru/api/?token=${resultToken.tokenVozovoz}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "object": "price",
                "action": "get",
                "params": {
                    "cargo": {
                        "dimension": { // габариты
                            "quantity": quantity, // количество мест
                            "volume": volume, // общий объем
                            "weight": weight // общий вес
                        }
                    },
                    "gateway": {
                        "dispatch": { // откуда
                            "point": {
                                "location": dispatchLocation,
                                "terminal": "default" // терминал по умолчанию
                            }
                        },
                        "destination": { // куда
                            "point": {
                                "location": destinationLocation,
                                "terminal": "default" // терминал по умолчанию
                            }
                        }
                    }
                }
            })
        });

        const result = await response.json();

        if (result.response){

            let responseBackend = await fetch('/payment/info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dispatchLocation,
                    destinationLocation,
                    quantity,
                    volume,
                    weight,
                    basePrice: result.response.basePrice,
                    price: result.response.price,
                    serviceName0: result.response.service[0].name,
                    servicePrice0: result.response.service[0].price,
                    servicePrice1: result.response.service[1].price,
                    serviceName2: result.response.service[2].name,
                    servicePrice2: result.response.service[2].price,
                })
            });

            const resultBackend = await responseBackend.text();

            document.querySelector('.info_board').innerHTML = resultBackend + document.querySelector('.info_board').innerHTML;

        }
    });
}


if (document.querySelector('.status_form')){

    document.querySelector('.status_form').addEventListener('submit', async (event) => {

        event.preventDefault();
        event.stopPropagation();


        let responseToken = await fetch('/payment/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

            })
        });

        const resultToken = await responseToken.json();


        let orderNum = document.querySelector('.order_num').value;

        let response = await fetch(`https://vozovoz.ru/api/?token=${resultToken.tokenVozovoz}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "object": "order",
                "action": "get",
                "params": {
                    "filters": {
                        "dates": { // фильтр по датам
                            "created": { // дата оформления заказа
                                "from": "2017-01-01", // начальный дата диапазона выборки
                                "to": "2019-12-27" // конечная дата диапазона выборки
                            }
                        },
                        "location": {
                            "dispatch": "12345678-1234-1234-1234-123456789012", // фильтр по локации отправления
                            "destination": "12345678-1234-1234-1234-123456789012" // фильтр по локации получения
                        },
                        "number": [ // может быть одной строкой или массивом любых из указанных ниже данных
                            "12345678-1234-1234-1234-123456789012", // уникальный внутренний идентификатор заказа
                            "700099999", // уникальный внутренний номер заказа
                            "CW23423/dsf332233 (май 2017)" // пользовательский номер заказа, если Вы указывали его при оформлении
                        ]
                    },
                    "limit": 100, // ограничение количества результатов выборки
                    "offset": 0, // смещение по выборке
                    "mode": { // подробнее см. субструктуру "Состояние заказа"
                        "isCanceled": false, // Должен ли заказ быть отменён для попадания в выборку
                        "isGiven": false, // Должен ли заказ быть выдан для попадания в выборку
                        "isPaid": false, // Должен ли быть оплачен заказ для попадания в выборку
                        "isTaken": true
                    },
                    "tab": "onward" // "onward" - В пути, "unpaid" - Неоплаченные, подробнее в структуре...
                }
            })
        });

        const result = await response.json();

        if (result.response){

            let responseBackend = await fetch('/status/id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   total: result.response.meta.total
                })
            });

            const resultBackend = await responseBackend.text();

            document.querySelector('.info_board').innerHTML = resultBackend + document.querySelector('.info_board').innerHTML;

        }
    });
}

