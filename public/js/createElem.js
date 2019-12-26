function createElement(where, quantity, volume, weight, basisPrice, discountPrice, delivery, insurance, paymentTravel) {

    let infoBoard = document.querySelector('.info_board');

    let container = document.createElement('div');
    container.classList.add('container');

    let infoWhere = document.createElement('p');
    container.appendChild(infoWhere);
    infoWhere.classList.add('info_where');
    infoWhere.innerHTML = where;

    let infoQuantity = document.createElement('p');
    container.appendChild(infoQuantity);
    infoQuantity.classList.add('info_quantity');
    infoQuantity.innerHTML = quantity;

    let infoVolume = document.createElement('p');
    container.appendChild(infoVolume);
    infoVolume.classList.add('info_volume');
    infoVolume.innerHTML = volume;

    let infoWeight = document.createElement('p');
    container.appendChild(infoWeight);
    infoWeight.classList.add('info_weight');
    infoWeight.innerHTML = weight;

    let infoBasisPrice = document.createElement('p');
    container.appendChild(infoBasisPrice);
    infoBasisPrice.classList.add('info_basis_price');
    infoBasisPrice.innerHTML = basisPrice;

    let infoDiscountPrice = document.createElement('p');
    container.appendChild(infoDiscountPrice);
    infoDiscountPrice.classList.add('info_discount_price');
    infoDiscountPrice.innerHTML = discountPrice;

    let infoDelivery = document.createElement('p');
    container.appendChild(infoDelivery);
    infoDelivery.classList.add('info_delivery');
    infoDelivery.innerHTML = delivery;

    let infoInsurance = document.createElement('p');
    container.appendChild(infoInsurance);
    infoInsurance.classList.add('info_insurance');
    infoInsurance.innerHTML = insurance;

    let infoPaymentTravel = document.createElement('p');
    container.appendChild(infoPaymentTravel);
    infoPaymentTravel.classList.add('info_payment_travel');
    infoPaymentTravel.innerHTML = paymentTravel;

    infoBoard.appendChild(container);
}

export {createElement};
