import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';

new AirDatepicker('#calendar', {
    locale: localeEn,
    position: 'top right',
    dateFormat: 'yyyy-MM-dd',
    minDate: '1999-1-1',
    buttons: ['today']
});