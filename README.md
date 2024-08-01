# Prueba tecnica DrivIn - Juan Pablo Sepulveda


## Descripción
Esta página es el desarrollo de los desafíos entregados por DrivIn. La web consiste en una tabla que muestra datos de autos proporcionados por una API. Se utilizó Axios para realizar las llamadas a la API y obtener los datos, los cuales son traducidos para su posterior visualización.

La tabla permite ordenar cada una de las columnas mediante un método de ordenación. Además, presenta una opción de filtrado de datos, que se realiza atravez de la API utilizando sus parámetros siempre que esta disponga de esa capacidad. En caso de no disponerla, el filtrado se realiza en el cliente después de obtener los datos (ejemplo en tipo de auto).

La tabla también está configurada para permitir la paginación desde el cliente, mostrando 20 elementos por página, con un máximo de 50 elementos por llamada, que es la capacidad máxima permitida por la API.

Se integró OpenStreetMap para permitir la visualización de las ubicaciones de los vehículos. La dirección actual se genera de manera aleatoria.

Finalmente, se implementó un diseño responsivo y se agregó la funcionalidad de modo claro y oscuro para mejorar la experiencia de visualización y accesibilidad en toda la web.



## Instrucciones de depliegue

1. **Clonar el repositorio**
    ```bash
    git clone https://github.com/JuanPabloSQ/tech-interview-drivin
    ```

2. **Crear una cuenta en  [API NINJAS](https://api-ninjas.com ) con la cual conseguiras una apiKey**

3. **Generar un archivo `.env` en la raíz del proyecto con el siguiente contenido**

    ```
    VITE_CARS_API_KEY={APIKEY}
    VITE_CARS_API_URL=https://api.api-ninjas.com/v1/cars
    VITE_OPEN_STREET_MAPS_API_URL=https://nominatim.openstreetmap.org/reverse
    ```

4. **Instalar dependencias**

    ```bash
    npm install
    ```
5. **Ejecturas proyecto**

    ```bash
    npm run dev
    ```


## Tecnologias utilizadas

- Esta página web fue creada utilizando HTML5, Javascript, CSS, Vite + React, junto con las librerías Axios, MaterialUI y OpenStreetMaps
