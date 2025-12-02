
document.addEventListener("DOMContentLoaded", function() {
    // --- 1. SEARCH & PUBLISH/JOURNAL Functionality (Aapka Original Code) ---
    const searchItem = document.querySelector(".nav-item.has-dropdown");
    const searchLink = searchItem.querySelector(".nav-link");
    // Corrected typo: searchClose was '.close-butto', assuming it should be '.close-button' or you fixed it elsewhere
    const searchClose = searchItem.querySelector(".close-button") || searchItem.querySelector(".close-butto"); 
    const overlay = searchItem.querySelector(".search-overlay");

    const publishBtn = document.getElementById("publish-btn");
    const publishMenu = document.getElementById("publish-menu");
    const journalBtn = document.getElementById("journal-btn");
    const journalMenu = document.getElementById("journal-menu");
    const closeJournal = document.getElementById("close-dropdown");

    // 🔍 SEARCH toggle
    searchLink.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = searchItem.classList.toggle("dropdown-open");
        publishMenu.classList.remove("active");
        journalMenu.style.display = "none";
        overlay.style.display = isOpen ? "block" : "none";
        document.body.classList.toggle("no-scroll", isOpen);
    });

    // ❌ Close search
    searchClose.addEventListener("click", function(e) {
        e.preventDefault();
        searchItem.classList.remove("dropdown-open");
        overlay.style.display = "none";
        document.body.classList.remove("no-scroll");
    });

    // 🕳️ Click outside (for search)
    document.addEventListener("click", function(e) {
        if (!e.target.closest(".main-menu") && searchItem.classList.contains("dropdown-open")) {
            searchItem.classList.remove("dropdown-open");
            overlay.style.display = "none";
            document.body.classList.remove("no-scroll");
        }
    });

    // 📘 PUBLISH toggle
    publishBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        publishMenu.classList.toggle("active");
        searchItem.classList.remove("dropdown-open");
        overlay.style.display = "none";
        document.body.classList.remove("no-scroll");
        journalMenu.style.display = "none";
    });

    // 📗 JOURNAL toggle
    journalBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = journalMenu.style.display === "block";
        journalMenu.style.display = isOpen ? "none" : "block";
        searchItem.classList.remove("dropdown-open");
        publishMenu.classList.remove("active");
        overlay.style.display = "none";
        document.body.classList.remove("no-scroll");
    });

    closeJournal.addEventListener("click", function() {
        journalMenu.style.display = "none";
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // --- 2. Generic Dropdown Toggling (Aapka Original Code) ---
    const triggers = document.querySelectorAll('.dropdown-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.preventDefault();

            const menu = this.nextElementSibling;
            
            document.querySelectorAll('.action-dropdown-content').forEach(openMenu => {
                if (openMenu !== menu && openMenu.style.display === 'block') {
                    openMenu.style.display = 'none';
                }
            });

            if (menu.style.display === 'block') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
        });
    });

    document.addEventListener('click', function(event) {
        // Check if the click was OUTSIDE any dropdown or trigger
        if (!event.target.closest('.has-dropdown') && !event.target.closest('.dropdown-trigger')) {
            document.querySelectorAll('.action-dropdown-content').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // --- 3. ARTICLE CLICK LOGIC (Updated for Open/Locked Articles) ---
    
    // Get the necessary elements for the modal
    const articleLinks = document.querySelectorAll('.article-title');
    const modal = document.getElementById('access-modal');
    const closeBtn = document.querySelector('.modal-close-btn');
    const loginBtn = document.querySelector('.modal-button'); 

    // Function to show the modal (No event.preventDefault() here)
    function showModal() {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
    
    // Function to hide the modal
    function hideModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore background scrolling
        }
    }

    // Attach click event to all article titles
    articleLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Check karte hain ki kya link ke parent div (.article-item) mein 
            // band lock icon (<i class="fas fa-lock"></i>) maujood hai.
            const isLocked = link.closest('.article-item').querySelector('.fas.fa-lock');
            
            if (isLocked) {
                // Agar LOCKED hai, toh default link action (navigation) ko roko
                event.preventDefault(); 
                // Aur modal dikhao
                showModal(); 
            }
            // Agar OPEN hai, toh event.preventDefault() call nahi hoga, 
            // aur link apne href (PDF) ko normal tarah se kholega.
        });
    });

    // Close the modal when the 'x' button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', hideModal);
    }

    // Close the modal when the "Log In / Subscribe" button is clicked 
    if (loginBtn) {
        loginBtn.addEventListener('click', hideModal); 
    }

    // Close the modal when the user clicks anywhere outside the content (on the overlay)
    window.addEventListener('click', function(event) {
        if (modal && event.target === modal) {
            hideModal();
        }
    });
    
    // Original code mein yeh tha, agar aapko iski zaroorat nahi hai toh hata sakte hain:
    /*
    const accessInfoTrigger = document.querySelector('.open-access-info');
    if (accessInfoTrigger) { 
        accessInfoTrigger.addEventListener('click', showModal);
        accessInfoTrigger.style.cursor = 'pointer'; 
    }
    */

    
});
