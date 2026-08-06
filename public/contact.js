const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const submitButton = form?.querySelector("button[type='submit']");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!formStatus || !submitButton || !form.reportValidity()) return;

  const trap = form.elements.namedItem("_honey");
  if (trap?.value) return;

  const endpoint = form.dataset.endpoint;
  if (!endpoint) return;

  submitButton.disabled = true;
  submitButton.dataset.label = submitButton.textContent ?? "Send project brief";
  submitButton.textContent = "Sending…";
  formStatus.textContent = "";
  formStatus.dataset.state = "sending";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Form submission failed");

    form.reset();
    formStatus.textContent = "Message sent. Thank you.";
    formStatus.dataset.state = "success";
  } catch {
    const email = form.dataset.email ?? "hello@cmpc.ro";
    formStatus.innerHTML = `The form could not send. Email <a href="mailto:${email}">${email}</a>.`;
    formStatus.dataset.state = "error";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = submitButton.dataset.label ?? "Send project brief";
  }
});
