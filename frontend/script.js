document.addEventListener("DOMContentLoaded", () => {

  const filterButtons = document.querySelectorAll(".filter-btn");
  const productItems = document.querySelectorAll(".producto-item");

  if (filterButtons.length > 0 && productItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        
        filterButtons.forEach(btn => {
          btn.classList.remove("btn-dark");
          btn.classList.add("btn-outline-dark");
        });
        button.classList.remove("btn-outline-dark");
        button.classList.add("btn-dark");

        const targetCategory = button.getAttribute("data-category");


        productItems.forEach(item => {
          const itemCategory = item.getAttribute("data-category");

          if (targetCategory === "todos" || itemCategory === targetCategory) {
            item.style.display = "block";

            setTimeout(() => { item.style.opacity = "1"; }, 10);
          } else {
            item.style.opacity = "0";
            item.style.display = "none";
          }
        });
      });
    });
  }


  const contactoForm = document.getElementById("formulario-contacto");

  if (contactoForm) {
    contactoForm.addEventListener("submit", (event) => {
      event.preventDefault(); 

      const txtNombre = document.getElementById("nombre").value.trim();
      const txtEmail = document.getElementById("email").value.trim();
      const txtMensaje = document.getElementById("mensaje").value.trim();
      const containerAlerta = document.getElementById("alerta-formulario");


      containerAlerta.className = "d-none";
      containerAlerta.innerHTML = "";


      if (txtNombre === "" || txtEmail === "" || txtMensaje === "") {
        mostrarMensajeAlerta("Por favor, completa todos los campos requeridos.", "danger");
        return;
      }


      const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexCorreo.test(txtEmail)) {
        mostrarMensajeAlerta("Ingresa una dirección de correo electrónico válida (ejemplo@correo.com).", "danger");
        return;
      }


      mostrarMensajeAlerta(`¡Excelente, ${txtNombre}! Tu mensaje ha sido enviado al equipo de Aly. Te responderemos pronto. 💕`, "success");
      contactoForm.reset(); 
    });


    function mostrarMensajeAlerta(mensaje, tipo) {
      const containerAlerta = document.getElementById("alerta-formulario");
      containerAlerta.className = `alert alert-${tipo} mt-3 fw-medium`;
      containerAlerta.innerText = mensaje;
    }
  }
});
