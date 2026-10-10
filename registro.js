(() => {
  "use strict";

  const assistanceEndpoint = "https://script.google.com/macros/s/AKfycbxlG32r0qH5MEjenSVBpeqAbJ2bkimRaU7_mJdddmXSvlKgpvAbtB0PZs8TIJLMbuM/exec";
  const fields = ["nombre", "cargo", "municipalidad", "region", "provincia", "distrito", "correo", "telefono", "fase", "necesidad"];
  const form = document.querySelector("#assistanceForm");
  const button = document.querySelector("#submitButton");
  const status = document.querySelector("#formStatus");
  let sending = false;

  form.addEventListener("input", (event) => {
    if (typeof event.target.setCustomValidity === "function") {
      event.target.setCustomValidity("");
    }
    if (!sending) {
      status.textContent = "";
      status.className = "status";
    }
  });

  function setSending(value) {
    sending = value;
    button.disabled = value;
    button.textContent = value ? "Enviando solicitud..." : "Registrar solicitud";
    form.setAttribute("aria-busy", String(value));
    form.querySelectorAll("fieldset").forEach((fieldset) => { fieldset.disabled = value; });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;

    for (const name of fields) {
      const input = form.elements.namedItem(name);
      input.value = input.value.trim();
      input.setCustomValidity(input.required && !input.value ? "Complete este campo." : "");
    }
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const record = new URLSearchParams();
    record.set("fecha", new Date().toLocaleString("es-PE", { timeZone: "America/Lima" }));
    fields.forEach((field) => record.set(field, data.get(field) || ""));
    status.className = "status";
    status.textContent = "Enviando su solicitud...";
    setSending(true);

    try {
      // Apps Script receives the same form fields as the municipal guide.
      // Its cross-origin response is opaque; receipt must be checked in Sheets.
      const response = await fetch(assistanceEndpoint, {
        method: "POST",
        mode: "no-cors",
        credentials: "omit",
        body: record,
      });
      if (response.type !== "opaque" && !response.ok) throw new Error("Request failed");
      form.reset();
      status.className = "status success";
      status.textContent = "Solicitud enviada para revisión. Gracias por registrar a su municipalidad.";
    } catch (error) {
      status.className = "status error";
      status.textContent = "No se pudo enviar su solicitud. Sus datos siguen en el formulario. Revise su conexión e intente nuevamente, o escriba a ald.3105@gmail.com.";
    } finally {
      setSending(false);
      status.focus();
    }
  });
})();
