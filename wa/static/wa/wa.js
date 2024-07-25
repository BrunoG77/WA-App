document.addEventListener("DOMContentLoaded", function() {
    // Sidebar responsive
    let btn = document.querySelector('#btn');
    let sidebar = document.querySelector('.sidebar');

    btn.onclick = function() {
        sidebar.classList.toggle('active')
    };
    

    // Icon not overlapping
    // Get height of elements
    let theme = document.querySelector('.theme-sidebar');
    
    let logout = document.querySelector('.logout-sidebar');
    
    // Set event listener for window resize
    window.addEventListener('resize', () => {
        checkThemeTop(theme, logout);
    });
    // Set event listener for device orientation change
    window.addEventListener('orientationchange', () => {
        checkThemeTop(theme, logout);
    });

    const dropdown = document.querySelector('.meso-days#first-one');

    const dropdown_cloned = dropdown.cloneNode(true);

    dropdown_cloned.removeAttribute('id');

    dropdown.remove()

    // Call button muscle
    button_muscle(dropdown_cloned)

    // call for delete icon
    delete_icon(dropdown_cloned)
  

    // If user clicks new day button, add a day
    const new_day = document.querySelector('.button-muscle#add-day');

    new_day.addEventListener('click', event => {
        add_day(dropdown_cloned)
    })


    // MODAL
    modalFunc()
})

// Check top of theme to know when to stop
function checkThemeTop(theme, logout) {
    let window_height = window.innerHeight;
    console.log('Window height:', window_height)

    if (window_height <= 530) {
        theme.style.bottom = 'auto';
        logout.style.bottom = 'auto';

        theme.style.top = '350px';
        logout.style.top = '400px'

    } else if (window_height > 530) {
        theme.style.top = 'auto';
        logout.style.top = 'auto';

        theme.style.bottom = '100px';
        logout.style.bottom = '50px';
    }
}

function add_day(meso_days) {
    console.log('INSIDE', meso_days)
    const new_day = document.querySelector('.new-day');
    const wrap = document.querySelector('.wrap');

    const meso_days_cloned = meso_days.cloneNode(true);
    const new_day_cloned = new_day.cloneNode(true);

    console.log('CLONE', meso_days_cloned)

    // If add day button surpasses window width, extend it
    var window_width = window.innerWidth;

    const new_day_location = new_day.getBoundingClientRect();
    const new_day_position = new_day_location.right;
    const new_day_width = new_day_location.right - new_day_location.left;

    if (new_day_position + new_day_width + 50 >= window_width) {
        console.log('EXTEND')
        window.resizeTo(window_width + new_day_width, window.innerHeight)
    } 

    // Remove add day button
    new_day.remove()

    // Append desired elements
    wrap.appendChild(meso_days_cloned);
    wrap.appendChild(new_day_cloned);

    // call modal function to set up new muscle buttons
    modalFunc()

    // call muscle button to set new button
    button_muscle(meso_days_cloned)

    // calls delete to set new delete icons
    delete_icon(meso_days_cloned)

    const new_day_btn = new_day_cloned.querySelector('.button-muscle#add-day')

    new_day_btn.addEventListener('click', event => {
        add_day(meso_days)
    })
}

function button_muscle(dropdown) {
    // Mesocycle Days DROPDOWN MENU
    console.log(dropdown)

    // Get inner elements from each dropdown
    const select = dropdown.querySelector(".select");

    const caret = dropdown.querySelector(".caret");

    const menu = dropdown.querySelector(".dropdown-menu");
    
    const options = dropdown.querySelectorAll(".dropdown-menu li");

    const selected = dropdown.querySelector(".selected");

    // TOGGLE
    select.addEventListener('click', () => {
        // when clicks
        select.classList.toggle('select-clicked');

        // add rotation
        caret.classList.toggle('caret-rotate');

        // open menu
        menu.classList.toggle('dropdown-menu-open');
    });

    // Loop through options
    options.forEach(option => {
        option.addEventListener('click', () => {
            // change selected inner text to clicked option inner text
            selected.innerText = option.innerText;

            // add animation
            selected.classList.add('text-fade-in');

            // remove animation
            setTimeout(() => {
                selected.classList.remove('text-fade-in');
            }, 300);

            // remove the clicked select styles from select
            select.classList.remove('select-clicked');

            // remove the rotate styles
            caret.classList.remove('caret-rotate');

            // remove open styles from menu
            menu.classList.remove('dropdown-menu-open')

            // remove active class from option
            options.forEach(option => {
                option.classList.remove('active');
            });

            // add active to the clicked one
            option.classList.add('active');
        });
    });

    // click outside to close
    window.addEventListener("click", e => {
        // get the dropdown size and position
        const size = dropdown.getBoundingClientRect();
        // if click is outside also close
        if (
            e.clientX < size.left ||
            e.clientX > size.right ||
            e.clientY < size.top ||
            e.clientY >size.bottom
        ) {
            // remove clicked select styles
            select.classList.remove('select-clicked');

            // remove rotate
            caret.classList.remove('caret-rotate');

            // remove open style
            menu.classList.remove('dropdown-menu-open');
        }
    });
}


