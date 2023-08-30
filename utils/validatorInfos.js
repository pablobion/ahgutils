export const validatePIS = (pis) => {
    // Remover caracteres não numéricos
    pis = pis.replace(/\D/g, '');
    // Verificar se o número tem 11 dígitos
    if (pis.length !== 11) {
        return false;
    }

    // Calcular dígito verificador
    const weight = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let total = 0;
    for (let i = 0; i < 10; i++) {
        total += parseInt(pis.charAt(i)) * weight[i];
    }

    const remainder = total % 11;
    const expectedDigit = 11 - remainder;
    const lastDigit = parseInt(pis.charAt(10));

    // Verificar se o último dígito é igual ao dígito calculado
    if (expectedDigit === 10 || expectedDigit === 11) {
        return lastDigit === 0;
    } else {
        return lastDigit === expectedDigit;
    }
}

export const validateCPF = (cpf) => {
    if(cpf === '') return null
    const cleanCPF = cpf.replace(/\D/g, '');

    if (cleanCPF.length !== 11) return false;

    const digits = cleanCPF.split('').map(Number);

    let sum = 0;
    let factor = 10;

    for (let i = 0; i < 9; i++) {
        sum += digits[i] * factor;
        factor--;
    }

    let calculatedDigit1 = 11 - (sum % 11);
    calculatedDigit1 = calculatedDigit1 > 9 ? 0 : calculatedDigit1;

    if (calculatedDigit1 !== digits[9]) return false;

    sum = 0;
    factor = 11;

    for (let i = 0; i < 10; i++) {
        sum += digits[i] * factor;
        factor--;
    }

    let calculatedDigit2 = 11 - (sum % 11);
    calculatedDigit2 = calculatedDigit2 > 9 ? 0 : calculatedDigit2;

    return calculatedDigit2 === digits[10];
}

export const validateCNPJ = (cnpj) => {
    if(cnpj === '') return null
    const cleanCNPJ = cnpj.replace(/\D/g, '');

    if (cleanCNPJ.length !== 14) return false;

    const digits = cleanCNPJ.split('').map(Number);

    // Calcula o primeiro dígito verificador
    let sum = 0;
    let factor = 5;
    for (let i = 0; i < 12; i++) {
        sum += digits[i] * factor;
        factor = factor === 2 ? 9 : factor - 1;
    }
    let calculatedDigit1 = sum % 11;
    calculatedDigit1 = calculatedDigit1 < 2 ? 0 : 11 - calculatedDigit1;

    if (calculatedDigit1 !== digits[12]) return false;

    // Calcula o segundo dígito verificador
    sum = 0;
    factor = 6;
    for (let i = 0; i < 13; i++) {
        sum += digits[i] * factor;
        factor = factor === 2 ? 9 : factor - 1;
    }
    let calculatedDigit2 = sum % 11;
    calculatedDigit2 = calculatedDigit2 < 2 ? 0 : 11 - calculatedDigit2;

    return calculatedDigit2 === digits[13];
}

export const validateEmail = (email) => {
    if(email === '') return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}