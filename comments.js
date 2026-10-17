document.addEventListener('DOMContentLoaded', function () {

    // Get elements
    const commentToggle = document.getElementById('commentToggle');
    const commentsOverlay = document.getElementById('commentsOverlay');
    const closeComments = document.getElementById('closeComments');
    const sendBtn = document.getElementById('sendCommentBtn');
    const newInput = document.getElementById('newCommentInput');
    const commentsList = document.getElementById('commentsList');

    // --- Open panel ---
    function openComments() {
        commentsOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scroll
    }

    // --- Close panel ---
    function closeCommentsPanel() {
        commentsOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Toggle open/close
    commentToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        if (commentsOverlay.classList.contains('active')) {
            closeCommentsPanel();
        } else {
            openComments();
        }
    });

    // Close button
    closeComments.addEventListener('click', closeCommentsPanel);

    // Click on overlay background (outside panel) to close
    commentsOverlay.addEventListener('click', function (e) {
        if (e.target === commentsOverlay) {
            closeCommentsPanel();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && commentsOverlay.classList.contains('active')) {
            closeCommentsPanel();
        }
    });

    // --- Add new comment (demo) ---
    function addNewComment(text) {
        if (!text.trim()) return;

        const now = new Date();
        const timeStr = 'Just now'; // you can format real time if you want

        const newComment = document.createElement('div');
        newComment.className = 'comment-item';
        newComment.innerHTML = `
            <div class="comment-avatar" style="background:#00b894;">
                <i class="fas fa-user"></i>
            </div>
            <div class="comment-body">
                <div class="comment-meta">
                    <span class="comment-user">You</span>
                    <span class="comment-time">${timeStr}</span>
                </div>
                <div class="comment-text">${text}</div>
            </div>
        `;

        commentsList.prepend(newComment); // naya comment top par aayega
        newInput.value = '';
    }

    sendBtn.addEventListener('click', function () {
        addNewComment(newInput.value);
    });

    newInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNewComment(newInput.value);
        }
    });

    // --- Filter dropdown (just a demo alert) ---
    document.getElementById('commentFilter').addEventListener('change', function (e) {
        const val = e.target.value;
        // Yahan aap real filtering logic likh sakte hain
        console.log('Filter changed to:', val);
        // For demo, we just show a small alert (optional)
        // alert('Filter: ' + val);
    });

});