    window.addEventListener("load", function(event) {
    if (localStorage.length > 0 ){
      for (let index = 0; index < localStorage.length; index++) {
        var element = localStorage.key(index);
        if( element != null && element != 'aux'){
         var urls = localStorage.getItem(element);
          urls = urls.split(',');
         document.getElementById("links").innerHTML += `
         <div id="link-corto">
           <div class="row align-items-center">
             <div class="col-lg-7">
               <span class="links-largos">${urls[0]}</span>
             </div>
             <div class="col" style="text-align: end;">
               <span class="links_cortos" id="link_acortado">${urls[1]}</span>
             </div>
             <div class="col" style="text-align: end;">
               <button class="btn btn-info btn-copy" id="btncopy" onclick="copiarAlPortapapeles()">Copy</button>
             </div>
           </div>
         </div>`
      }
      }
    }
    });
         
    document.getElementById('Shorten').addEventListener('click', function(){
     let link = document.getElementById('mylink').value;
      
   if(link == ''){
        document.getElementById('mylink').style.border = '3px solid var(--red)';
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('mylink').classList.add('error');
        document.getElementById("links").innerHTML = ''
        return 0;
   }
   
      document.getElementById('mylink').style.border = '3px solid green';
      document.getElementById('errorMessage').style.display = 'none';
      document.getElementById('mylink').classList.remove('error');
   let url_larga = document.getElementById('mylink').value;
   fetch("https://rel.ink/api/links/",{
     method:'POST',
     body: JSON.stringify({
       url:url_larga
     }),
     headers: {
       "Content-type": "application/json"
     }
   })
   .then(function(response){
     return response.json()
   })
   .then(function(data){
     var auxInt = parseInt(localStorage.getItem('aux'),10);
     if (isNaN(auxInt)){
      localStorage.setItem('aux', 1);
      auxInt = parseInt(localStorage.getItem('aux'),10);
     }else{
      auxInt += 1;
     }
     
     document.getElementById("links").innerHTML = ''
     var urlJuntas = `${link},https://rel.ink/${data.hashid}`
     
     localStorage.setItem(auxInt,JSON.stringify(urlJuntas))
     for (let index = 0; index < localStorage.length; index++){
       var element = localStorage.key(index);
        element = element.split(',');
       if( element != null && element != 'aux'){
        var urls = localStorage.getItem(element);
        urls = urls.split(',');
       document.getElementById("links").innerHTML += `
       <div id="link-corto">
         <div class="row align-items-center">
           <div class="col-lg-7">
             <span class="links-largos">${urls[0]}</span>
           </div>
           <div class="col" id="lcorto" style="text-align: end;">
             <span class="links_cortos" id="link_acortado">${urls[1]}</span>
           </div>
           <div id="btcorto" class="col" style="text-align: end;">
             <button class="btn btn-info btn-copy" id="btncopy" onclick="copiarAlPortapapeles();">Copy</button>
           </div>
         </div>
       </div>`
     }
     }
     localStorage.removeItem('aux');
     localStorage.setItem('aux', auxInt);
     link.value ==='';
   })
    });


    function copiarAlPortapapeles() {
        var copyTextarea = document.querySelector('.links_cortos');
     var copyText = document.getElementById('link_acortado');
      copyText.select();
      document.execCommand("copy");
    }