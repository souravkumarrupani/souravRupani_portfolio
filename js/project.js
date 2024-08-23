// Targeting elements
let btn_hambars = document.querySelector("#btn_hambars");
let mobile_manues = document.querySelectorAll("nav .mobile_manue ul li a");
let aside_open_btn = document.querySelector('.aside_open_btn button');
let aside_bar = document.querySelector(".aside_bar");
let project_setction_item = document.querySelectorAll(".project_box_section .item");
let aside_bar_manue_list = document.querySelectorAll(".aside_bar .manue_list button .text");

// GSAP animation timeline for the desktop_manue load
let time_line1 = gsap.timeline();
time_line1
    .from("#brand_name", { opacity: 0, y: -30, duration: 0.8, delay: 0.1 }, "a1")
    .from(".desktop_manue ul li", { opacity: 0, y: -30, stagger: 0.2, duration: 0.4 })
    .from(".desktop_manue .btn_video_coll", { opacity: 0, duration: 0.3 })
    .from(".hero_section :is(p,h1,h3), .btn_download, .btn_socalmedia, .gmail", { opacity: 0, y: -30, stagger: 0.3, duration: 0.9 }, "a1 = 1")
    .from(".hero_section .img_box", { opacity:0, duration: 0.9 }, "a1 = 2.5")
    .from(btn_hambars, { opacity:0, y: -20, duration: 0.9 }, "a1 = 0.6")
    .from(aside_open_btn,{opacity:0, y: -20, duration: 0.9, stagger: 0.5 }, "a1 = 1")
    .from(project_setction_item,{opacity:0, y: -20, duration: 0.9, stagger: 0.5 }, "a1 = 1.5");
// GSAP animation timeline for mobile menu
let time_line2 = gsap.timeline();
time_line2
    .to("nav .mobile_manue .manue_box", { right: 0, duration: 0.3 })
    .from("nav .mobile_manue ul li", { x: 20, opacity: 0, stagger: 0.2, duration: 0.2 })
    .from("nav .mobile_manue :is(.btn_video_coll, .socal_media_box)", { y: -20, opacity: 0, stagger: 0.2, duration: 0.2 })
    .pause();

// Toggle mobile menu on button click
btn_hambars.addEventListener("click", () => {
    if (btn_hambars.classList.contains("close")) {
        btn_hambars.innerHTML = '<i class="ri-menu-3-line"></i>';
        btn_hambars.classList.remove("close");
        time_line2.reverse();
    } else {
        btn_hambars.innerHTML = '<i class="ri-close-line" style="color:red;"></i>';
        btn_hambars.classList.add("close");
        time_line2.play();
    }
});

// Close mobile menu when a menu item is clicked
mobile_manues.forEach(item => {
    item.addEventListener("click", () => {
        btn_hambars.innerHTML = '<i class="ri-menu-3-line"></i>';
        btn_hambars.classList.remove("close");
        time_line2.reverse();
    });
});

// animation for open and close aside bar when user click on aside_btn
let time_line3 = gsap.timeline();
time_line3.to(aside_bar, {opacity: 1, left: 0, duration: 0.5,});
time_line3.pause();

aside_open_btn.addEventListener("click", ()=>{
    if(aside_open_btn.classList.contains("active")){
        time_line3.play();
        aside_open_btn.classList.replace("active", "deactive");
    }else{
        time_line3.reverse();
        aside_open_btn.classList.replace("deactive", "active");
    }
});


// Logic to apply filter when user click on aside filter section manue

for(let item of aside_bar_manue_list){ // Logic to iterate aside manue list
    item.parentElement.addEventListener("click", ()=>{
        remove_act_btn();
        item.parentElement.classList.add("active_btn");

        for(let item2 of project_setction_item){ // Ligic to iterate project section items
            let text = item2.querySelector("p").innerText.trim().toLowerCase();
            let find_text = item.innerText.trim().toLowerCase();

            if(find_text == "all"){
                item2.style.display = "block";   
            }else if(find_text == "javascript"){
                if(text.includes("js")){
                    item2.style.display = "block";
                }else{
                    item2.style.display = "none";
                }
            }
            else{
                if(text.includes(find_text)){
                    item2.style.display = "block";
                }else{
                    item2.style.display = "none";
                }
            }
            
        }
        
        // Logic to reverse the aside bar when user click on manue list btn
        time_line3.reverse();
        aside_open_btn.classList.replace("deactive", "active");
        
    });
}

// Logic to create a function to remove active class from manue button
function remove_act_btn(){
    for(let item of aside_bar_manue_list){
        item.parentElement.classList.remove("active_btn");
    }
}
