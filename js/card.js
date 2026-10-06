const qrDialog=document.querySelector('#qr-dialog');
document.querySelector('#show-qr')?.addEventListener('click',()=>qrDialog.showModal());
document.querySelector('#close-qr')?.addEventListener('click',()=>qrDialog.close());
qrDialog?.addEventListener('click',event=>{if(event.target===qrDialog){const rect=qrDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)qrDialog.close();}});
document.querySelector('#motion-toggle')?.addEventListener('click',function(){const paused=this.getAttribute('aria-pressed')!=='true';this.setAttribute('aria-pressed',String(paused));this.textContent=paused?'Resume motion':'Pause motion';this.setAttribute('aria-label',paused?'Resume radar animation':'Pause radar animation');document.querySelector('.visual-scene').classList.toggle('motion-paused',paused);});
