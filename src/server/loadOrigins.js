const fs = require('fs');
const path = require('path');

function extractOriginsFromItems(items, keys = []) {
    return items.flatMap(item => {
        const origins = [];
        keys.forEach(key => {
            if (item[key]) {
                try {
                    origins.push(new URL(item[key]).origin);
                } catch (_) {}
            }
        });

        // Si tiene episodios
        if (item.episodes) {
            item.episodes.forEach(episode => {
                keys.forEach(key => {
                    if (episode[key]) {
                        try {
                            origins.push(new URL(episode[key]).origin);
                        } catch (_) {}
                    }
                });
            });
        }

        return origins;
    });
}

function loadAllowedOrigins() {
    const files = ['movies.json', 'series.json', 'control.json'];
    let origins = [];

    files.forEach(file => {
        try {
            const filePath = path.join(__dirname, '../../', file);
            const data = JSON.parse(fs.readFileSync(filePath));
            const items = Array.isArray(data) ? data : [data];
            origins.push(...extractOriginsFromItems(items, ['iframe', 'image']));
        } catch (error) {
            console.error(`Error al leer ${file}:`, error.message);
        }
    });

    return [...new Set(origins)];
}

module.exports = { loadAllowedOrigins };
