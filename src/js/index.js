import { flags } from './flags';

const url = 'https://api.exchangerate.host/';
const $currencyForm = document.querySelector('#currency-content');
const $convert = $currencyForm.querySelector('#convert-btn');
const $exchange = $currencyForm.querySelector('#exchange-btn');

function uploadCurrenciesCodes(){
    const $currencyCodeBase = $currencyForm.querySelector('select[name="base"]');
    const $currencyCodeEndpoint = $currencyForm.querySelector('select[name="endpoint"]');

    fetch(url + 'symbols')
    .then(response => response.json())
    .then(currencies => {
        const currenciesCodes = Object.keys(currencies.symbols);

        currenciesCodes.forEach(code => {
            const $option = document.createElement('option');

            $option.value = code;
            $option.text = `${flags[code] || '🤔'} ${code} - ${currencies.symbols[code].description}`;

            $currencyCodeBase.append($option);
            $currencyCodeEndpoint.append($option.cloneNode(true));
        })
    })
    .catch(() => {
        console.error('It could not get the currencies codes');
    });
}

function getParams(){
    const amount = Number($currencyForm.querySelector('#amount').value);
    const date = $currencyForm.querySelector('#calendar').value;
    const currencyCodeBase = $currencyForm.querySelector('select[name="base"]').value;
    const currencyCodeEndpoint = $currencyForm.querySelector('select[name="endpoint"]').value;

    return `convert?from=${currencyCodeBase}&to=${currencyCodeEndpoint}&amount=${amount}&date=${date}`;
}

function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function showResult(response){
    const $result = $currencyForm.querySelector('#result');

    if($result.classList.contains('invisible')) $result.classList.remove('invisible');

    $result.querySelector('#base-code').textContent = response.query.from;
    $result.querySelector('#endpoint-code').textContent = response.query.to;
    $result.querySelector('#base-value').textContent = numberWithCommas(response.query.amount).toString();
    $result.querySelector('#endpoint-value').textContent = numberWithCommas(response.result).toString();
    $result.querySelector('#date-value').textContent = response.date;
}

function convertHandler(){
    fetch(url + getParams())
    .then(response => response.json())
    .then(response => {showResult(response)})
}

function exchangeHandler(){
    const $currencyCodeBase = $currencyForm.querySelector('select[name="base"]');
    const $currencyCodeEndpoint = $currencyForm.querySelector('select[name="endpoint"]');
    let temp;

    temp = $currencyCodeBase.value;
    $currencyCodeBase.value = $currencyCodeEndpoint.value;
    $currencyCodeEndpoint.value = temp;
}

uploadCurrenciesCodes();
$convert.addEventListener('click', convertHandler);
$exchange.addEventListener('click', exchangeHandler);