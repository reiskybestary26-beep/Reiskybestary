import {
    db
    } from "./firebase.js";
    
    import {
    
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    deleteDoc,
    doc,
    updateDoc,
    getDoc
    
    } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
    
    /* ========================= */
    /* ELEMENT */
    /* ========================= */
    
    const publishBtn =
    document.getElementById("publishBtn");
    
    const articleList =
    document.getElementById("adminArticleList");
    
    const commentAdminList =
    document.getElementById("commentAdminList");
    
    let editId = null;
    
    /* ========================= */
    /* CREATE & UPDATE ARTICLE */
    /* ========================= */
    
    publishBtn.addEventListener("click", async ()=>{
    
    const title =
    document.getElementById("title").value;
    
    const content =
    document.getElementById("content").value;
    
    const imageUrl =
    document.getElementById("image").value;
    
    if(!title || !content || !imageUrl){
    
    alert("Lengkapi semua data");
    
    return;
    
    }
    
    try{
    
    if(editId){
    
    await updateDoc(doc(db,"articles",editId),{
    
    title,
    content,
    imageUrl
    
    });
    
    alert("Artikel berhasil diupdate");
    
    editId = null;
    
    publishBtn.innerHTML =
    "Publish Artikel";
    
    }else{
    
    await addDoc(collection(db,"articles"),{
    
    title,
    content,
    imageUrl,
    createdAt:new Date()
    
    });
    
    alert("Artikel berhasil dipublish");
    
    }
    
    /* RESET FORM */
    
    document.getElementById("title").value = "";
    
    document.getElementById("content").value = "";
    
    document.getElementById("image").value = "";
    
    }catch(error){
    
    console.log(error);
    
    alert(error.message);
    
    }
    
    });
    
    /* ========================= */
    /* REALTIME ARTICLE */
    /* ========================= */
    
    const articleQuery = query(
    
    collection(db,"articles"),
    orderBy("createdAt","desc")
    
    );
    
    onSnapshot(articleQuery,(snapshot)=>{
    
    articleList.innerHTML = "";
    
    snapshot.forEach((item)=>{
    
    const data = item.data();
    
    articleList.innerHTML += `
    
    <div class="article-card">
    
    <img
    src="${data.imageUrl}">
    
    <div class="article-content">
    
    <div class="article-tag">
    Education
    </div>
    
    <h3 class="article-title">
    ${data.title}
    </h3>
    
    <p class="article-desc">
    ${data.content.substring(0,120)}...
    </p>
    
    <div class="article-action">
    
    <button
    class="edit-btn"
    onclick="editArticle(
    '${item.id}',
    \`${data.title}\`,
    \`${data.content}\`,
    '${data.imageUrl}'
    )">
    
    Edit
    
    </button>
    
    <button
    class="delete-btn"
    onclick="deleteArticle('${item.id}')">
    
    Delete
    
    </button>
    
    </div>
    
    </div>
    
    </div>
    
    `;
    
    });
    
    });
    
    /* ========================= */
    /* DELETE ARTICLE */
    /* ========================= */
    
    window.deleteArticle = async (id)=>{
    
    const confirmDelete =
    confirm("Yakin ingin menghapus artikel?");
    
    if(confirmDelete){
    
    await deleteDoc(doc(db,"articles",id));
    
    alert("Artikel berhasil dihapus");
    
    }
    
    };
    
    /* ========================= */
    /* EDIT ARTICLE */
    /* ========================= */
    
    window.editArticle = (
    id,
    title,
    content,
    imageUrl
    )=>{
    
    document.getElementById("title").value =
    title;
    
    document.getElementById("content").value =
    content;
    
    document.getElementById("image").value =
    imageUrl;
    
    editId = id;
    
    publishBtn.innerHTML =
    "Update Artikel";
    
    window.scrollTo({
    
    top:0,
    behavior:"smooth"
    
    });
    
    };
    
    /* ========================= */
    /* REALTIME KOMENTAR */
    /* ========================= */
    
    const commentQuery = query(
    
    collection(db,"comments"),
    orderBy("createdAt","desc")
    
    );
    
    onSnapshot(commentQuery, async (snapshot)=>{
    
    commentAdminList.innerHTML = "";
    
    for(const item of snapshot.docs){
    
    const data = item.data();
    
    let articleTitle =
    "Artikel Tidak Ditemukan";
    
    try{
    
    const articleRef =
    doc(db,"articles",data.articleId);
    
    const articleSnap =
    await getDoc(articleRef);
    
    if(articleSnap.exists()){
    
    articleTitle =
    articleSnap.data().title;
    
    }
    
    }catch(error){
    
    console.log(error);
    
    }
    
    commentAdminList.innerHTML += `
    
    <div class="article-card">
    
    <div class="article-content">
    
    <div class="article-tag">
    ${articleTitle}
    </div>
    
    <h3 class="article-title">
    ${data.name}
    </h3>
    
    <p class="article-desc">
    ${data.comment}
    </p>
    
    </div>
    
    </div>
    
    `;
    
    }
    
    });