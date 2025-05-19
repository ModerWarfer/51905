# 51905

# Cómo ejecutar el analizador

# pasos 
1. Clonar el repositorio
   
git clone https://github.com/ModerWarfer/51905.git

cd 51905

2. Instalar dependencias
   
npm install

3. Ejecutar el analizador

npm start

#Contenido del proyecto
generated/          # Archivos generados por ANTLR4
Lenguaje.g4         # Gramática del lenguaje
index.js            # Código principal
input.txt           # Código fuente de ejemplo
package.json        # Configuración de npm

#📌 Salida esperada

✅ Código válido.

🌳 Árbol de derivación:
(programa (ifStatement if ( (expression x > 0) ) (block { console.log("Número positivo"); }) else (block { console.log("Número negativo"); })))

📋 Tokens reconocidos:
Token: IF              | 'if' | Línea: 1
Token: PARENTESIS_ABRE | '('  | Línea: 1
Token: LETTER          | 'x'  | Línea: 1
Token: OPERADOR        | '>'  | Línea: 1
Token: DIGIT           | '0'  | Línea: 1
Token: PARENTESIS_CIERRA | ')' | Línea: 1
...

# Precauciones 

1. **Uso de cadenas
**:
   - Las cadenas deben estar entre comillas dobles `"Ejemplo de cadena"`.
   - No olvides cerrar correctamente las comillas.

2. **Condiciones en bucles**:
   - La condición en `while` debe ser `0` o `1`.
   - No dejes paréntesis vacíos.

3. **Estructura del bucle `do-while`**:
   - Asegúrate de que el bucle tiene las llaves `{}`.
   - La declaración `J` antes de `while` es obligatoria.

4. **Uso del comando `puts`**:
   - Debe estar correctamente estructurado como `puts("Texto");`.
   - No olvides el `;` al final de cada instrucción.

# se inicia con  `npm start`.
