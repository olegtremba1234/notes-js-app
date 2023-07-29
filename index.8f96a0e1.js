!function(){var e=["Task","Random Thought","Idea"];function t(){var t=document.createElement("div");t.id="modal",t.className="modal";var n=document.createElement("div");n.className="modal-content";var d=document.createElement("span");d.className="close-button",d.id="close-button",d.textContent="×";var a=document.createElement("form");a.id="add-note-form";var l=document.createElement("label");l.setAttribute("for","note-name"),l.textContent="Note Name:";var m=document.createElement("input");m.type="text",m.id="note-name",m.required=!0;var s=document.createElement("label");s.setAttribute("for","category"),s.textContent="Category:";var p=document.createElement("select");p.id="category",p.required=!0,e.forEach((function(e){var t=document.createElement("option");t.value=e,t.textContent=e,p.appendChild(t)}));var v=document.createElement("label");v.setAttribute("for","note-content"),v.textContent="Note Content:";var y=document.createElement("input");y.type="text",y.id="note-content",y.required=!0;var f=document.createElement("button");f.type="submit",f.textContent="Add Note",a.appendChild(l),a.appendChild(m),a.appendChild(s),a.appendChild(p),a.appendChild(v),a.appendChild(y),a.appendChild(f);var h=document.createElement("form");h.id="edit-note-form",h.style.display="none";var C=document.createElement("label");C.setAttribute("for","edit-note-name"),C.textContent="Edit Note Name:";var E=document.createElement("input");E.type="text",E.id="edit-note-name",E.required=!0;var b=document.createElement("label");b.setAttribute("for","edit-note-content"),b.textContent="Edit Note Content:";var q=document.createElement("input");q.type="text",q.id="edit-note-content",q.required=!0;var g=document.createElement("label");g.setAttribute("for","edit-category"),g.textContent="Edit Category:";var S=document.createElement("select");S.id="edit-category",S.required=!0,e.forEach((function(e){var t=document.createElement("option");t.value=e,t.textContent=e,S.appendChild(t)}));var x=document.createElement("button");x.type="submit",x.textContent="Save Changes",x.dataset.noteId="",h.appendChild(C),h.appendChild(E),h.appendChild(b),h.appendChild(q),h.appendChild(g),h.appendChild(S),h.appendChild(x),n.appendChild(d),n.appendChild(a),n.appendChild(h),t.appendChild(n),d.addEventListener("click",o),a.addEventListener("submit",c),h.addEventListener("submit",r),t.addEventListener("click",i),document.addEventListener("keydown",u),document.body.appendChild(t)}function n(){var e=document.querySelector("#modal"),t=document.querySelector("#add-note-form"),n=document.querySelector("#edit-note-form");d=!1,t.style.display="block",n.style.display="none",e.style.display="block"}function o(){(document.querySelector("#modal").style.display="none",d)&&(document.querySelector("#edit-note-form").reset(),document.querySelector("#add-note-form").style.display="block",d=!1)}var d=!1;function a(e){var t=document.querySelector("#modal"),n=document.querySelector("#add-note-form"),o=document.querySelector("#edit-note-form"),a=document.querySelector("#edit-note-name"),r=document.querySelector("#edit-note-content"),c=document.querySelector("#edit-category"),i=document.querySelector("#edit-note-form button"),u=s.find((function(t){return t.id===e}));u?(n.style.display="none",o.style.display="block",a.value=u.name,r.value=u.content,c.value=u.category,i.dataset.noteId=u.id,i.textContent="Save Changes",d=!0,t.style.display="block"):console.error("Note not found.")}function r(e){e.preventDefault();var t=document.querySelector("#edit-note-name"),n=document.querySelector("#edit-note-content"),d=document.querySelector("#edit-category"),a=t.value,r=n.value,c=d.value,i=parseInt(e.target.querySelector("button").dataset.noteId);r&&!isNaN(i)?(v(i,a,r,c),l(),o()):alert("Note content is required.")}function c(t){t.preventDefault();var n=document.querySelector("#note-name"),d=document.querySelector("#note-content"),a=document.querySelector("#category"),r=n.value,c=d.value,i=a.value;c&&i&&r?(p(r,c,i),l(),n.value="",d.value="",a.value=e[0],o()):alert("Note content and category are required.")}function i(e){"modal"===e.target.id&&o()}function u(e){"Escape"===e.key&&o()}function l(){var e=document.querySelector("#notes-table");e.innerHTML="",s.forEach((function(t){var n=document.createElement("tr"),o=document.createElement("td"),d=document.createElement("td"),r=document.createElement("td"),c=document.createElement("td"),i=document.createElement("td"),u=document.createElement("td"),m=document.createElement("td"),s=document.createElement("td");o.textContent=t.name,d.textContent=new Date(t.id).toLocaleString(),r.textContent=t.category,c.textContent=t.content,i.textContent=t.dates.join(", ");var p=document.createElement("button");p.classList.add("edit-button"),p.dataset.noteId=t.id,p.addEventListener("click",(function(){a(t.id)})),u.appendChild(p);var v=document.createElement("button");v.classList.add("archive-button"),v.dataset.noteId=t.id,v.addEventListener("click",(function(){t.archived?h(t.id):f(t.id),l()})),m.appendChild(v);var C=document.createElement("button");C.classList.add("remove-button"),C.dataset.noteId=t.id,C.addEventListener("click",(function(){y(t.id)})),s.appendChild(C),n.appendChild(o),n.appendChild(d),n.appendChild(r),n.appendChild(c),n.appendChild(i),n.appendChild(u),n.appendChild(m),n.appendChild(s),t.archived&&n.classList.add("archived-note"),e.insertBefore(n,e.firstChild)}))}function m(){var e=document.querySelector("#summary-table");e.innerHTML="";var t=s.reduce((function(e,t){return t.archived||(e[t.category]=(e[t.category]||0)+1),e}),{}),n=s.reduce((function(e,t){return t.archived&&(e[t.category]=(e[t.category]||0)+1),e}),{});["Task","Random Thought","Idea"].forEach((function(o){var d=document.createElement("tr"),a=document.createElement("td"),r=document.createElement("td"),c=document.createElement("td");a.textContent=o,r.textContent=t[o]||0,c.textContent=n[o]||0,d.appendChild(a),d.appendChild(r),d.appendChild(c),e.appendChild(d)}))}var s=[];function p(e,t,n){var o={id:Date.now(),name:e,content:t,category:n,archived:!1,dates:C(t)};s.push(o),l(),m()}function v(e,t,n,o){var d=s.findIndex((function(t){return t.id===e}));-1!==d&&(s[d].name=t,s[d].content=n,s[d].category=o,s[d].dates=C(n),l(),m())}function y(e){s=s.filter((function(t){return t.id!==e})),l(),m()}function f(e){var t=s.findIndex((function(t){return t.id===e}));-1!==t&&(s[t].archived=!0,l(),m())}function h(e){var t=s.findIndex((function(t){return t.id===e}));-1!==t&&(s[t].archived=!1,l(),m())}function C(e){return e&&e.match(/\b\d{1,2}\/\d{1,2}\/\d{4}\b/g)||[]}function E(e){var t=e.target;if(t.classList.contains("edit-button"))v(b(t));else if(t.classList.contains("archive-button")){f(b(t))}else if(t.classList.contains("remove-button")){!function(e){confirm("Are you sure you want to remove this note?")&&y(e)}(b(t))}}function b(e){var t=e.closest("tr");return parseInt(t.dataset.noteId)}console.log("notes",s),document.addEventListener("DOMContentLoaded",(function(){var e,d;t(),e={id:Date.now(),name:"note1",category:"Task",content:"Remember to buy groceries on 8/1/2023",archived:!1,dates:["8/1/2023"]},d={id:Date.now()+1,name:"note2",category:"Task",content:"Meeting with Jane at 10 am tomorrow",archived:!1,dates:["8/2/2023"]},s.push(e,d),l(),m(),document.querySelector("#add-note-button").addEventListener("click",n),document.querySelector("#close-button").addEventListener("click",o),document.querySelector("#add-note-form").addEventListener("submit",c),document.querySelector("#modal").addEventListener("click",i),document.addEventListener("keydown",u),document.querySelector("#notes-table").addEventListener("click",E)}))}();
//# sourceMappingURL=index.8f96a0e1.js.map