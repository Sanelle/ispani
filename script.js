document.addEventListener('DOMContentLoaded', function() {
    // App Loader
    const appLoader = document.getElementById('app-loader');
    const progressBar = document.querySelector('.progress');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                appLoader.classList.add('fade-out');
                setTimeout(() => {
                    appLoader.style.display = 'none';
                }, 500);
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 200);
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Notification Panel
    const notificationBtn = document.getElementById('notification-btn');
    const notificationPanel = document.getElementById('notification-panel');
    const closeNotifications = document.getElementById('close-notifications');
    
    if (notificationBtn && notificationPanel) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationPanel.classList.toggle('active');
        });
    }
    
    if (closeNotifications) {
        closeNotifications.addEventListener('click', () => {
            notificationPanel.classList.remove('active');
        });
    }
    
    // Close notification panel when clicking outside
    document.addEventListener('click', (e) => {
        if (notificationPanel && !notificationPanel.contains(e.target) && e.target !== notificationBtn) {
            notificationPanel.classList.remove('active');
        }
    });
    
    // User Menu Dropdown
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userMenu = document.getElementById('user-menu');
    
    if (userMenuBtn && userMenu) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('active');
        });
    }
    
    // Close user menu when clicking outside
    document.addEventListener('click', (e) => {
        if (userMenu && !userMenu.contains(e.target) && e.target !== userMenuBtn) {
            userMenu.classList.remove('active');
        }
    });
    
    // Floating Action Button
    const fabButton = document.getElementById('fab-button');
    
    if (fabButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                fabButton.classList.add('active');
            } else {
                fabButton.classList.remove('active');
            }
            
            // Add shadow to header on scroll
            const appHeader = document.querySelector('.app-header');
            if (appHeader) {
                if (window.scrollY > 50) {
                    appHeader.classList.add('scrolled');
                } else {
                    appHeader.classList.remove('scrolled');
                }
            }
        });
        
        fabButton.addEventListener('click', () => {
            // Open request service modal
            const requestModal = document.getElementById('request-modal');
            if (requestModal) {
                openModal(requestModal);
            }
        });
    }
    
    // Modal Functions
    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Close modals when clicking X or outside
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Service Time Selection
    const serviceTimeSelect = document.getElementById('service-time');
    const dateTimePicker = document.getElementById('date-time-picker');
    
    if (serviceTimeSelect && dateTimePicker) {
        serviceTimeSelect.addEventListener('change', function() {
            if (this.value === 'scheduled') {
                dateTimePicker.style.display = 'block';
                setTimeout(() => {
                    dateTimePicker.style.opacity = '1';
                }, 10);
            } else {
                dateTimePicker.style.display = 'none';
            }
        });
    }
    
    // Initialize Flatpickr
    if (document.getElementById('service-date-time')) {
        flatpickr("#service-date-time", {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            minDate: "today",
            time_24hr: true
        });
    }
    
    if (document.getElementById('booking-date')) {
        flatpickr("#booking-date", {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            minDate: "today",
            time_24hr: true
        });
    }
    
    // Price Range Slider
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const priceMinValue = document.getElementById('price-min-value');
    const priceMaxValue = document.getElementById('price-max-value');
    
    if (priceMin && priceMax && priceMinValue && priceMaxValue) {
        [priceMin, priceMax].forEach(input => {
            input.addEventListener('input', updatePriceRange);
        });
        
        function updatePriceRange() {
            // Ensure min doesn't exceed max and vice versa
            if (parseInt(priceMin.value) > parseInt(priceMax.value)) {
                priceMin.value = priceMax.value;
            }
            
            priceMinValue.textContent = `R${priceMin.value}`;
            priceMaxValue.textContent = `R${priceMax.value}`;
        }
        
        // Initialize
        updatePriceRange();
    }
    
    // Image Upload Preview
    const serviceImages = document.getElementById('service-images');
    const imagePreview = document.getElementById('image-preview');
    
    if (serviceImages && imagePreview) {
        serviceImages.addEventListener('change', function(e) {
            imagePreview.innerHTML = '';
            
            for (let file of e.target.files) {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        const img = document.createElement('img');
                        img.src = event.target.result;
                        imagePreview.appendChild(img);
                    };
                    
                    reader.readAsDataURL(file);
                }
            }
        });
    }
    
    // Provider Data
    const providers = [
        {
            id: 1,
            name: "Premium Plumbing Services",
            rating: 4.8,
            reviews: 124,
            price: 150,
            location: "Cape Town",
            service: "plumbing",
            image: "https://images.unsplash.com/photo-1605087880595-8cc6db61f12c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            description: "With over 15 years of experience, our team of licensed plumbers provides top-quality service for all your plumbing needs. From leak repairs to full bathroom renovations, we handle it all with professionalism and care.",
            experience: "15+ years",
            services: [
                "Leak detection and repair",
                "Pipe installation and repair",
                "Drain cleaning",
                "Water heater installation",
                "Bathroom and kitchen plumbing",
                "Emergency plumbing services"
            ],
            photos: [
                "https://images.unsplash.com/photo-1605087880595-8cc6db61f12c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            ],
            reviewsList: [
                {
                    id: 1,
                    author: "Sarah Johnson",
                    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                    rating: 5,
                    date: "2023-05-15",
                    text: "Excellent service! Fixed my leaking pipe in no time and was very professional. Would definitely recommend."
                },
                {
                    id: 2,
                    author: "Michael Brown",
                    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                    rating: 4,
                    date: "2023-04-28",
                    text: "Quick response and quality work. The plumber was knowledgeable and fixed the issue efficiently."
                }
            ]
        },
        {
            id: 2,
            name: "Spark Electrical Solutions",
            rating: 4.9,
            reviews: 89,
            price: 200,
            location: "Johannesburg",
            service: "electrical",
            image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a7d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            description: "Our certified electricians provide reliable electrical services for residential and commercial properties. Safety and quality are our top priorities in every job we undertake.",
            experience: "12+ years",
            services: [
                "Electrical wiring and repairs",
                "Lighting installation",
                "Circuit breaker services",
                "Electrical inspections",
                "Appliance installation",
                "Emergency electrical services"
            ],
            photos: [
                "https://images.unsplash.com/photo-1581093450021-4a7360e9a7d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            ],
            reviewsList: [
                {
                    id: 1,
                    author: "Thomas Wilson",
                    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
                    rating: 5,
                    date: "2023-06-02",
                    text: "Outstanding work! They rewired my entire house and everything was done perfectly. Very professional team."
                }
            ]
        },
        {
            id: 3,
            name: "Clean & Shine Home Services",
            rating: 4.7,
            reviews: 215,
            price: 120,
            location: "Durban",
            service: "cleaning",
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            description: "We provide thorough and eco-friendly cleaning services for homes and offices. Our team uses professional equipment and safe cleaning products to give your space a sparkling clean.",
            experience: "8+ years",
            services: [
                "Regular home cleaning",
                "Deep cleaning",
                "Move-in/move-out cleaning",
                "Office cleaning",
                "Carpet cleaning",
                "Window cleaning"
            ],
            photos: [
                "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1600566752228-1d6f6f5e7f3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            ],
            reviewsList: [
                {
                    id: 1,
                    author: "Amina Bello",
                    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
                    rating: 5,
                    date: "2023-05-20",
                    text: "My apartment has never been so clean! The team was punctual and did an amazing job. Will definitely book again."
                },
                {
                    id: 2,
                    author: "David Smith",
                    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
                    rating: 4,
                    date: "2023-04-10",
                    text: "Great cleaning service. They pay attention to details and my place looks spotless after every visit."
                }
            ]
        },
        {
            id: 4,
            name: "Master Carpentry Works",
            rating: 4.6,
            reviews: 76,
            price: 180,
            location: "Pretoria",
            service: "carpentry",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            description: "Specializing in custom woodworking and furniture, our skilled carpenters bring craftsmanship and precision to every project. From small repairs to custom built-ins, we deliver quality work.",
            experience: "10+ years",
            services: [
                "Custom furniture",
                "Cabinet making",
                "Wooden floor installation",
                "Door and window installation",
                "Deck building",
                "General carpentry repairs"
            ],
            photos: [
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            ],
            reviewsList: [
                {
                    id: 1,
                    author: "Robert Johnson",
                    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
                    rating: 5,
                    date: "2023-03-15",
                    text: "Built a beautiful custom bookshelf for my home. The craftsmanship is exceptional and it fits perfectly in the space."
                }
            ]
        },
        {
            id: 5,
            name: "Green Thumb Landscaping",
            rating: 4.5,
            reviews: 142,
            price: 160,
            location: "Port Elizabeth",
            service: "landscaping",
            image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            description: "We transform outdoor spaces into beautiful, functional landscapes. Our services include garden design, lawn care, irrigation systems, and outdoor living spaces.",
            experience: "7+ years",
            services: [
                "Garden design and installation",
                "Lawn maintenance",
                "Tree and shrub care",
                "Irrigation systems",
                "Patio and deck installation",
                "Landscape lighting"
            ],
            photos: [
                "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            ],
            reviewsList: [
                {
                    id: 1,
                    author: "Emily Wilson",
                    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
                    rating: 4,
                    date: "2023-04-05",
                    text: "They completely transformed my backyard into a beautiful garden. The team was professional and creative with the design."
                },
                {
                    id: 2,
                    author: "James Peterson",
                    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
                    rating: 5,
                    date: "2023-03-22",
                    text: "Excellent landscaping service. My lawn has never looked better and the irrigation system works perfectly."
                }
            ]
        },
        {
            id: 6,
            name: "Quick Fix Plumbing",
            rating: 4.3,
            reviews: 98,
            price: 130,
            location: "Bloemfontein",
            service: "plumbing",
            image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            description: "Fast and reliable plumbing services for emergencies and routine maintenance. We're available 24/7 to handle all your plumbing needs with quick response times.",
            experience: "5+ years",
            services: [
                "Emergency plumbing",
                "Drain cleaning",
                "Toilet repairs",
                "Water heater services",
                "Pipe repairs",
                "Fixture installation"
            ],
            photos: [
                "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            ],
            reviewsList: [
                {
                    id: 1,
                    author: "Lisa Thompson",
                    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
                    rating: 4,
                    date: "2023-05-10",
                    text: "Came quickly when my pipe burst in the middle of the night. Fixed the issue professionally and at a reasonable price."
                }
            ]
        }
    ];
    
    // Display Providers
    const providersGrid = document.querySelector('.providers-grid');
    
    function displayProviders(filteredProviders = providers) {
        if (!providersGrid) return;
        
        providersGrid.innerHTML = '';
        
        if (filteredProviders.length === 0) {
            providersGrid.innerHTML = '<p class="no-results">No service providers found matching your criteria.</p>';
            return;
        }
        
        filteredProviders.forEach(provider => {
            const providerCard = document.createElement('div');
            providerCard.className = 'provider-card animate-slideUp';
            providerCard.style.animationDelay = `${filteredProviders.indexOf(provider) * 0.1}s`;
            providerCard.innerHTML = `
                <img src="${provider.image}" alt="${provider.name}">
                <div class="provider-info">
                    <h3>${provider.name}</h3>
                    <div class="provider-rating">
                        <div class="stars">
                            ${generateStarRating(provider.rating)}
                        </div>
                        <span>${provider.rating}</span>
                        <span>(${provider.reviews} reviews)</span>
                    </div>
                    <div class="provider-price">From R${provider.price}</div>
                    <div class="provider-location">
                        <i class="fas fa-map-marker-alt"></i> ${provider.location}
                    </div>
                    <button class="view-details" data-id="${provider.id}">View Details</button>
                </div>
            `;
            
            providersGrid.appendChild(providerCard);
        });
        
        // Add event listeners to view details buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const providerId = parseInt(this.getAttribute('data-id'));
                const provider = providers.find(p => p.id === providerId);
                showProviderDetails(provider);
            });
        });
    }
    
    // Generate star rating HTML
    function generateStarRating(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }
    
    // Show provider details in modal
    function showProviderDetails(provider) {
        const modal = document.getElementById('provider-modal');
        if (!modal) return;
        
        const modalName = document.getElementById('provider-modal-name');
        const modalRating = document.getElementById('provider-modal-rating');
        const modalReviews = document.getElementById('provider-modal-reviews');
        const modalLocation = document.getElementById('provider-modal-location');
        const modalPrice = document.getElementById('provider-modal-price');
        const modalAbout = document.getElementById('provider-modal-about');
        const modalExperience = document.getElementById('provider-modal-experience');
        const modalServices = document.getElementById('provider-modal-services');
        const modalReviewsList = document.getElementById('provider-modal-reviews-list');
        const modalPhotoGallery = document.getElementById('provider-modal-photo-gallery');
        const mainProviderImage = document.getElementById('main-provider-image');
        const galleryThumbs = document.querySelector('.gallery-thumbs');
        
        // Set basic info
        if (modalName) modalName.textContent = provider.name;
        if (modalRating) modalRating.textContent = provider.rating;
        if (modalReviews) modalReviews.textContent = `(${provider.reviews} reviews)`;
        if (modalLocation) modalLocation.textContent = provider.location;
        if (modalPrice) modalPrice.textContent = `From R${provider.price}`;
        if (modalAbout) modalAbout.textContent = provider.description;
        if (modalExperience) modalExperience.textContent = provider.experience;
        
        // Set main image
        if (mainProviderImage) {
            mainProviderImage.src = provider.image;
            mainProviderImage.alt = provider.name;
        }
        
        // Clear and set thumbnails
        if (galleryThumbs) {
            galleryThumbs.innerHTML = '';
            provider.photos.forEach(photo => {
                const thumb = document.createElement('img');
                thumb.src = photo;
                thumb.alt = provider.name;
                thumb.addEventListener('click', () => {
                    if (mainProviderImage) mainProviderImage.src = photo;
                });
                galleryThumbs.appendChild(thumb);
            });
        }
        
        // Set services
        if (modalServices) {
            modalServices.innerHTML = '';
            provider.services.forEach(service => {
                const li = document.createElement('li');
                li.textContent = service;
                modalServices.appendChild(li);
            });
        }
        
        // Set reviews
        if (modalReviewsList) {
            modalReviewsList.innerHTML = '';
            provider.reviewsList.forEach(review => {
                const reviewItem = document.createElement('div');
                reviewItem.className = 'review-item';
                reviewItem.innerHTML = `
                    <div class="review-author">
                        <img src="${review.avatar}" alt="${review.author}">
                    </div>
                    <div class="review-content">
                        <div class="review-header">
                            <div>
                                <div class="review-author-name">${review.author}</div>
                                <div class="review-date">${formatDate(review.date)}</div>
                            </div>
                            <div class="review-rating">
                                ${generateStarRating(review.rating)}
                            </div>
                        </div>
                        <div class="review-text">${review.text}</div>
                    </div>
                `;
                modalReviewsList.appendChild(reviewItem);
            });
        }
        
        // Set photo gallery
        if (modalPhotoGallery) {
            modalPhotoGallery.innerHTML = '';
            provider.photos.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo;
                img.alt = provider.name;
                modalPhotoGallery.appendChild(img);
            });
        }
        
        // Set up tab switching
        const tabs = document.querySelectorAll('.provider-tab');
        const tabContents = document.querySelectorAll('.provider-tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.getAttribute('data-tab') === tabName) {
                        content.classList.add('active');
                    }
                });
            });
        });
        
        // Set up booking button
        const bookNowBtn = modal.querySelector('.btn-primary');
        if (bookNowBtn) {
            bookNowBtn.addEventListener('click', () => {
                closeModal(modal);
                showBookingModal(provider);
            });
        }
        
        // Open modal
        openModal(modal);
    }
    
    // Show booking modal
    function showBookingModal(provider) {
        const modal = document.getElementById('booking-modal');
        if (!modal) return;
        
        const providerImage = document.getElementById('booking-provider-image');
        const providerName = document.getElementById('booking-provider-name');
        const providerRating = document.getElementById('booking-provider-rating');
        const serviceSelect = document.getElementById('booking-service');
        const serviceFee = document.getElementById('booking-service-fee');
        const bookingTotal = document.getElementById('booking-total');
        
        // Set provider info
        if (providerImage) {
            providerImage.src = provider.image;
            providerImage.alt = provider.name;
        }
        if (providerName) providerName.textContent = provider.name;
        if (providerRating) providerRating.textContent = provider.rating;
        
        // Set services dropdown
        if (serviceSelect) {
            serviceSelect.innerHTML = '<option value="">Select a service</option>';
            provider.services.forEach(service => {
                const option = document.createElement('option');
                option.value = service;
                option.textContent = service;
                serviceSelect.appendChild(option);
            });
        }
        
        // Update pricing when service is selected
        if (serviceSelect && serviceFee && bookingTotal) {
            serviceSelect.addEventListener('change', function() {
                if (this.value) {
                    serviceFee.textContent = `R${provider.price}`;
                    bookingTotal.textContent = `R${provider.price + 50}`; // Adding travel fee
                } else {
                    serviceFee.textContent = 'R0';
                    bookingTotal.textContent = 'R0';
                }
            });
        }
        
        // Open modal
        openModal(modal);
    }
    
    // Format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    // Filter providers
    const filterForm = document.getElementById('filter-form');
    
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const location = document.getElementById('location').value.toLowerCase();
            const distance = parseInt(document.getElementById('distance').value) || Infinity;
            const serviceType = document.getElementById('service-type-filter').value;
            const priceMin = parseInt(document.getElementById('price-min').value) || 0;
            const priceMax = parseInt(document.getElementById('price-max').value) || Infinity;
            
            const filtered = providers.filter(provider => {
                const locationMatch = location ? provider.location.toLowerCase().includes(location) : true;
                const serviceMatch = serviceType === 'all' || provider.service === serviceType;
                const priceMatch = provider.price >= priceMin && provider.price <= priceMax;
                
                // Note: In a real app, we would calculate actual distance using geolocation
                const distanceMatch = true;
                
                return locationMatch && serviceMatch && priceMatch && distanceMatch;
            });
            
            displayProviders(filtered);
            
            // Add animation to the providers grid
            if (providersGrid) {
                providersGrid.style.opacity = '0';
                providersGrid.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    providersGrid.style.opacity = '1';
                    providersGrid.style.transform = 'translateY(0)';
                    providersGrid.style.transition = 'all 0.4s ease';
                }, 300);
            }
        });
    }
    
    // Search functionality
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase();
            
            if (!searchTerm) {
                displayProviders(providers);
                return;
            }
            
            const filtered = providers.filter(provider => {
                return provider.name.toLowerCase().includes(searchTerm) || 
                       provider.service.toLowerCase().includes(searchTerm) ||
                       provider.description.toLowerCase().includes(searchTerm) ||
                       provider.location.toLowerCase().includes(searchTerm);
            });
            
            displayProviders(filtered);
            
            // Add search animation
            searchInput.style.transform = 'scale(1.02)';
            setTimeout(() => {
                searchInput.style.transform = 'scale(1)';
            }, 200);
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    // Bottom Navigation Functionality
    function setupBottomNavigation() {
        const navLinks = document.querySelectorAll('.bottom-nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Get the target section from data-nav attribute
                const target = this.getAttribute('data-nav');
                
                // Simulate navigation (in a real app, this would load content)
                console.log(`Navigating to ${target}`);
                
                // Show appropriate content based on navigation
                switch(target) {
                    case 'home':
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        break;
                    case 'search':
                        const findProviderSection = document.getElementById('find-provider');
                        if (findProviderSection) {
                            findProviderSection.scrollIntoView({ behavior: 'smooth' });
                        }
                        break;
                    case 'bookings':
                        showBookingsSection();
                        break;
                    case 'favorites':
                        showFavoritesSection();
                        break;
                    case 'profile':
                        showProfileSection();
                        break;
                }
            });
        });
    }
    
    function showBookingsSection() {
        // In a real app, this would fetch and display bookings
        alert('Loading your bookings...');
        // You would typically:
        // 1. Make an API call to get user bookings
        // 2. Display them in a modal or dedicated section
        // 3. Handle any errors
    }
    
    function showFavoritesSection() {
        // In a real app, this would fetch and display favorites
        alert('Loading your favorite providers...');
    }
    
    function showProfileSection() {
        // In a real app, this would show the user profile
        alert('Loading your profile...');
    }
    
    // Provider Registration Functionality
    function setupProviderRegistration() {
        const becomeProviderBtn = document.getElementById('become-provider-btn');
        const providerModal = document.getElementById('provider-registration-modal');
        const providerForm = document.getElementById('provider-registration-form');
        const providerImages = document.getElementById('provider-reg-images');
        const providerPreview = document.getElementById('provider-reg-preview');
        
        // Open provider registration modal
        if (becomeProviderBtn && providerModal) {
            becomeProviderBtn.addEventListener('click', function() {
                // Check if user is logged in
                if (!isUserLoggedIn()) {
                    // If not logged in, open login modal first
                    const loginModal = document.getElementById('login-modal');
                    if (loginModal) {
                        openModal(loginModal);
                    }
                    alert('Please login or create an account to become a provider');
                    return;
                }
                
                openModal(providerModal);
            });
        }
        
        // Handle provider registration form submission
        if (providerForm) {
            providerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    name: this['provider-reg-name'].value,
                    email: this['provider-reg-email'].value,
                    phone: this['provider-reg-phone'].value,
                    service: this['provider-reg-service'].value,
                    experience: this['provider-reg-experience'].value,
                    bio: this['provider-reg-bio'].value,
                    address: this['provider-reg-address'].value,
                    certifications: this['provider-reg-certifications'].value,
                    terms: this['provider-reg-terms'].checked
                };
                
                // Validate form
                if (!formData.terms) {
                    alert('Please agree to the terms and conditions');
                    return;
                }
                
                // In a real app, you would:
                // 1. Validate all fields
                // 2. Upload images to a server
                // 3. Send the data to your backend
                // 4. Handle the response
                
                console.log('Provider registration data:', formData);
                alert('Provider application submitted successfully!');
                closeModal(providerModal);
                
                // Simulate successful registration
                simulateProviderRegistration(formData);
            });
        }
        
        // Handle image upload preview for provider registration
        if (providerImages && providerPreview) {
            providerImages.addEventListener('change', function(e) {
                providerPreview.innerHTML = '';
                
                for (let file of e.target.files) {
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        
                        reader.onload = function(event) {
                            const img = document.createElement('img');
                            img.src = event.target.result;
                            providerPreview.appendChild(img);
                        };
                        
                        reader.readAsDataURL(file);
                    }
                }
            });
        }
    }
    
    // User type selection in registration form
    function setupUserTypeSelection() {
        const userTypeRadios = document.querySelectorAll('input[name="user-type"]');
        const providerFields = document.getElementById('provider-fields');
        
        userTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (providerFields) {
                    if (this.value === 'provider') {
                        providerFields.style.display = 'block';
                    } else {
                        providerFields.style.display = 'none';
                    }
                }
            });
        });
    }
    
    // Login/Register Form Handling
    function setupAuthForms() {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = this['login-email'].value;
                const password = this['login-password'].value;
                
                // In a real app, you would:
                // 1. Validate inputs
                // 2. Send to authentication API
                // 3. Handle response (success/error)
                // 4. Store auth token
                // 5. Update UI
                
                console.log('Login attempt with:', email, password);
                simulateLogin(email);
            });
        }
        
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = {
                    name: this['register-name'].value,
                    email: this['register-email'].value,
                    phone: this['register-phone'].value,
                    password: this['register-password'].value,
                    userType: this['user-type'].value
                };
                
                if (formData.userType === 'provider') {
                    formData.service = this['provider-service'].value;
                    formData.experience = this['provider-experience'].value;
                    formData.bio = this['provider-bio'].value;
                }
                
                // In a real app, you would:
                // 1. Validate all fields
                // 2. Check password match
                // 3. Send to registration API
                // 4. Handle response
                
                console.log('Registration data:', formData);
                simulateRegistration(formData);
            });
        }
    }
    
    // Simulated functions for demo purposes
    function isUserLoggedIn() {
        // In a real app, this would check for an auth token
        return document.querySelector('.user-avatar') !== null;
    }
    
    function simulateLogin(email) {
        console.log('Simulating login for:', email);
        
        // Update UI to show logged in state
        const loginButton = document.getElementById('login-button');
        const logoutButton = document.getElementById('logout-button');
        const userAvatar = document.querySelector('.user-avatar');
        
        if (loginButton) loginButton.classList.add('hidden');
        if (logoutButton) logoutButton.classList.remove('hidden');
        if (userAvatar) userAvatar.style.display = 'block';
        
        // Close login modal
        const loginModal = document.getElementById('login-modal');
        if (loginModal) {
            closeModal(loginModal);
        }
        
        alert('Login successful! Welcome back.');
    }
    
    function simulateRegistration(formData) {
        console.log('Simulating registration for:', formData);
        
        // Update UI to show logged in state
        const loginButton = document.getElementById('login-button');
        const logoutButton = document.getElementById('logout-button');
        const userAvatar = document.querySelector('.user-avatar');
        
        if (loginButton) loginButton.classList.add('hidden');
        if (logoutButton) logoutButton.classList.remove('hidden');
        if (userAvatar) userAvatar.style.display = 'block';
        
        // Close login modal
        const loginModal = document.getElementById('login-modal');
        if (loginModal) {
            closeModal(loginModal);
        }
        
        // If registering as provider, open provider onboarding
        if (formData.userType === 'provider') {
            const providerModal = document.getElementById('provider-registration-modal');
            if (providerModal) {
                openModal(providerModal);
            }
            // Pre-fill some fields
            const regName = document.getElementById('provider-reg-name');
            const regEmail = document.getElementById('provider-reg-email');
            const regPhone = document.getElementById('provider-reg-phone');
            const regService = document.getElementById('provider-reg-service');
            
            if (regName) regName.value = formData.name;
            if (regEmail) regEmail.value = formData.email;
            if (regPhone) regPhone.value = formData.phone;
            if (regService && formData.service) {
                regService.value = formData.service;
            }
        }
        
        alert('Registration successful! Welcome to ServiceConnect Pro.');
    }
    
    function simulateProviderRegistration(formData) {
        console.log('Simulating provider registration:', formData);
        
        // In a real app, this would:
        // 1. Send data to backend
        // 2. Handle verification process
        // 3. Update user role to provider
        
        alert('Thank you for your application! We will review your information and get back to you soon.');
    }
    
    // Auth tabs
    const authTabs = document.querySelectorAll('.auth-tab');
    const authTabContents = document.querySelectorAll('.auth-tab-content');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            authTabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('data-tab') === tabName) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Initialize testimonials slider
    if (document.querySelector('.testimonials-slider')) {
        const testimonialSwiper = new Swiper('.testimonials-slider', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });
    }
    
    // Initialize with all providers
    displayProviders();
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate step cards sequentially
                if (entry.target.classList.contains('how-it-works-section')) {
                    const stepCards = entry.target.querySelectorAll('.step-card');
                    stepCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate__fadeInUp');
                        }, index * 200);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Initialize all functionality
    setupBottomNavigation();
    setupProviderRegistration();
    setupUserTypeSelection();
    setupAuthForms();
    
    // Demo: Simulate login after 3 seconds (for demo purposes)
    setTimeout(() => {
        // Uncomment to simulate auto-login for demo
        // loginButton.click();
    }, 3000);
});
