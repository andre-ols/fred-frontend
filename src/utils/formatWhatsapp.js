function mask(value, pattern) {
    let i = 0;
    return pattern.replace(/#/g, () => value[i++] || '');
  }

export default function formatWhatsapp (whatsapp) {
    //Tratando o whatsapp
    if ( whatsapp ) {
      //Removendo o 55 eo @c.us
      const clearWhatsapp = whatsapp.substring(2, whatsapp.length - 5);
      //Verificando se ja tem o 9, se não, adiciona!
      const finishWhatsapp = (clearWhatsapp.length < 11 ? clearWhatsapp.substr(0, 2).concat('9').concat(clearWhatsapp.substr(2)): clearWhatsapp)
      //Coloca a mascara para ficar no modelo abaixo
      return mask(finishWhatsapp, '(##) #####-####');
    }
}