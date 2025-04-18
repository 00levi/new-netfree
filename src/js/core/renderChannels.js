import { openModal } from '../components/modal.js';
import { updateCarouselButtons } from '../components/carousel.js';

export function renderChannels(channels, channelIndex, searchTerm, ITEMS_PER_PAGE, channelsGrid) {
    channelsGrid.innerHTML = '';
    const filteredChannels = channels.filter(channel => channel.title.toLowerCase().includes(searchTerm));
    const channelSlice = filteredChannels.slice(channelIndex, channelIndex + ITEMS_PER_PAGE);
    
    channelSlice.forEach(channel => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');
        videoCard.setAttribute('tabindex', '0');

        const link = document.createElement('a');
        link.href = '#';
        link.classList.add('video-link');
        link.addEventListener('click', (e) => {
            e.preventDefault();

            if (channel.video) {
                openModal({ type: 'video', src: channel.video }); // Si tiene video
            } else if (channel.iframe) {
                openModal({ type: 'iframe', src: channel.iframe }); // Si tiene iframe
            } else {
                console.warn('Canal sin fuente:', channel); // Si no tiene ninguna fuente
            }
        });

        const img = document.createElement('img');
        img.src = channel.image;
        img.alt = channel.title;

        const linksContainer = document.createElement('div');
        linksContainer.classList.add('links-container');

        const channelTitle = document.createElement('div');
        channelTitle.textContent = channel.title;
        channelTitle.classList.add('video-title');
        linksContainer.appendChild(channelTitle);

        link.appendChild(img);
        link.appendChild(linksContainer);
        videoCard.appendChild(link);
        channelsGrid.appendChild(videoCard);

        videoCard.addEventListener('mouseover', () => {
            videoCard.classList.add('expanded');
            linksContainer.style.display = 'block';
        });

        videoCard.addEventListener('mouseout', () => {
            videoCard.classList.remove('expanded');
            linksContainer.style.display = 'none';
        });
    });
    updateCarouselButtons('channels');
}
