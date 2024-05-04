const sidebar = document.querySelector('.examples');
const items = document.querySelector('.example');

let currentItemIndex = 0;
let scrollInterval;

function scrollItems() {
    scrollInterval = setInterval(() => {
        currentItemIndex++;
        if (currentItemIndex >= items.length) {
            currentItemIndex = 0;
        }

        sidebar.scrollTo({
            top: items[currentItemIndex].offsetTop,
            behavior: 'smooth'
        });
    }, 100); // Adjust scroll speed (milliseconds)
}

// Start scrolling automatically
scrollItems();