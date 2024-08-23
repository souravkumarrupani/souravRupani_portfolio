// Targeting elements
let btn_hambars = document.querySelector("#btn_hambars");
let mobile_manues = document.querySelectorAll("nav .mobile_manue ul li a");
let swife_left_btn = document.querySelector(".project_section .button_box #right_arrow");
let contact_section_form = document.querySelector("#contact_section form");
let error_message = document.querySelectorAll("#contact_section form .error_message");
let input_feilds = contact_section_form.querySelectorAll(".input_box :is(input, textarea)");
let spainner = contact_section_form.querySelector("#submit_btn .spinner");

// Logic to apply validation on contact form when user submit contact form if everything is ok then submit contact form on google sheet
contact_section_form.addEventListener("submit", (event) =>{
    event.preventDefault();
    let greet = 1; // initalize a greet variable to check all validation is applied or not if all validation is successfull according to developert then update greetb= 1 else greet = 0    
    for(let items of input_feilds){

        // Logic to check input feild is blank if input feild is blank then show error message
        if(items.value != ""){
            items.parentElement.querySelector(".error_message").style.display = "none";

            // Logic to apply maxlength validation
            if(items.value.length <= 300){
                items.parentElement.querySelector(".error_message").style.display = "none";    
                greet = 1;
            }else{
                items.parentElement.querySelector(".error_message").style.display = "block";    
                items.parentElement.querySelector(".error_message").innerHTML = "Max length 300 cherectors !";    
                break;
                greet = 0;
            }
            
        }else{
            items.parentElement.querySelector(".error_message").style.display = "block";
            items.parentElement.querySelector(".error_message").innerHTML = "Please Fill the all input box !";
            greet = 0;
            break;
        }
    }

    // Logic to check greet value is one or not if greet value is one then macke a ajax request to save form data into excel
    if(greet === 1){
        // Create a FormData object from the form
        let form_data = new FormData(contact_section_form);
        let date = new Date();
        let current_date = date.toLocaleDateString()+" "+date.toLocaleTimeString();
        spainner.style.display = "block";
        contact_section_form.querySelector("#submit_btn span").innerHTML = "Wait...";
        // Use the append method to add or update a field
        form_data.append("date_time", current_date);
        
        async function fetchData(params) {
            let responce = await fetch("https://script.google.com/macros/s/AKfycby03AltZjhCj53KOKIiHcGCd7pGCCvS_0JY4EnP8LzqDZxsfqBdk75pJcbooyKKRd5K/exec", 
                {
                    method: "post",
                    body: form_data
                }
            );
            let result = await responce.text();

            return result;
        }

        fetchData().then(result =>{
            
            if(result.includes("Success full")){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Data submited successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
                
                contact_section_form.querySelector("#submit_btn span").innerHTML = "Send";
                spainner.style.display = "none";
                contact_section_form.reset();
            }
        }).catch(error=>{
            console.log(error);
        });
    }

        
})

// Logic to hide error message when user focous on input box
for(let items of input_feilds){
    items.addEventListener("focus", ()=>{
        items.parentElement.querySelector(".error_message").style.display = "none";
    });
}

// GSAP animation timeline for the initial load
let timg_line1 = gsap.timeline();
timg_line1
    .from("#brand_name", { opacity: 0, y: -30, duration: 0.8, delay: 0.1 }, "a1")
    .from(".desktop_manue ul li", { opacity: 0, y: -30, stagger: 0.2, duration: 0.4 })
    .from(".desktop_manue .btn_video_coll", { opacity: 0, duration: 0.3 })
    .from(".hero_section :is(p,h1,h3), .btn_download, .btn_socalmedia, .gmail", { opacity: 0, y: -30, stagger: 0.3, duration: 0.9 }, "a1 = 1")
    .from(".hero_section .img_box", { opacity:0, duration: 0.9 }, "a1 = 2.5")
    .from(btn_hambars, { opacity:0, y: -20, duration: 0.9 }, "a1 = 0.6");

// GSAP animation timeline for mobile menu
let timg_line2 = gsap.timeline();
timg_line2
    .to("nav .mobile_manue .manue_box", { right: 0, duration: 0.3 })
    .from("nav .mobile_manue ul li", { x: 20, opacity: 0, stagger: 0.2, duration: 0.2 })
    .from("nav .mobile_manue :is(.btn_video_coll, .socal_media_box)", { y: -20, opacity: 0, stagger: 0.2, duration: 0.2 })
    .pause();

// Toggle mobile menu on button click
btn_hambars.addEventListener("click", () => {
    if (btn_hambars.classList.contains("close")) {
        btn_hambars.innerHTML = '<i class="ri-menu-3-line"></i>';
        btn_hambars.classList.remove("close");
        timg_line2.reverse();
    } else {
        btn_hambars.innerHTML = '<i class="ri-close-line" style="color:red;"></i>';
        btn_hambars.classList.add("close");
        timg_line2.play();
    }
});

// Close mobile menu when a menu item is clicked
mobile_manues.forEach(item => {
    item.addEventListener("click", () => {
        btn_hambars.innerHTML = '<i class="ri-menu-3-line"></i>';
        btn_hambars.classList.remove("close");
        timg_line2.reverse();

    });
});

if(window.innerWidth >= 993){
    gsap.from(".about_section p:not(p:first-child), .about_section h2", {
        opacity: 0,
        x: -50,
        stagger: 0.4,
        scrollTrigger: {
            trigger: ".about_section", 
            scroller: "body", 
            start: "50%, 55%",
            end: "190%, 50%", 
            scrub: 5,
            pin: true,
        }
    });
    
    gsap.to(".about_section .right .img_box .box", {
        right: "200%",
        scrollTrigger:{
            trigger: ".about_section",
            scroller: "body",
            start: "50%, 55%",
            end: "190%, 50%", 
            repeat: -100,
            yoyo: true,
            scrub: 5,
        }
    });
}
















