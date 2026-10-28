// Funções compartilhadas pelo jogo. Este arquivo é importado como módulo.
export const nomes = [
    "Gabriel", "Mariana", "Lucas", "Júlia",
    "Rafael", "Beatriz", "Alex", "Camila"
];

export function sortearItem(lista) {
    const indiceAleatorio = Math.floor(Math.random() * lista.length);
    return lista[indiceAleatorio];
}
