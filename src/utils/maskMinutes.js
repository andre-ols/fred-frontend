export default function maskMoney(value){

    value = value + '';
    value = parseInt(value.replace(/[\D]+/g, ''));
    console.log(value)
    value = value + '';

    if(value === 'NaN') 
        return '0';
    return `${value}`;

}