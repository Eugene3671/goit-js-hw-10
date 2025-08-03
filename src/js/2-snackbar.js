import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onCreatPromise);
function onCreatPromise(e) {
    e.preventDefault();
    const delayValue = +e.target.elements.delay.value;
    const selectedStateValue = e.target.elements.state.value;
    makePromise(selectedStateValue, delayValue)
        .then(delay =>
            iziToast.success({
                title: 'Successful',
                message: `✅ Fulfilled promise in ${delay}ms`,
            }))
        
        .catch(delay =>
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`
            }));
    e.target.reset();
}

function makePromise(shouldResolve, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve === "fulfilled") {
                resolve(delay)
            } else {
                reject(delay)
            }
        }, delay);
    })
}