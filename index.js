import{a as m,S as u,i as n}from"./assets/vendor-R3OKcsLX.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const f=s=>m.get("https://pixabay.com/api/",{params:{key:"51410933-6e28737e6449aa5e8ee5fd880",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(o=>o.data);let l;const c=document.querySelector(".gallery"),d=document.querySelector(".loader"),p=s=>{const o=s.map(t=>`
      <li class="gallery-item">
        <a href="${t.largeImageURL}">
          <img src="${t.webformatURL}" alt="${t.tags}" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${t.likes}</p>
          <p><b>Views:</b> ${t.views}</p>
          <p><b>Comments:</b> ${t.comments}</p>
          <p><b>Downloads:</b> ${t.downloads}</p>
        </div>
      </li>`).join("");c.insertAdjacentHTML("beforeend",o),l?l.refresh():l=new u(".gallery a",{captionsData:"alt",captionDelay:250})},h=()=>{c.innerHTML=""},g=()=>{d.classList.remove("hidden")},y=()=>{d.classList.add("hidden")},b={form:document.querySelector("form")},L=s=>{s.preventDefault();const o=s.target.elements["search-text"].value.trim();if(!o){n.warning({title:"Warning",message:"Search field cannot be empty.",position:"topRight"});return}h(),g(),f(o).then(t=>{const i=t.hits;i.length===0&&n.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),p(i)}).catch(t=>{console.error("Error:",t),n.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"})}).finally(()=>{y()})};b.form.addEventListener("submit",L);
//# sourceMappingURL=index.js.map
