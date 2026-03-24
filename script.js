gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', () => {

    // 1. Setup Initial Positions
    gsap.set("#project-one", { xPercent: 100 });     
    gsap.set("#project-two", { xPercent: -100 });    
    gsap.set("#project-three", { xPercent: 100 });   
    gsap.set(".p1-s2, .p1-s3, .p1-s4, .p2-s2, .p2-s3, .p3-s2, .p3-s3", { yPercent: 100 }); // NEW SLIDE added .p1-s4
    gsap.set("#footer", { yPercent: 100 });

    // 2. Create the Master Timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".pin-master",
            start: "top top",
            end: "+=2500%", 
            pin: true,
            scrub: 1.5,
            
            // THE FIX: Calculate time based on raw scrollbar position, ignoring scrub lag
            onUpdate: (self) => {
                // self.progress is a number between 0 and 1. 
                // Multiplying it by the total duration gives us the exact time mapped to the scrollbar.
                let scrollTime = self.progress * tl.duration(); 
                let activeLabel = "home"; 
                
                // Convert labels to a sorted array
                const sortedLabels = Object.keys(tl.labels).map(key => {
                    return { name: key, time: tl.labels[key] };
                }).sort((a, b) => a.time - b.time);
                
                // Compare the scrollbar's time to the labels
                for (let i = 0; i < sortedLabels.length; i++) {
                    if (scrollTime >= sortedLabels[i].time - 0.05) {
                        activeLabel = sortedLabels[i].name;
                    }
                }
                
                // Apply the active class
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === `#${activeLabel}`) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });

    const moveSpeed = 1; 
    const readTime = 0.8; 
    
    // HOME PAGE
    tl.addLabel("home") // Bookmark for Home
      .to({}, { duration: readTime }) 

    // PROJECT 1: MLB Analysis
      .to("#project-one", { xPercent: 0, ease: "power1.inOut", duration: moveSpeed }) 
      .addLabel("project-one") // MOVED: Now bookmarks the moment the slide is fully in view!
      .to({}, { duration: readTime }) 
      .to(".p1-s2", { yPercent: 0, ease: "power1.inOut", duration: moveSpeed })       
      .to({}, { duration: readTime }) 
      .to(".p1-s3", { yPercent: 0, ease: "power1.inOut", duration: moveSpeed })       
      .to({}, { duration: readTime }) 
      // NEW: Add these two lines for Slide 4!
      .to(".p1-s4", { yPercent: 0, ease: "power1.inOut", duration: moveSpeed })       
      .to({}, { duration: readTime })

    // PROJECT 2: Pantry App
      .to("#project-two", { xPercent: 0, ease: "power1.inOut", duration: moveSpeed }) 
      .addLabel("project-two") // MOVED
      .to({}, { duration: readTime }) 
      .to(".p2-s2", { yPercent: 0, ease: "power1.inOut", duration: moveSpeed })       
      .to({}, { duration: readTime }) 
      .to(".p2-s3", { yPercent: 0, ease: "power1.inOut", duration: moveSpeed })       
      .to({}, { duration: readTime }) 

    // PROJECT 3: Chef
      .to("#project-three", { xPercent: 0, ease: "power1.inOut", duration: moveSpeed }) 
      .addLabel("project-three") // MOVED
      .to({}, { duration: readTime }) 
      .to(".p3-s2", { yPercent: 0, ease: "power1.inOut", duration: moveSpeed })         
      .to({}, { duration: readTime }) 
      .to(".p3-s3", { yPercent: 0, ease: "power1.inOut", duration: moveSpeed })         
      .to({}, { duration: readTime }) 

    // FOOTER
      .to("#footer", { yPercent: 0, ease: "power1.inOut", duration: moveSpeed })     
      .addLabel("footer"); // NEW: Bookmarks the moment the About page is fully visible 


    // 4. Make the Navigation Links Work
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            const targetLabel = this.getAttribute('href').substring(1);
            
            gsap.to(window, {
                scrollTo: tl.scrollTrigger.labelToScroll(targetLabel),
                duration: 1.5, 
                ease: "power2.inOut"
            });
        });
    });

});