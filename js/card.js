const qrDialog=document.querySelector('#qr-dialog');
document.querySelector('#show-qr')?.addEventListener('click',()=>qrDialog.showModal());
document.querySelector('#close-qr')?.addEventListener('click',()=>qrDialog.close());
qrDialog?.addEventListener('click',event=>{if(event.target===qrDialog){const rect=qrDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)qrDialog.close();}});
