const DISCORD_USER_ID = '1462496241693753558';

const PROFILE_LINKS = {
    discord: 'https://discord.com/users/1462496241693753558',
    spotify: 'https://open.spotify.com/intl-tr/artist/2FIVkPwm0NzIkR0qzAMqtW?si=uOeTW2BxQpaGRi8yYlDI8A',
    instagram: '',
    github: 'https://github.com/Henox77'
};

let spotifyTrackUrl = null;
let spotifyProgressInterval = null;
let spotifyTimestamps = null;

function initSpotifyClick() {
    const player = document.querySelector('.spotify-music-player');
    if (!player) return;
    player.style.cursor = 'pointer';
    player.addEventListener('click', () => {
        const url = spotifyTrackUrl || PROFILE_LINKS.spotify;
        window.open(url, '_blank', 'noopener,noreferrer');
    });
}

function clearSpotifyProgress() {
    if (spotifyProgressInterval) {
        clearInterval(spotifyProgressInterval);
        spotifyProgressInterval = null;
    }
    spotifyTimestamps = null;
    const progressBar = document.getElementById('track-progress-bar');
    if (progressBar) progressBar.style.width = '0%';
}

function startSpotifyProgress(timestamps) {
    clearSpotifyProgress();
    if (!timestamps || !timestamps.start || !timestamps.end) return;
    spotifyTimestamps = { start: Number(timestamps.start), end: Number(timestamps.end) };
    const progressBar = document.getElementById('track-progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    if (!progressBar) return;

    const formatTime = (ms) => {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000) / 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const update = () => {
        if (!spotifyTimestamps) return;
        const duration = spotifyTimestamps.end - spotifyTimestamps.start;
        if (!Number.isFinite(duration) || duration <= 0) return;

        const now = Date.now();
        const elapsed = Math.min(duration, Math.max(0, now - spotifyTimestamps.start));
        const ratio = elapsed / duration;

        progressBar.style.width = `${(ratio * 100).toFixed(2)}%`;
        if (currentTimeEl) currentTimeEl.textContent = formatTime(elapsed);
        if (totalTimeEl) totalTimeEl.textContent = formatTime(duration);
    };
    update();
    spotifyProgressInterval = setInterval(update, 500);
}

let lanyardData = null;
async function fetchDiscordData() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
        const data = await response.json();
        if (data.success && data.data) {
            lanyardData = data.data;
            updateDiscordUI(data.data);
            return data.data;
        }
        return null;
    } catch (error) {
        return null;
    }
}

function updateDiscordUI(data) {
    updateAvatar(data.discord_user);
    updateUsername(data.discord_user);
    updateStatus(data.discord_status);
    updateCustomStatus(data.activities);
    updateBadges(data.discord_user);
    updateSpotifyActivity(data.activities);
    updateActivities(data.activities);
    updateSpotifyLink(data.activities);
}

function updateActivities(activities) {
    const list = document.getElementById('activities-list');
    if (!list) return;
    const generalActivities = activities?.filter(a => a.type !== 4 && a.name !== 'Spotify') || [];
    if (generalActivities.length === 0) {
        list.style.display = 'none';
        return;
    }
    list.style.display = 'flex';
    list.innerHTML = '';
    generalActivities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        let iconHtml = '';
        if (activity.assets && activity.assets.large_image) {
            let iconUrl;
            if (activity.assets.large_image.startsWith('mp:external/')) {
                iconUrl = `https://images-ext-1.discordapp.net/external/${activity.assets.large_image.replace('mp:external/', '')}`;
            } else {
                iconUrl = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
            }
            iconHtml = `<div class="activity-icon-container"><img src="${iconUrl}" class="activity-icon" onerror="this.parentElement.innerHTML='<i class=\'fas fa-gamepad\'></i>'"></div>`;
        } else {
            iconHtml = `<div class="activity-icon-container"><i class="fas fa-gamepad" style="font-size: 14px; color: rgba(255,255,255,0.2)"></i></div>`;
        }
        item.innerHTML = `
            ${iconHtml}
            <div class="activity-info">
                <div class="activity-name">${activity.name}</div>
                <div class="activity-details">${activity.details || ''}</div>
                <div class="activity-state">${activity.state || ''}</div>
            </div>
        `;
        list.appendChild(item);
    });
}

function updateAvatar(discordUser) {
  //  const avatarImg = document.getElementById('discord-avatar');
    if (!discordUser || !avatarImg) return;
    let avatarUrl;
    if (discordUser.avatar) {
        const extension = discordUser.avatar.startsWith('a_') ? 'gif' : 'png';
        avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${extension}?size=256`;
    } else {
        const defaultAvatar = parseInt(discordUser.discriminator) % 5;
        avatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultAvatar}.png`;
    }
    avatarImg.src = avatarUrl;
}

function updateUsername(discordUser) {
    const usernameText = document.getElementById('username-text');
    const discriminatorSpan = document.getElementById('discord-discriminator');
    if (!discordUser) return;
    if (usernameText) usernameText.textContent = discordUser.username;
    if (discriminatorSpan) {
        if (discordUser.discriminator && discordUser.discriminator !== '0') {
            discriminatorSpan.textContent = `#${discordUser.discriminator}`;
            discriminatorSpan.style.display = 'inline';
        } else {
            discriminatorSpan.style.display = 'none';
        }
    }
}

