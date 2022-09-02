const loadCatagories = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayCatagories(data.data.news_category
        ))
};
const displayCatagories = (catagories) => {
    const catagoriesSection = document.getElementById('catagories-section');

    catagories.forEach(catagory => {
        const catagoryDiv = document.createElement('div');
        catagoryDiv.innerHTML = `
        <p  onclick="newsLoad('${catagory.category_id}')">${catagory.category_name
            }</p>
        `
        catagoriesSection.appendChild(catagoryDiv)
        console.log(catagory)
    })
}
loadCatagories()

const newsLoad = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
};


const displayNews = (allNews) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = ''
    allNews.forEach(news => {
        const newsDiv = document.createElement('div');

        newsDiv.innerHTML = `
       
        <div class="card  mb-3">
         <div class="row  g-0">
           <div class="col-md-3">
             <img  src="${news.thumbnail_url
            }" class="img-fluid rounded-start" alt="...">
           </div>
           <div class="col-md-9">
            <div class="card-body">
                <h5 class="card-title">${news.title
            }</h5>
                <p class="card-text">${news.details.slice(0, 600)
            }...</p>


            <div class="d-flex justify-content-between ">
                <div class="d-flex align-items-center">
                    <img style="height: 45px; width: 45px; border-radius: 50%; "
                        src="${news.author.img}" alt="">
                    <div class="ms-1">
                        <h5>${news.author.name}</h5>
                        <p>${news.author.published_date}</p>
                    </div>

                </div>
                <div>

                    <p><i class="fa-solid fa-eye"></i> ${news.total_view}</p>
                </div>
                <div>
                    <button  class="btn btn-primary">show details</button>
                </div>
            </div>
              

            </div>
         </div>
         </div>

        </div>
        `
        newsContainer.appendChild(newsDiv)
        console.log(news)
    })
}
newsLoad(5);
