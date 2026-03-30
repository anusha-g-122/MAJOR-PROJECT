( ()=> {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})();

const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions-box');

if(searchInput && suggestionsBox){
searchInput.addEventListener('input', async (e) => {
    const query = e.target.value;
    if (query.length < 2){
      suggestionsBox.style.display='none';
      return;
    } 


    try {
        const res = await fetch(`/listings/suggestions?q=${query}`);
        const data = await res.json();

        
      if(data.length>0){
        suggestionsBox.innerHTML="";
        data.forEach(item => {
            const div=document.createElement('div');
            div.className="suggestion-item";
            div.innerHTML=`
            <img src="${item.image.url}" class="suggestion-img">
            <div class="suggestion-info">
                  <span class="suggestion-title">${item.title}</span>
                  <span class="suggestion-loc">${item.location},${item.country}</span>
            </div>
            `;
            div.onclick=()=>{
              searchInput.value=item.title;
              suggestionsBox.style.display='none';
              searchInput.closest('form').submit();
            };
            suggestionsBox.appendChild(div);
        });
        suggestionsBox.style.display='block';

      }else{
        suggestionsBox.style.display='none';
      }
        
    } catch (err) {
        console.error("Autocomplete error:", err);
    }
});

document.addEventListener('click',(e)=>{
  if(!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)){
    style.display='none';
}
});
}
