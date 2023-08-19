const names = [
    "Ana", "João", "Maria", "Pedro", "Sofia",
    "Lucas", "Mariana", "Mateus", "Isabela", "Rafael",
    "Camila", "Gustavo", "Laura", "Enzo", "Larissa",
    "Carlos", "Fernanda", "Bruno", "Juliana", "Daniel"
];

const lastNames = [
    "Silva", "Santos", "Souza", "Oliveira", "Pereira",
    "Rodrigues", "Almeida", "Ferreira", "Carvalho", "Gomes",
    "Martins", "Rocha", "Ribeiro", "Costa", "Araújo",
    "Fernandes", "Cavalcanti", "Lima", "Barros", "Monteiro"
];

const domains = ["hotmail.com", "gmail.com"];

export const generateFakePIS = (includePunctuation) => {
    const pisDigits = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join('');
    return pisDigits.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3-$4')
}

export const generateFakeCPF = () => {
    const randomDigits = length => [...Array(length)].map(() => Math.floor(Math.random() * 10)).join('');
    return `${randomDigits(3)}.${randomDigits(3)}.${randomDigits(3)}-${randomDigits(2)}`;
}

export const  generateSingleEmail = () => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  
    const email = `${randomName.toLowerCase()}.${randomLastName.toLowerCase()}@${randomDomain}`;
    return email;
}

export const generateFakeCNPJ = () => {
    const randomDigits = length => [...Array(length)].map(() => Math.floor(Math.random() * 10)).join('');
    return `${randomDigits(2)}.${randomDigits(3)}.${randomDigits(3)}/0001-${randomDigits(2)}`;
}

export const generateRandomName = () => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomName} ${randomLastName}`;
}