function modalFunc() {

    const openModalButtons = document.querySelectorAll('[data-modal-target]')
    const closeModalButtons = document.querySelectorAll('[data-close-modal]')
    const overlay = document.getElementById('overlay')

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget)

            // Before opening modal, get which button User pressed
            let modal_btn = button;

            openModal(modal, modal_btn)
        })
    })

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            console.log(modal)
            closeModal(modal)
        })
    })

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal')
            console.log(modal)
            closeModal(modal)
        })
    })
    
}
// When user presses one of the muscle groups, Get the info, clone btn, Take new muscle btn out,
// append which muscle he pressed, append new muscle group btn and then close modal
function add_muscle_group(button, modal_btn, modal) {
    // Get data from the button
    const muscle = button.dataset.muscle;

    // Clone button
    const modal_div = modal_btn.parentNode;
    const add_muscle_cloned = modal_div.cloneNode(true);

    //get mesodays (parent.parent)
    var meso_days = modal_div.parentNode;
    
    // remove modal btn
    modal_div.remove();

    // add new choose the exercise div
    var new_div = document.createElement('div');
    new_div.className = "choose-exercise";

    var muscle_div = document.createElement('div');
    muscle_div.className = "muscle-chosen";

    muscle_div.innerHTML = `${muscle}`

    new_div.appendChild(muscle_div)

    // Get Delete meso trash icon
    const trash_icon = document.querySelector('.delete-meso');
    var trash_cloned = trash_icon.cloneNode(true);
    trash_cloned.setAttribute("id", "muscle-chosen");

    new_div.appendChild(trash_cloned)

    // add button
    var choose_muscle_div = document.createElement('div');
    choose_muscle_div.className = "choose-ex";

    var muscle_btn = document.createElement('button')
    muscle_btn.setAttribute('type', 'button')
    muscle_btn.setAttribute('class', 'choose-ex-btn')
    muscle_btn.innerHTML = 'Choose an exercise';


    choose_muscle_div.appendChild(muscle_btn)
    new_div.appendChild(choose_muscle_div)

    // append everything
    meso_days.appendChild(new_div)

    // Append add muscle button
    meso_days.appendChild(add_muscle_cloned)

    // Listen for button press on new buttons
    modalFunc()

    // close the modal
    closeModal(modal)

    // calls delete to set new delete icons
    delete_icon_muscle(new_div)
}


function openModal(modal, modal_btn) {
    console.log('OPEN MODAL');
    console.log(modal);
    if (modal==null) return

    console.log('OPEN MODAL NOT NULL');

    modal.classList.add('active')
    overlay.classList.add('active')

    // When user presses one of the buttons, call function for that
    const muscle_group_btn = document.querySelectorAll('.choose-muscle-btn')

    muscle_group_btn.forEach(button => {
        button.addEventListener('click', () => {
            console.log('BUTTON',button)
            console.log('Modal BTN',modal_btn)

            add_muscle_group(button, modal_btn, modal)
        })
    })

}

function closeModal(modal) {
    if (modal==null) return

    modal.classList.remove('active')
    overlay.classList.remove('active')
}

function delete_icon(meso_days) {
    const delete_meso = meso_days.querySelector('.delete-meso a i')

    const n = document.querySelectorAll('.meso-days')

    delete_meso.addEventListener('click', () => {
        if (n.length > 1) {
            meso_days.remove()
        } else {
            alert('Cannot delete it because it is the first one')
        }
    })
   
}

function delete_icon_muscle(new_div) {
    const delete_meso = new_div.querySelector('.delete-meso#muscle-chosen a i')

    delete_meso.addEventListener('click', () => {
        new_div.remove()
    })
   
}