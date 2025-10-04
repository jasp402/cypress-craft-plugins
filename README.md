# Cypress-Craft PackManager: Repositorio Fuente de Plugins

[![Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

**Bienvenido al repositorio fuente de los plugins oficiales para Cypress-Craft.**

Este monorepo no publica paquetes en NPM. En su lugar, actúa como una base de datos centralizada de código que es consumida por el **PackManager UI** dentro de `cypress-craft`. El objetivo es proporcionar snippets de código modulares, reutilizables y, lo más importante, **actualizables** para los proyectos de los usuarios.

## El Concepto: Inyección de Snippets Gestionada

El principal desafío que este sistema resuelve es el mantenimiento y la actualización del código base. En lugar de copiar archivos una sola vez, el PackManager de Cypress-Craft utiliza un sistema de **inyección de código basado en marcadores**.

### Cómo Funciona

1.  **Descubrimiento**: El PackManager lee el archivo `plugins-manifest.json` de este repositorio para saber qué plugins existen.
2.  **Instalación**: Cuando un usuario instala un plugin (ej. `wait-steps`) desde la UI del PackManager, la CLI de `cypress-craft`:
    *   Localiza los snippets de código del plugin (ej. `wait.js` y `waitCustom.js`).
    *   Busca los archivos de destino en el proyecto del usuario (ej. `cypress/common/stepDefinition.core.js` y `cypress/pom/main.pom.js`).
    *   **Inyecta** el contenido de los snippets dentro de bloques de marcadores específicos.

3.  **Actualización**: Si se publica una nueva versión de un plugin en este repositorio, la UI del PackManager notificará al usuario. Al hacer clic en "Actualizar", la CLI de `cypress-craft` simplemente **reemplazará el contenido entre los marcadores de inicio y fin** con el nuevo código del snippet.

### Ventajas Clave

*   **Mantenimiento Centralizado**: Los bugs y mejoras se corrigen en un solo lugar.
*   **Actualizaciones Fáciles**: Los usuarios pueden beneficiarse de las mejoras continuas con un solo clic.
*   **Modularidad y Comunidad**: Permite a la comunidad contribuir con nuevos paquetes de funcionalidades.

## Desarrollo de Plugins

Sigue estos pasos para añadir un nuevo plugin a este repositorio.

### 1. Crear la Estructura del Plugin

Crea una nueva carpeta en `packages/` (ej. `plugin-new-feature`). Dentro, añade:

*   **`package.json`**: Metadata básica. El nombre debe ser `@cypress-craft/plugin-new-feature`.
*   **`plugin-manifest.json`**: El archivo más importante. Define los snippets, sus archivos de destino y los IDs de los marcadores.
*   **`src/...`**: Las carpetas que contienen los archivos de snippets de código reales.

### 2. Escribir el Código de los Snippets

Crea los archivos de snippets. Recuerda añadir comentarios para evitar errores en el IDE, ya que son fragmentos de código aislados:

*   Para **métodos de clase aislados** (en funciones POM):
    ```javascript
    /* eslint-disable */
    // noinspection All
    miMetodoAislado() { /* ... */ }
    ```
*   Para **variables globales no definidas** (en steps):
    ```javascript
    /* global Then, pageObject, cy */
    Then('un nuevo paso', () => { /* ... */ });
    ```

### 3. Actualizar el Manifiesto Raíz

Una vez que tu plugin esté listo, ejecuta el siguiente comando para añadirlo al manifiesto raíz `plugins-manifest.json`:

```sh
yarn generate-manifest
```

## Cómo Contribuir con un Plugin

¡Las contribuciones de la comunidad son bienvenidas! Si has creado un conjunto de steps o funciones POM que crees que serían útiles para otros, puedes proponer que se incluyan en el PackManager oficial siguiendo estos pasos:

1.  **Haz un Fork:** Crea un "Fork" de este repositorio en tu propia cuenta de GitHub.

2.  **Clona tu Fork:** Clona tu repositorio fork a tu máquina local.
    ```sh
    git clone https://github.com/TU_USUARIO/cypress-craft-plugins.git
    ```

3.  **Crea tu Plugin:** Sigue las instrucciones de la sección **"Desarrollo de Plugins"** para crear tu paquete dentro del directorio `packages/`.

4.  **Genera el Manifiesto:** Asegúrate de ejecutar `yarn generate-manifest` y de incluir los cambios del archivo `plugins-manifest.json` en tu commit.

5.  **Haz Commit y Push:** Sube todos los cambios de tu nuevo plugin a tu repositorio fork.
    ```sh
    git add .
    git commit -m "feat(plugin): Add my-awesome-plugin"
    git push origin main
    ```

6.  **Crea un Pull Request:** Desde GitHub, abre un "Pull Request" (PR) desde tu fork hacia la rama `main` del repositorio oficial.

7.  **Describe tu Propuesta:** En la descripción del PR, explica qué hace tu plugin y por qué es útil. El equipo de Cypress-Craft revisará tu propuesta, y si todo está en orden, se fusionará. ¡Una vez fusionado, tu plugin estará disponible para todos los usuarios a través del PackManager!

## Plugins Disponibles

| Plugin                      | Versión | Descripción                                      |
| --------------------------- | ------- | ------------------------------------------------ |
| `@cypress-craft/plugin-steps` | 1.0.0   | Steps avanzados para autenticación.              |
| `@cypress-craft/plugin-wait-steps` | 1.0.0   | Provee definiciones de pasos para esperas.       |

---
## Licencia

Este proyecto está bajo la licencia MIT.
