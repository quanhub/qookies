# Qookies  
** Simple plugin jQuery para mostrar aviso de uso de cookies **

## Uso

Inserta los archivos css necesarios en tu etiqueta `<head>`

```html
<link rel="stylesheet" href="css/qk-default.css">
<link rel="stylesheet" href="css/qk-theme-default.css">
```

Inserta los archivos javascript antes de tu etiqueta `</body>`, después de haber incluido jQuery

** Este plugin usa la libreria js-cookie para manejar las cookies por lo que
 debe ser incluida tambien **

```html
<script src="js.cookie.js"></script>
<script src="lang/ga.js"></script>
<script src="js/qookies.js"></script>
```

Crea un `<div>` desde el cual se llamará al plugin

```html
<div class="qookies"></div>
```

Realiza la llamada a la funcion del plugin

```javascript
$(document).ready(function(){
  $('.qookies').qookies();
});
```
