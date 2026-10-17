# GENTE.ARTS · Development Guidelines

Este archivo establece las normas generales de trabajo para cualquier desarrollador o asistente de IA que colabore en este repositorio.

Su objetivo es mantener un desarrollo seguro, organizado, consistente y fácil de mantener.

## 1. Principios generales

- Prioriza la calidad, seguridad, legibilidad y mantenibilidad del código.
- Respeta la arquitectura y las convenciones existentes.
- No introduzcas tecnologías, dependencias o patrones nuevos sin una justificación clara.
- Evita la sobreingeniería y las soluciones innecesariamente complejas.
- No presupongas que una funcionalidad existe: compruébalo en el código.
- Diferencia entre funcionalidades implementadas, propuestas y decisiones pendientes.
- Si una tarea es ambigua, solicita aclaración antes de implementarla.

## 2. Metodología de trabajo

El flujo habitual será:

Analizar → Planificar → Aprobar → Implementar → Verificar.

Antes de realizar modificaciones relevantes:

1. Comprende la petición y revisa únicamente los archivos necesarios.
2. Identifica el alcance y las posibles dependencias.
3. Propón una solución clara, indicando los archivos afectados.
4. Explica los riesgos o alternativas cuando corresponda.
5. Espera aprobación antes de implementar.

Una solicitud de análisis, revisión o investigación no constituye autorización para modificar archivos.

No amplíes el alcance de una tarea sin consultarlo.

## 3. Estrategia de Git

El repositorio utiliza tres ramas permanentes:

- `develop`: integración del desarrollo diario.
- `pre-production`: validación de cambios antes de producción.
- `main`: versión estable de producción.

### Flujo habitual

1. Actualizar la referencia local de `develop`.
2. Crear una rama de trabajo a partir de `develop`.
3. Implementar y verificar los cambios en esa rama.
4. Abrir una Pull Request hacia `develop`.
5. Revisar y aprobar antes de integrar.
6. Promocionar los cambios de `develop` a `pre-production` mediante Pull Request.
7. Tras la validación, promocionar de `pre-production` a `main` mediante Pull Request.

Convenciones para ramas de trabajo:

- `feature/descripcion-breve`
- `fix/descripcion-breve`
- `refactor/descripcion-breve`
- `chore/descripcion-breve`
- `docs/descripcion-breve`

No desarrollar directamente sobre `main` ni `pre-production`. Evitar también los cambios directos sobre `develop`: utilizar ramas de trabajo y Pull Requests.

No crear, cambiar, fusionar ni eliminar ramas automáticamente sin autorización.

No realizar commits, pushes, merges, rebases, resets destructivos ni force pushes sin aprobación expresa.

Antes de cualquier operación de Git, comprobar la rama actual y el estado del árbol de trabajo. No sobrescribir cambios existentes de otros colaboradores.

## 4. Buenas prácticas de desarrollo

- Mantén los componentes y funciones con responsabilidades claras.
- Favorece la reutilización cuando aporte valor real.
- Utiliza nombres descriptivos y consistentes.
- Evita duplicar lógica innecesariamente.
- Gestiona correctamente errores y estados límite.
- Considera accesibilidad, rendimiento y experiencia de usuario.
- Mantén la coherencia visual con los patrones existentes del proyecto.
- No introduzcas cambios visuales ajenos a la tarea solicitada.
- Evita refactorizaciones masivas durante correcciones puntuales.

## 5. Verificación y calidad

Antes de dar una tarea por terminada:

- Revisa los cambios realizados.
- Ejecuta las comprobaciones pertinentes disponibles en el proyecto, cuando esté autorizado.
- Comprueba que no se hayan introducido errores evidentes.
- Verifica que el resultado cumple los requisitos acordados.
- Indica qué se ha comprobado y qué queda pendiente de verificar.

No afirmes que una funcionalidad funciona correctamente si no se ha comprobado.

No añadas herramientas de testing, linting o formateo sin autorización previa.

## 6. Seguridad

- Nunca expongas credenciales, tokens, claves privadas ni información sensible.
- No abras archivos de secretos salvo que exista una necesidad justificada y autorización.
- No incluyas secretos en commits, documentación o respuestas.
- No ejecutes operaciones destructivas sin aprobación.
- No modifiques configuraciones de producción, infraestructura, despliegues o bases de datos sin autorización expresa.
- No elimines archivos ni cambios existentes para simplificar una implementación.

## 7. Documentación

- Documenta las decisiones técnicas relevantes.
- Mantén actualizada la documentación afectada por los cambios aprobados.
- No dependas de documentos externos que no estén disponibles en el repositorio.
- No conviertas propuestas futuras en requisitos implementados.
- No generes documentación extensa o duplicada innecesariamente.

## 8. Comunicación y eficiencia

- Comunícate en español de España.
- Sé claro, directo y preciso.
- Prioriza respuestas concisas, sin omitir información importante.
- No repitas análisis ya realizados cuando el contexto siga siendo válido.
- Limita la exploración a los archivos relacionados con la tarea.
- No utilices agentes paralelos salvo que exista una ventaja justificada y autorización.
- Ante una decisión técnica relevante, aporta criterio propio y señala los inconvenientes de la solución propuesta.

## 9. Finalización de tareas

Al finalizar una implementación, presenta un resumen breve con:

- Qué se ha realizado.
- Qué archivos se han modificado.
- Qué verificaciones se han ejecutado y sus resultados.
- Qué aspectos quedan pendientes, si los hay.

No realices tareas adicionales sin autorización.