function updateStatus(status) {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    if (!status) status = 'offline';
    const statusLabels = { online: 'ONLINE', idle: 'IDLE', dnd: 'DO NOT DISTURB', offline: 'OFFLINE' };
    if (statusDot) statusDot.className = `status-dot ${status}`;
    if (statusText) statusText.textContent = statusLabels[status] || 'OFFLINE';
}

function updateCustomStatus(activities) {
    const customStatusText = document.getElementById('custom-status-text');
    const customStatusCard = document.getElementById('custom-status-card');
    if (!customStatusText || !customStatusCard) return;
    const customStatus = activities?.find(activity => activity.type === 4);
    if (customStatus && customStatus.state) {
        customStatusText.textContent = customStatus.state;
        customStatusCard.classList.remove('hidden');
    } else {
        customStatusCard.classList.add('hidden');
    }
}

function updateBadges(discordUser) {
    const badgesContainer = document.getElementById('badges-container');
    if (!badgesContainer) return;
    badgesContainer.innerHTML = '';
    const badges = [{ url: "https://discordapp.com/assets/45cd06af582dcd3c6b79370b4e3630de.svg", name: "Active Developer" }];
    badges.forEach(badge => {
        const img = document.createElement('img');
        img.src = badge.url;
        img.className = 'badge-icon-img';
        img.alt = badge.name;
        const tooltip = document.getElementById('custom-tooltip');
        img.addEventListener('mouseenter', () => {
            if (tooltip) {
                tooltip.textContent = badge.name;
                tooltip.classList.add('visible');
            }
        });
        img.addEventListener('mousemove', (e) => {
            if (tooltip) {
                tooltip.style.left = `${e.clientX + 10}px`;
                tooltip.style.top = `${e.clientY - 30}px`;
            }
        });
        img.addEventListener('mouseleave', () => {
            if (tooltip) tooltip.classList.remove('visible');
        });
        badgesContainer.appendChild(img);
    });
}

function updateSpotifyActivity(activities) {
    const spotify = activities?.find(activity => activity.name === 'Spotify');
    const albumCover = document.getElementById('album-cover');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const spotifyPlayer = document.querySelector('.spotify-music-player');
    if (spotify && spotify.assets && spotify.details && spotify.state) {
        spotifyTrackUrl = spotify.sync_id ? `https://open.spotify.com/track/${spotify.sync_id}` : PROFILE_LINKS.spotify;
        if (spotify.assets.large_image) {
            if (albumCover) {
                let imageId = spotify.assets.large_image;
                let albumCoverUrl;
                if (imageId.startsWith('spotify:')) {
                    albumCoverUrl = `https://i.scdn.co/image/${imageId.replace('spotify:', '')}`;
                } else if (imageId.startsWith('http')) {
                    albumCoverUrl = imageId;
                } else {
                    albumCoverUrl = `https://cdn.discordapp.com/app-assets/${spotify.application_id}/${imageId}.png`;
                }
                albumCover.src = albumCoverUrl;
                albumCover.classList.remove('hidden');
            }
        }
        if (songTitle) songTitle.textContent = spotify.details;
        if (songArtist) songArtist.textContent = spotify.state;
        if (spotifyPlayer) spotifyPlayer.classList.remove('inactive');
        startSpotifyProgress(spotify.timestamps);
    } else {
        spotifyTrackUrl = null;
        if (spotifyPlayer) spotifyPlayer.classList.add('inactive');
        clearSpotifyProgress();
    }
}

function updateSpotifyLink(activities) {
    const spotifyLink = document.getElementById('spotify-link');
    if (!spotifyLink) return;
    spotifyLink.href = PROFILE_LINKS.spotify;
}

function initProfileLinks() {
    const discordLink = document.getElementById('discord-link');
    const instagramLink = document.getElementById('instagram-link');
    const githubLink = document.getElementById('github-link');
    if (discordLink) discordLink.href = PROFILE_LINKS.discord;
    if (instagramLink) instagramLink.href = PROFILE_LINKS.instagram;
    if (githubLink) githubLink.href = PROFILE_LINKS.github;
}

async function init() {
    initIntroOverlay();
    initProfileLinks();
    initGsapAnimations();
    initTilt();
    initSpotifyClick();
    await fetchDiscordData();
    setInterval(() => { fetchDiscordData(); }, 10000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function initIntroOverlay() {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;
    let dismissed = false;
    const dismiss = () => {
        if (dismissed) return;
        dismissed = true;
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        revealProfile();
        window.setTimeout(() => { overlay.remove(); }, 1000);
    };
    overlay.addEventListener('click', dismiss);
}

function initGsapAnimations() {
    gsap.set('.avatar-section, .content-section, .location-box', { opacity: 0, y: 20 });
}

function initTilt() {
    const card = document.querySelector('.profile');
    if (!card) return;
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth) - 0.5;
        const yPos = (clientY / innerHeight) - 0.5;
        gsap.to(card, { duration: 0.5, rotationY: xPos * 25, rotationX: -yPos * 25, ease: 'power2.out', transformPerspective: 1200, transformOrigin: 'center' });
    });
}

function revealProfile() {
    gsap.to('.profile', { duration: 1.5, opacity: 1, scale: 1, ease: 'expo.out' });
    gsap.to('.avatar-section, .content-section, .location-box', { duration: 1, opacity: 1, y: 0, stagger: 0.2, ease: 'power4.out', delay: 0.3 });
    gsap.to('.floating-player', { duration: 1, opacity: 1, ease: 'power2.out', delay: 0.8 });
}
