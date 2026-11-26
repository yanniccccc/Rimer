# Maxim Rimer website

The contact form sends directly through FormSubmit to `yannicschnepf@gmail.com`. No sender domain or API key is required. The first submission triggers an activation email to that address; the recipient must confirm it before regular delivery starts. Until then, the form shows an activation notice instead of a false success message.

The form uses the FormSubmit AJAX endpoint and has a standard HTML POST fallback. The WhatsApp number, business address, and legal information remain placeholders. Update the privacy notice for the final contact setup before public launch.
