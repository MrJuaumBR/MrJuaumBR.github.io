// const tabs = document.querySelectorAll('.tab');
// const contents = document.querySelectorAll('.content');

// tabs.forEach(tab => {
//     tab.addEventListener('click', () => {
//         tabs.forEach(t => t.classList.remove('active'));
//         contents.forEach(c => c.classList.remove('active'));

//         tab.classList.add('active');
//         document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
//     });
// });
const tabs = document.querySelectorAll('.tab-container .tabs .tab');
const contents = document.querySelectorAll('.tab-container .tab-content .content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
    });
});
