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
        <p id="catagory-name" onclick="newsLoad('${catagory.category_id}',toggleSpinner (true))">${catagory.category_name
            }</p>
        `
        catagoriesSection.appendChild(catagoryDiv)
        // console.log(catagory)
    })
};

loadCatagories()

// loader or spinner

const toggleSpinner = (isLoading) => {
    const spinnerConteiner = document.getElementById('spinner-container');
    if (isLoading) {
        spinnerConteiner.classList.remove('d-none')
    }
    else {
        spinnerConteiner.classList.add('d-none')
    }
}

const newsLoad = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayNews(data.data))

};


const displayNews = (allNews) => {

    const WarningContainer = document.getElementById('warning-container')
    const spinnerConteiner = document.getElementById('spinner-container');
    if (allNews.length === 0) {
        WarningContainer.classList.remove('d-none')
        spinnerConteiner.classList.add('d-none')
    }
    else {
        WarningContainer.classList.add('d-none')
    }

    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = ''
    allNews.sort(function (a, b) {
        const x = b.total_view - a.total_view;
        return x;
    })
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
                        <h5>${news.author
                .name ? news.author
                .name : 'No name found'}</h5>
                        <p>${news.author.published_date ? news.author.published_date : 'no date'}</p>
                    </div>

                </div>
                <div>

                    <p><i class="fa-solid fa-eye"></i> ${news.total_view ? news.total_view : 'no view'}</p>
                </div>

                <div>
                    <button onclick="newsDetails('${news._id
            }')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >show details</button>
                </div>

            </div>
              

            </div>
         </div>
         </div>

        </div>


       

        `
        toggleSpinner(false)
        newsContainer.appendChild(newsDiv)
        // console.log(news)
    })
};



// news details for modal
const newsDetails = (newsId) => {
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
        .then(res => res.json())
        .then(data => displayModal(data.data))
};
const displayModal = details => {
    const modalBody = document.getElementById('modal-body')

    details.forEach(detail => {

        modalBody.innerHTML = `
        
        <p> author name: ${detail.author
                .name ? detail.author
                .name : 'No name found'}</p>

        <p> total view: ${detail.total_view
                ? detail.total_view : 'No viewed yet'}</p>

        <p> Rating: ${detail.rating.number

                ? detail.rating.number
                : 'No rating yet'}</p>

        <p> badge:  ${detail.rating.badge


                ? detail.rating.badge

                : 'No rating yet'}</p>
                <p> published time: ${detail.author.published_date ? detail.author.published_date : 'no date and time  found'}</p>
        
        `
        console.log(detail)
    })
}
// newsDetails()

// newsLoad();
