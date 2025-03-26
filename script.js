document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple animation for feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        // Add a class for the initial state
        card.classList.add('feature-animate');
        observer.observe(card);
    });

    // Add some CSS for the animation
    const style = document.createElement('style');
    style.textContent = `
        .feature-animate {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-animate.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // App mockup animations
    const appMockup = document.querySelector('.app-mockup');
    if (appMockup) {
        // Chart animation
        const chartLine = document.querySelector('.chart-line');
        if (chartLine) {
            // Create an animated effect for the chart
            animateChart(chartLine);

            // Recreate the animation when hovering the chart container
            const chartContainer = document.querySelector('.chart-container');
            chartContainer.addEventListener('mouseenter', () => {
                animateChart(chartLine);
            });
        }

        // Market indices animation - slide in one by one
        const indices = document.querySelectorAll('.market-index-card');
        indices.forEach((index, i) => {
            index.style.opacity = '0';
            index.style.transform = 'translateX(20px)';

            setTimeout(() => {
                index.style.transition = 'all 0.5s ease';
                index.style.opacity = '1';
                index.style.transform = 'translateX(0)';
            }, 300 + (i * 150));
        });

        // Add interactive effects to the filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Add interactive effects to the nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Add pulse effect to the insights section periodically
        const insights = document.querySelector('.mockup-insights');
        if (insights) {
            setInterval(() => {
                insights.classList.add('pulse');
                setTimeout(() => {
                    insights.classList.remove('pulse');
                }, 1000);
            }, 5000);

            // Add pulse animation style
            const style = document.createElement('style');
            style.textContent += `
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                    100% { transform: scale(1); }
                }
                .mockup-insights.pulse {
                    animation: pulse 1s ease;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Function to animate the chart with random data points
    function animateChart(chartElement) {
        // Generate a random chart path that looks like a stock chart
        const generateRandomPath = () => {
            const points = 12;
            const pointsArray = [];

            for (let i = 0; i < points; i++) {
                // Generate a relatively smooth curve with some randomness
                let y;
                if (i === 0) {
                    y = 70 + Math.random() * 20;
                } else {
                    // Use the previous point to make the curve smoother
                    const prevY = pointsArray[i - 1].y;
                    // Limit the change to make it smoother
                    const change = (Math.random() * 30) - 15;
                    y = Math.max(20, Math.min(90, prevY + change));
                }

                pointsArray.push({
                    x: (i / (points - 1)) * 100,
                    y: y
                });
            }

            // Always end slightly higher for a positive feel
            pointsArray[points - 1].y = Math.min(90, pointsArray[points - 2].y + (Math.random() * 10));

            // Create the clip path string
            let clipPathString = `polygon(0 100%`;

            pointsArray.forEach(point => {
                clipPathString += `, ${point.x}% ${point.y}%`;
            });

            clipPathString += `, 100% 100%)`;
            return clipPathString;
        };

        // Create the animation
        const startPath = chartElement.style.clipPath ||
            'polygon(0 100%, 5% 80%, 15% 85%, 25% 65%, 35% 70%, 45% 40%, 55% 50%, 65% 35%, 75% 55%, 85% 25%, 95% 35%, 100% 10%, 100% 100%)';
        const endPath = generateRandomPath();

        // Animate from current path to new random path
        chartElement.style.transition = 'clip-path 1.5s ease-in-out';
        chartElement.style.clipPath = endPath;
    }
}); 