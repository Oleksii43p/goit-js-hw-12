import{a as p,S as m,i}from"./assets/vendor-BHMhIOvr.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const u="51410933-6e28737e6449aa5e8ee5fd880",f="https://pixabay.com/api/",g=15,y=async(s,o=1)=>(await p.get(f,{params:{key:u,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:g,page:o}})).data;let l;const c=document.querySelector(".gallery"),d=document.querySelector(".loader"),h=s=>{const o=s.map(t=>`
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
      </li>`).join("");c.insertAdjacentHTML("beforeend",o),l?l.refresh():l=new m(".gallery a",{captionsData:"alt",captionDelay:250})},b=()=>{c.innerHTML=""},L=()=>{d.classList.remove("hidden")},w=()=>{d.classList.add("hidden")},E={form:document.querySelector("form")},S=s=>{s.preventDefault();const o=s.target.elements["search-text"].value.trim();if(!o){i.warning({title:"Warning",message:"Search field cannot be empty.",position:"topRight"});return}b(),L(),y(o).then(t=>{const a=t.hits;a.length===0&&i.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),h(a)}).catch(t=>{console.error("Error:",t),i.error({title:"Error",message:"Failed to load images. Please try again.",position:"topRight"})}).finally(()=>{w()})};E.form.addEventListener("submit",S);
//# sourceMappingURL=index.js.map
