// ============================================================
// DESIGN <-> BACKEND CONNECTOR
// ============================================================
// This file wires the static page to the PHP endpoints:
//   - get_furniture.php   -> loads the real furniture catalog
//   - get_design.php      -> loads items already saved for this design
//   - save_design_item.php-> saves/updates a placed item
//
// It does NOT touch or depend on design.js / threeview.js / test.js.
// Instead this file:
//   1. Adds real, DB-backed furniture cards into the furniture panel
//      (with a real data-furniture-id), next to your existing static ones.
//   2. Loads any furniture already saved for the current design and
//      fires a 'designItemsLoaded' event with the data.
//   3. Exposes window.InteriorCraft.saveFurnitureItem()/deleteFurnitureItem()
//      so whatever code eventually places furniture on the canvas can
//      call them to persist to the database.
//   4. Exposes window.designIdReady — a Promise that resolves once
//      window.CURRENT_DESIGN_ID is guaranteed to be set, so other
//      scripts (like share.js) can safely wait for it before using it.
// ============================================================

(function () {
    'use strict';

    // ---- 1. Figure out which design we're editing ----
    function getParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    window.CURRENT_DESIGN_ID = getParam('design_id');

    // If the app got here (e.g. from room-select.html) without ever
    // creating a design row, create one now so Share/Save have a real
    // design_id to work with, and reflect it in the URL.
    function ensureDesignId() {
        if (window.CURRENT_DESIGN_ID) {
            return Promise.resolve(window.CURRENT_DESIGN_ID);
        }

        console.warn('[DesignConnect] No ?design_id= in the URL — creating a new design row automatically.');

        return fetch('create_design.php', { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                if (data.status && data.design_id) {
                    window.CURRENT_DESIGN_ID = data.design_id;

                    const url = new URL(window.location.href);
                    url.searchParams.set('design_id', data.design_id);
                    window.history.replaceState({}, '', url);

                    console.log('[DesignConnect] Created new design_id =', data.design_id, 'and updated the URL.');
                    return data.design_id;
                } else {
                    console.error('[DesignConnect] create_design.php failed:', data);
                    return null;
                }
            })
            .catch(err => {
                console.error('[DesignConnect] Failed to create a new design:', err);
                return null;
            });
    }

    // ---- 2. Load the real furniture catalog from the database ----
    function loadFurnitureCatalog() {
        fetch('get_furniture.php')
            .then(res => res.json())
            .then(data => {
                if (!data.status) {
                    console.error('[DesignConnect] get_furniture.php returned an error:', data);
                    return;
                }
                window.dispatchEvent(new CustomEvent('furnitureCatalogLoaded', { detail: data.data }));
                renderFurnitureCatalog(data.data);
                console.log('[DesignConnect] Loaded', data.data.length, 'furniture items from the database.');
            })
            .catch(err => console.error('[DesignConnect] Failed to load furniture catalog:', err));
    }

    // Adds the DB furniture as real draggable cards inside the existing
    // "Furniture" panel, under a clearly labeled section, without
    // removing or rearranging anything you already have.
    function renderFurnitureCatalog(items) {
        const list = document.querySelector('#furniturePanel .furniture-list');
        if (!list) {
            console.warn('[DesignConnect] .furniture-list not found in #furniturePanel — skipping catalog render.');
            return;
        }

        if (document.getElementById('dbFurnitureSection')) return; // don't duplicate on re-init

        const heading = document.createElement('div');
        heading.className = 'category-title';
        heading.id = 'dbFurnitureSection';
        heading.innerHTML = '<span>From Database</span>';
        list.appendChild(heading);

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'furniture-item';
            card.draggable = true;
            card.dataset.furnitureId = item.id;
            card.dataset.type = item.name;

            card.innerHTML = `
                <div class="furniture-image">
                    <img src="${item.image}" alt="${item.name}"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';">
                    <i class="fa-solid fa-couch" style="display:none;"></i>
                </div>
                <span>${item.name}</span>
            `;

            list.appendChild(card);
        });
    }

    // ---- 3. Load items already saved for this design ----
    function loadSavedDesignItems() {
        if (!window.CURRENT_DESIGN_ID) return;

        fetch('get_design.php?design_id=' + encodeURIComponent(window.CURRENT_DESIGN_ID))
            .then(res => res.json())
            .then(data => {
                if (!data.status) {
                    console.error('[DesignConnect] get_design.php returned an error:', data);
                    return;
                }
                window.dispatchEvent(new CustomEvent('designItemsLoaded', { detail: data.items }));
                console.log('[DesignConnect] Loaded', data.items.length, 'saved item(s) for design', window.CURRENT_DESIGN_ID, data.items);
                // NOTE: actually drawing these on the 2D/3D canvas needs
                // to happen in design.js/threeview.js — listen for the
                // 'designItemsLoaded' event there and render e.detail.
            })
            .catch(err => console.error('[DesignConnect] Failed to load saved design items:', err));
    }

    // ---- 4. Save / delete a placed item (call these from your canvas code) ----
    function saveFurnitureItem(itemData) {
        const body = new URLSearchParams({
            design_id: window.CURRENT_DESIGN_ID || '',
            ...itemData
        });

        return fetch('save_design_item.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString()
        }).then(res => res.json());
    }

    function deleteFurnitureItem(id) {
        const body = new URLSearchParams({ action: 'delete', id });

        return fetch('save_design_item.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString()
        }).then(res => res.json());
    }

    window.InteriorCraft = { saveFurnitureItem, deleteFurnitureItem };

    // ---- Run ----
    // Expose the design-id promise globally so other scripts (like
    // share.js) can wait for it before they need CURRENT_DESIGN_ID.
    window.designIdReady = ensureDesignId();

    function init() {
        window.designIdReady.then(() => {
            loadFurnitureCatalog();
            loadSavedDesignItems();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();