function getImagePath(imageName) {
  if (!imageName) {
    return "https://via.placeholder.com/400x225?text=No+Image";
  }
  return `images/${imageName}`;
}

const cardsData = [
  {
    id: 1,
    title: "The Ultimate Google Ads Training Course",
    category: "Marketing",
    description: "by Jerome Bell",
    price: "$100",
    image: "8.jpg",
  },
  {
    id: 2,
    title: "Product Management Fundamentals",
    category: "Management",
    description: "by Leslie Alexander Li",
    price: "$200",
    image: "3.jpg",
  },
  {
    id: 3,
    title: "HR Management and Analytics",
    category: "HR & Recruting",
    description: "by Marvin McKinney",
    price: "$480",
    image: "2.jpg",
  },
  {
    id: 4,
    title: "Brand Management & PR Communications",
    category: "Marketing",
    description: "by Guy Hawkins",
    price: "$500",
    image: "9.jpg",
  },
  {
    id: 5,
    title: "Graphic Design Basic",
    category: "Design",
    description: "by Dianne Russell",
    price: "$400",
    image: "1.jpg",
  },
  {
    id: 6,
    title: "Business Development Management",
    category: "Management",
    description: "by Kristin Watson",
    price: "$530",
    image: "7.jpg",
  },
  {
    id: 7,
    title: "Highload Software Architecture",
    category: "Development",
    description: "by Brooklyn Simmons",
    price: "$600",
    image: "4.jpg",
  },
  {
    id: 8,
    title: "Human Resources – Selection and Recruitment",
    category: "HR & Recruting",
    description: "by Kathryn Murphy",
    price: "$150",
    image: "6.jpg",
  },
  {
    id: 9,
    title: "User Experience. Human-centered Design",
    category: "Design",
    description: "by Cody Fisher",
    price: "$240",
    image: "5.jpg",
  },
];

function getCategoryColor(category) {
  const colors = {
    Marketing: "marketing",
    Management: "management",
    "HR & Recruting": "hr",
    Design: "design",
    Development: "development",
  };
  return colors[category] || "marketing";
}

function getCategoryCount(category) {
  if (category === "All") {
    return cardsData.length;
  }
  return cardsData.filter((card) => card.category === category).length;
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const cardsContainer = document.getElementById("cardsContainer");
  const filtersContainer = document.getElementById("filtersContainer");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  let displayedCards = 6;
  const cardsPerPage = 6;

  const categories = [
    "All",
    ...new Set(cardsData.map((card) => card.category)),
  ];

  initFilters();
  renderCards(cardsData.slice(0, displayedCards));
  initSearch();
  initLoadMore();

  if (cardsData.length <= displayedCards) {
    loadMoreBtn.style.display = "none";
  }

  function initFilters() {
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.className = "catalog__filter";
      if (category === "All") {
        button.classList.add("catalog__filter_active");
      }
      button.dataset.category = category === "All" ? "all" : category;

      const inner = document.createElement("div");
      inner.className = "catalog__filter-inner";

      const text = document.createElement("span");
      text.className = "catalog__filter-text";
      text.textContent = category;

      const count = document.createElement("span");
      count.className = "catalog__filter-count";
      count.textContent = getCategoryCount(category);

      inner.appendChild(text);
      inner.appendChild(count);
      button.appendChild(inner);
      button.addEventListener("click", handleFilterClick);
      filtersContainer.appendChild(button);
    });
  }

  function handleFilterClick(e) {
    const button = e.currentTarget;
    document.querySelectorAll(".catalog__filter").forEach((btn) => {
      btn.classList.remove("catalog__filter_active");
    });

    button.classList.add("catalog__filter_active");

    displayedCards = cardsPerPage;

    applyFilters();
  }

  function initSearch() {
    let searchTimeout;

    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        applyFilters();
      }, 300);
    });
  }

  function applyFilters() {
    const searchQuery = searchInput.value.toLowerCase().trim();
    const activeFilter = document.querySelector(".catalog__filter_active");
    const selectedCategory = activeFilter
      ? activeFilter.dataset.category
      : "all";

    const filteredCards = cardsData.filter((card) => {
      const matchesCategory =
        selectedCategory === "all" || card.category === selectedCategory;

      const matchesSearch = card.title.toLowerCase().includes(searchQuery);

      return matchesCategory && matchesSearch;
    });

    const cardsToShow = filteredCards.slice(0, displayedCards);
    renderCards(cardsToShow);

    if (filteredCards.length > displayedCards) {
      loadMoreBtn.style.display = "flex";
    } else {
      loadMoreBtn.style.display = "none";
    }
  }

  function initLoadMore() {
    loadMoreBtn.addEventListener("click", () => {
      displayedCards += cardsPerPage;
      applyFilters();
    });
  }

  function renderCards(cards) {
    cardsContainer.innerHTML = "";

    if (cards.length === 0) {
      cardsContainer.innerHTML = `
                <div class="catalog__empty">
                    <p class="catalog__empty-title">Nothing found</p>
                    <p class="catalog__empty-text">Try changing your search or filter parameters</p>
                </div>
            `;
      return;
    }

    cards.forEach((card, index) => {
      const cardElement = createCardElement(card);
      cardElement.style.animationDelay = `${index * 0.05}s`;
      cardsContainer.appendChild(cardElement);
    });
  }

  function createCardElement(card) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

    const imagePath = getImagePath(card.image);

    const categoryClass = `card__category_${getCategoryColor(card.category)}`;

    cardDiv.innerHTML = `
            <div class="card__image-wrapper">
                <img src="${imagePath}" alt="${card.title}" class="card__image" loading="lazy" onerror="this.src='https://via.placeholder.com/400x225?text=Image+Not+Found'">
            </div>
            <div class="card__content">
                <span class="card__category ${categoryClass}">${card.category}</span>
                <h3 class="card__title">${card.title}</h3>
                <div class="card__info">
                    <span class="card__price">${card.price}</span>
                    <span class="card__divider"></span>
                    <span class="card__author">${card.description}</span>
                </div>
            </div>
        `;

    return cardDiv;
  }
});
