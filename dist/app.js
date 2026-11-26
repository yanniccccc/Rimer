const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');menu.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Menü öffnen');menu.textContent='☰'}));
const dialog=document.querySelector('#dialog'),content=document.querySelector('#dialog-content');function show(html){content.innerHTML=html;dialog.showModal()}document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
const topics={'Alltag & Eigentum':['Alltag und Eigentum absichern','Wir besprechen Ihre Haftpflicht-, Hausrat-, Wohngebäude- und Kfz-Versicherung. Dabei schauen wir, welche Verträge vorhanden sind und wo es Fragen oder Lücken gibt.',['Was möchten Sie konkret absichern?','Welche Verträge bestehen bereits?','Hat sich Ihre Wohn- oder Lebenssituation verändert?']],'Gesundheit & Arbeitskraft':['Gesundheit und Einkommen absichern','Wir klären Ihre Fragen zu Berufsunfähigkeit sowie Kranken- und Zusatzversicherungen und betrachten, welche Absicherung bereits besteht.',['Wie sieht Ihre berufliche Situation aus?','Welche Absicherung ist bereits vorhanden?','Welche Leistungen sind Ihnen wichtig?']],'Vorsorge & Zukunft':['Vorsorge planen','Wir besprechen Ihre Altersvorsorge, vorhandene Verträge und die finanzielle Absicherung Ihrer Familie.',['Welche Ziele haben Sie für Ihre Vorsorge?','Wie flexibel soll Ihre Vorsorge bleiben?','Wen möchten Sie zusätzlich absichern?']]};document.querySelectorAll('[data-topic]').forEach(b=>b.addEventListener('click',()=>{const t=topics[b.dataset.topic];show(`<h2>${t[0]}</h2><p>${t[1]}</p><h3>Mögliche Fragen</h3><ul>${t[2].map(s=>`<li>${s}</li>`).join('')}</ul><a class="button" href="#kontakt" id="dialog-contact">Kontakt aufnehmen</a>`);document.querySelector('#dialog-contact').addEventListener('click',()=>dialog.close())}));document.querySelectorAll('[data-contact]').forEach(b=>b.addEventListener('click',()=>show(`<h2>Kontaktdaten werden ergänzt.</h2><p class="notice">Diese Designvorschau verwendet Dummy-Kontaktdaten. Es wird keine Nachricht verschickt und kein Anruf gestartet.</p><p>Die echten Kontaktdaten von Maxim Rimer werden vor dem öffentlichen Einsatz ergänzt.</p>`)));
const legal={datenschutz:`<h2>Datenschutz</h2><p class="notice">Platzhalter für die spätere Datenschutzerklärung. Dieser Text ist keine vollständige Datenschutzerklärung für den öffentlichen Betrieb.</p><h3>Diese Designvorschau</h3><p>Die Website verwendet keine eigenen Analysewerkzeuge, keine eingebetteten Karten, keine extern geladenen Schriftarten und keine eingebetteten Drittanbieter-Dienste. Beim Absenden des Kontaktformulars werden Name, E-Mail-Adresse, Thema und Nachricht an FormSubmit (Devro Labs) übermittelt und an den Empfänger weitergeleitet. FormSubmit speichert Einsendungen nach eigenen Angaben vorübergehend. Die vollständigen Informationen zur Datenverarbeitung werden vor dem öffentlichen Betrieb ergänzt.</p><p>Ohne Absenden des Formulars werden durch den Seitencode keine Kontaktdaten an FormSubmit übertragen. Es werden keine Cookies oder Browser-Speicher angelegt. Der Hosting-Anbieter kann technische Zugriffsdaten verarbeiten. Der QR-Code ist lokal eingebunden. Erst wenn Sie einen externen Link zu WhatsApp oder FINGO-INSURE öffnen, rufen Sie den jeweiligen Drittanbieter auf; dort gelten dessen Datenschutzhinweise.</p><h3>Vor dem öffentlichen Einsatz zu ergänzen</h3><p>Verantwortlicher und Kontakt, Hosting und technische Protokolldaten, Zwecke und Rechtsgrundlagen, Speicherdauer, Betroffenenrechte sowie die tatsächlich eingesetzten Kontakt- und Kommunikationsdienste.</p>`};document.querySelectorAll('[data-legal]').forEach(b=>b.addEventListener('click',()=>show(legal[b.dataset.legal])));

const contactForm=document.querySelector('#contact-form');
if(contactForm){
 contactForm.addEventListener('submit',async event=>{
  event.preventDefault();
  if(!contactForm.reportValidity()) return;
  const status=document.querySelector('#contact-status');
  const button=contactForm.querySelector('[type="submit"]');
  const fields=new FormData(contactForm);
  const payload=Object.fromEntries(fields);
  payload._subject='Kontaktanfrage über Maxim Rimer';
  payload._captcha='false';
  button.disabled=true;
  button.textContent='Wird gesendet …';
  status.textContent='';
  try{
   const response=await fetch('https://formsubmit.co/ajax/yannicschnepf@gmail.com',{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify(payload),
   });
   const result=await response.json();
   if(!response.ok||!(result.success===true||result.success==='true')){
    if(typeof result.message==='string'&&/activat/i.test(result.message))throw new Error('Das Formular muss vom Empfänger noch per E-Mail bestätigt werden.');
    throw new Error('Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.');
   }
   status.textContent='Vielen Dank. Ihre Nachricht wurde gesendet.';
   status.dataset.state='success';
   contactForm.reset();
  }catch(error){
   status.textContent=error.message||'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.';
   status.dataset.state='error';
  }finally{
   button.disabled=false;
   button.textContent='Nachricht senden';
  }
 });
}

const copyInvitationCode=document.querySelector('#copy-invitation-code');
if(copyInvitationCode){
 copyInvitationCode.addEventListener('click',async()=>{
  const code=document.querySelector('#invitation-code');
  const status=document.querySelector('#copy-code-status');
  try{
   await navigator.clipboard.writeText(code.textContent.trim());
   status.textContent='Code kopiert.';
  }catch{
   const selection=window.getSelection();
   const range=document.createRange();
   range.selectNodeContents(code);
   selection.removeAllRanges();
   selection.addRange(range);
   status.textContent='Code markiert. Bitte manuell kopieren.';
  }
 });
}
