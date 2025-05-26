AFRAME.registerComponent('drag-rotate-component',{
    schema: { speed: {default:1} },
    init: function () {
        this.isDragging = false;
        this.previousX = 0;

        this.el.sceneEl.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.previousX = e.clientX;
        });

        this.el.sceneEl.addEventListener('mouseup', () => {
            this.isDragging = false;
        });

        this.el.sceneEl.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            const deltaX = e.clientX - this.previousX;
            this.previousX = e.clientX;
            this.el.object3D.rotation.y += deltaX * 0.005 * this.data.speed;
        });

        // Touch support
        this.el.sceneEl.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.previousX = e.touches[0].clientX;
        });

        this.el.sceneEl.addEventListener('touchend', () => {
            this.isDragging = false;
        });

        this.el.sceneEl.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            const deltaX = e.touches[0].clientX - this.previousX;
            this.previousX = e.touches[0].clientX;
            this.el.object3D.rotation.y += deltaX * 0.005 * this.data.speed;
        });
    }
});

const camera = document.querySelector('[camera]');
let zoom = 1;
document.addEventListener('wheel', (e) => {
    zoom += e.deltaY * -0.001;
    zoom = Math.min(Math.max(zoom, 0.5), 2); // Clamp between 0.5 and 2
    camera.setAttribute('camera', 'zoom', zoom);
});

document.getElementById('quickbot').addEventListener('click', () => {
    document.querySelector('#quickbot').setAttribute('animation-mixer', 'clip: wave');
});