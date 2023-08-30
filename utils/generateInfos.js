const names = [
    "Ana", "João", "Maria", "Pedro", "Sofia",
    "Lucas", "Mariana", "Mateus", "Isabela", "Rafael",
    "Camila", "Gustavo", "Bruna", "Enzo", "Larissa",
    "Carlos", "Fernanda", "Bruno", "Juliana", "Daniel",
    "Laura", "Thiago", "Vitória", "Eduardo", "Beatriz",
    "André", "Natália", "Gabriel", "Carolina", "Leonardo",
    "Bianca", "Vinícius", "Amanda", "Rodrigo", "Letícia",
    "Paulo", "Clara", "Ricardo", "Manuela", "Fábio"
];

const lastNames = [
    "Silva", "Santos", "Souza", "Oliveira", "Pereira",
    "Rodrigues", "Almeida", "Ferreira", "Carvalho", "Gomes",
    "Martins", "Rocha", "Ribeiro", "Costa", "Araújo",
    "Fernandes", "Cavalcanti", "Lima", "Barros", "Monteiro",
    "Nascimento", "Mendes", "Azevedo", "Cunha", "Castro",
    "Melo", "Cardoso", "Dias", "Pinto", "Freitas",
    "Andrade", "Barbosa", "Sousa", "Nunes", "Leite",
    "Correia", "Vieira", "Moura", "Machado", "Amaral"
];

const domains = ["hotmail.com", "gmail.com"];


export const generateFakePIS = () => {
    let pis = '';

    // Gerando os 10 primeiros dígitos aleatórios
    for (let i = 0; i < 10; i++) {
        pis += Math.floor(Math.random() * 10);
    }

    // Calculando o último dígito verificador
    let soma = 0;
    let multiplicador = 3;

    for (let i = 0; i < 10; i++) {
        soma += parseInt(pis.charAt(i)) * multiplicador;
        multiplicador--;

        if (multiplicador === 1) {
            multiplicador = 9;
        }
    }

    let resto = soma % 11;
    let digitoVerificador = 11 - resto;

    if (digitoVerificador === 10 || digitoVerificador === 11) {
        digitoVerificador = 0;
    }

    pis += digitoVerificador;
    return pis.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3-$4');
}

export const generateFakeCPF = () => {
    const generateRandomDigits = length => [...Array(length)].map(() => Math.floor(Math.random() * 10)).join('');
    const calculateDigit = cpfArray => (cpfArray.reduce((sum, digit, i) => sum + digit * (cpfArray.length + 1 - i), 0) * 10) % 11 % 10;

    const firstNineDigits = generateRandomDigits(9);
    const firstVerifierDigit = calculateDigit([...firstNineDigits]);
    const secondVerifierDigit = calculateDigit([...firstNineDigits, firstVerifierDigit]);

    const formattedCPF = `${firstNineDigits.slice(0, 3)}.${firstNineDigits.slice(3, 6)}.${firstNineDigits.slice(6, 9)}-${firstVerifierDigit}${secondVerifierDigit}`;

    return formattedCPF;
};

export const  generateSingleEmail = () => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  
    const email = `${randomName.toLowerCase()}.${randomLastName.toLowerCase()}@${randomDomain}`;
    return email;
}

function gerarDigitoVerificador(cnpjParcial) {
    let numeros = cnpjParcial.split('').map(Number);
    let multiplicador = 2;
    let soma = 0;
    for (let i = numeros.length - 1; i >= 0; i--) {
      soma += numeros[i] * multiplicador;
      multiplicador = multiplicador === 9 ? 2 : multiplicador + 1;
    }
    const digito = 11 - (soma % 11);
    return digito >= 10 ? 0 : digito;
  }
export const generateFakeCNPJ = () => {
    const cnpjParcial = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
    const primeiroDigito = gerarDigitoVerificador(cnpjParcial);
    const cnpjCompleto = `${cnpjParcial}${primeiroDigito}${gerarDigitoVerificador(cnpjParcial + primeiroDigito.toString())}`;
    return `${cnpjCompleto.substring(0, 2)}.${cnpjCompleto.substring(2, 5)}.${cnpjCompleto.substring(5, 8)}/${cnpjCompleto.substring(8, 12)}-${cnpjCompleto.substring(12)}`;
};



export const generateRandomName = () => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomName} ${randomLastName}`;
}