
(function () {
    const gridEls = document.querySelectorAll('.grid-highlight');
    if (!gridEls.length) return;

    gridEls.forEach((gridEl, idx) => {
        // Remove any existing streaks (idempotent)
        gridEl.querySelectorAll('.streak').forEach(n => n.remove());

        // Decide how many streaks per line: 2 or 3
        const count = 2 + Math.floor(Math.random() * 2); // 2 or 3

        // Base duration for this grid line (slight variation per line)
        const baseDur = 8 + Math.random() * 3; // 8..11 seconds

        // Interval between streaks as a fraction of duration
        // e.g., 0.25 means streaks start ~25% of the duration apart
        const intervalFraction = 0.25; // tweak to change spacing

        for (let s = 0; s < count; s++) {
            const streak = document.createElement('div');
            streak.className = 'streak';

            // small per-streak duration variance
            const durVal = baseDur + (Math.random() - 0.5) * 0.6; // +/-0.3s
            const dur = durVal.toFixed(2) + 's';

            // negative delay so it's mid-animation; staggered by intervalFraction
            const delayVal = - (s * intervalFraction * durVal) - Math.random() * 0.15;
            const delay = delayVal.toFixed(2) + 's';

            // small visual variance: slightly different opacity or width
            const opacity = (0.6 + Math.random() * 0.4).toFixed(2); // 0.6..1
            const streakWidth = (0.9 + Math.random() * 0.3).toFixed(2); // 0.9..1.2

            streak.style.setProperty('--streak-duration', dur);
            streak.style.setProperty('--streak-delay', delay);
            streak.style.opacity = opacity;
            streak.style.transform = `scaleX(${streakWidth})`;

            gridEl.appendChild(streak);
        }
    });
})();



const nameField = document.querySelector("#first_name")
const surnameField = document.querySelector("#last_name")
const emailField = document.querySelector("#email_address")
const phoneField = document.querySelector("#phone_number")
const msgField = document.querySelector("#message")
const submitBtn = document.querySelector("#submit")
const result = document.querySelector("#result")

// Configurate
const PUBLIC_KEY = "fdEdgNaefzzupSzAQ";
const PRIVATE_KEY = "7mzpMyTTVNJVpspysMKgQ";
const SERVICE_ID = "service_55w993o";
const TEMPLATE_ID = "template_frl2xm8"

const emailConfig = {
    publicKey: PUBLIC_KEY,
    privateKey: PRIVATE_KEY,
    serviceId: SERVICE_ID,
    templateId: TEMPLATE_ID
}


document.addEventListener("DOMContentLoaded", () => {
    const tools = document.querySelectorAll(".tools");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.5, // 20% of element visible before animation triggers
    });

    tools.forEach((tool, index) => {
        // Alternate sides — even indexes from left, odd from right
        if (index % 2 === 0) {
            tool.classList.add("from-left");

        }
        observer.observe(tool);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const toolBoxes = document.querySelectorAll(".tools");

    // Assign direction alternately (left or right)
    toolBoxes.forEach((box, index) => {
        box.classList.add(index % 2 === 0 ? "from-left" : "from-right");
    });

    // Intersection Observer for animation
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        },
        { threshold: 0.2 }
    );

    toolBoxes.forEach(box => observer.observe(box));
});



document.addEventListener("DOMContentLoaded", () => {
    const tools = document.querySelectorAll(".my_tool");

    // Assign direction alternately (left/right)
    tools.forEach((tool, index) => {
        tool.classList.add(index % 2 === 0 ? "from-left" : "from-right");
    });

    // Intersection Observer to trigger animation on scroll
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // animate only once
                }
            });
        },
        { threshold: 0.8 }
    );

    tools.forEach(tool => observer.observe(tool));
});
















//IIFE 
(function () {
    // PUBLIC KEY
    emailjs.init("zY1Eb2CLJrP3BpYec");
})();

//CHECKING VALIDATION FOR FIRSTNAME AND LASTNAME
const stringValidator = (str) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(str)
}
// CHECKING VALIDATION FOR PHONE NUMBER
const phoneValidator = (phn) => {
    const regex = /^\d{10}$|^\d{12}$/
    return regex.test(phn)
}
// CHECKING VALIDATION FOR EMAIL ID 
const emailValidator = (email) => {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}
// CHECKING VALIDATION FOR MESSAGE 
const msgValidator = (text) => {
    return text.length > 0
}

// CALLING THIS FUNCTION AFTER SUBMITING THE FORM 
const submitForm = () => {
    const emailValidation = emailValidator(email_address.value);
    const phnValidation = phoneValidator(phoneField.value);
    const firstNameValidation = stringValidator(nameField.value);
    const lastNameValidation = stringValidator(surnameField.value);
    const msgValidation = msgValidator(msgField.value);

    // CHECKING IF THE ALL INPUTS ARE FIELD BY USER OR NOT IF FILLED THEN SEND THE MAIL
    if (emailValidation && phnValidation && firstNameValidation && lastNameValidation && msgValidation) {
        let templateParams = {
            name: `${nameField.value} ${surnameField.value}`,
            msg: msgField.value,
            phone: phoneField.value,
            title: `A message from ${nameField.value} ${surnameField.value}`,
            email: email_address.value
        };

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerText = "Sending...";
        let loading = true;

        emailjs.send(emailConfig.serviceId, emailConfig.templateId, templateParams)
            .then(res => {

                submitBtn.disabled = false;
                submitBtn.innerText = "Sent Successfully";
                loading = false;
            })
            .catch(err => {

                submitBtn.disabled = false;
                submitBtn.innerText = "Try Again";
                loading = false;
            });
    }
    // IF ALL DETAILS ARE NOT FILLED THEN SHOW THIS MESSAGE
    else {


        result.innerText = "Please fill All details"
        setTimeout(() => {
            result.innerText = ""

        }, 2000);
    }

};

// ADDING EVENT LISTNER TO SUBMIT BUTTON
submitBtn.addEventListener("click", submitForm)



//setTimeout(() => {
//  message.style.display = 'none'; // Or use message.remove() to delete it entirely
//}, 5000);