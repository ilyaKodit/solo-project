setInterval(()=>{
    document.querySelector('.header_img').style.left = `${(document.querySelector('body').clientWidth / 2) - 50}px`;
}, 30);


import {createElement} from './createElem.js';

if (document.querySelector('.calculator')){

    document.querySelector('.calculator').addEventListener('submit', async (event) => {

        event.preventDefault();

        let quantity = Number(document.querySelector('.quantity').value);
        let volume = Number(document.querySelector('.volume').value);
        let weight = Number(document.querySelector('.weight').value);
        let dispatchLocation = document.querySelector('.dispatch_location').value;
        let destinationLocation = document.querySelector('.destination_location').value;


        let response = await fetch('https://vozovoz.ru/api/?token=LSef8jUF0MJfWq3H6xStqu53wxy3XtGcVNvAdeU5', {
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

            createElement(
                `${dispatchLocation} → ${destinationLocation}`,
                `Кол-во грузовых мест: ${quantity}`,
                `Общий объём груза: ${volume}`,
                `Общий вес брутто: ${weight}`,
                `Стоимость отправки (базовая): ${result.response.basePrice}`,
                `Стоимость отправки с учётом скидки: ${result.response.price}`,
                `${result.response.service[0].name}: ${result.response.service[0].price}`,
                `Страхование груза: ${result.response.service[1].price}`,
                `${result.response.service[2].name}: ${result.response.service[2].price}`
            );
        }

    });

}

