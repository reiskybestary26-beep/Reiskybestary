import {
    db
    } from "./firebase.js";
    
    import {
    collection,
    onSnapshot,
    query,
    orderBy
    } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
    
    const articleList =
    document.getElementById("articleList");
    
    const q = query(
    collection(db, "articles"),
    orderBy("createdAt", "desc")
    );
    
    onSnapshot(q, (snapshot)=>{
    
    articleList.innerHTML = "";
    
    snapshot.forEach((doc)=>{
    
    const data = doc.data();
    
    articleList.innerHTML += `
    
    <div class="col-lg-6">
    
    <div class="card">
    
    <img src="${data.imageUrl}" class="card-img-top">
    
    <div class="card-body">
    
    <div class="card-category">
    Pendidikan
    </div>
    
    <h3 class="card-title">
    ${data.title}
    </h3>
    
    <p class="card-text">
    ${data.content.substring(0,150)}...
    </p>
    
    <a href="detail.html?id=${doc.id}">
<button class="read-btn">
Baca Selengkapnya
</button>
</a>
    </div>
    
    </div>
    
    </div>
    
    `;
    
    });
    
    });