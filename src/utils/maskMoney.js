export default function maskMoney(value){

    value = value + '';
    value = parseInt(value.replace(/[\D]+/g, ''));
    console.log(value)
    value = value + '';
    value = value.replace(/([0-9]{2})$/g, ",$1");
    console.log(value)

    if (value.length > 6) {
        value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    if(value === 'NaN')
        return 'R$ 0,0'
    return `R$ ${value}`;

}