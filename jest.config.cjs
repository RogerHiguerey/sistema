// jest.config.cjs
module.exports = {
    transform: {
      "^.+\\.js$": "babel-jest", // Transforma todos los archivos .js usando babel-jest
    },
    testEnvironment: "node",    // Usa el entorno de Node.js para las pruebas
    verbose: true,              // Muestra información detallada de las pruebas
  };
  