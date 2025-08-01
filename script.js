const showMenu=(toggleId,navId)=>{
    const toggle=document.getElementById(toggleId),
    nav=document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click',()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

const navLink=document.querySelectorAll('.nav__link')

function linkAction(){
    navLink.forEach(n=>n.classList.remove('active'))
    this.classList.add('active')

    const navMenu=document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}

navLink.forEach(n =>n.addEventListener('click',linkAction))

const sr=ScrollReveal({
    origin:'top',
    distance:'80px',
    duration:2000,
    reset:true
})

sr.reveal('.home__title',{})
sr.reveal('.button',{delay:100})
sr.reveal('.home__img',{delay:200})
sr.reveal('.home__social-icon',{interval:200})

sr.reveal('.about__img',{})
sr.reveal('.about__subtitle',{delay:100})
sr.reveal('.about__text',{delay:200})

sr.reveal('.skills__subtitle',{})
sr.reveal('.skills__text',{delay:100})
sr.reveal('.skills__data',{interval:100})
sr.reveal('.skills__img',{interval:200})

sr.reveal('.contact__input',{interval:200})

/*type-writer (if you want to use then remove name in data-text and para)*/
// var typed= new Typed(".home__title-color", {
//     strings:["SaiPraneeth"],
//     typeSpeed:100,
//     backspeed:100,
//     backDelay:1000,
//     loop: true
// })