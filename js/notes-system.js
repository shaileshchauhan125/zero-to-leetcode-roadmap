// Universal Lesson Navigation System
class LessonNavigation {
    constructor(currentLesson, phase) {
        this.currentLesson = currentLesson;
        this.phase = phase;
        this.setupBreadcrumbs();
        this.setupBackButton();
    }

    setupBreadcrumbs() {
        const breadcrumb = document.querySelector('.breadcrumb');
        if (breadcrumb) {
            breadcrumb.innerHTML = `
                <a href="../../dashboard.html">🏠 Dashboard</a>
                <span>→</span>
                <a href="../../dashboard.html#${this.phase}">${this.phase.toUpperCase()}</a>
                <span>→</span>
                <span>${this.currentLesson}</span>
            `;
        }
    }

    setupBackButton() {
        const backButtons = document.querySelectorAll('.back-button');
        backButtons.forEach(btn => {
            btn.onclick = () => {
                window.location.href = '../../dashboard.html';
            };
        });
    }
}

// Add this to each lesson file
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lesson navigation
    // Update these values for each lesson
    const currentLesson = 'Variables & Data Types'; // Update per lesson
    const phase = 'phase1'; // Update per phase
    
    window.lessonNav = new LessonNavigation(currentLesson, phase);
});

// Enhanced notes and bookmarking system
class NotesSystem {
    constructor() {
        this.notes = this.loadNotes();
        this.bookmarks = this.loadBookmarks();
        this.isNotesOpen = false;
    }

    loadNotes() {
        const saved = localStorage.getItem('codemaster_notes');
        return saved ? JSON.parse(saved) : [];
    }

    saveNotes() {
        localStorage.setItem('codemaster_notes', JSON.stringify(this.notes));
        this.updateNoteCount();
    }

    loadBookmarks() {
        const saved = localStorage.getItem('codemaster_bookmarks');
        return saved ? JSON.parse(saved) : [];
    }

    saveBookmarks() {
        localStorage.setItem('codemaster_bookmarks', JSON.stringify(this.bookmarks));
    }

    toggleNotes() {
        const panel = document.getElementById('notesPanel');
        this.isNotesOpen = !this.isNotesOpen;
        
        if (this.isNotesOpen) {
            panel.classList.add('open');
            this.renderNotes();
        } else {
            panel.classList.remove('open');
        }
    }

    addNote() {
        const editor = document.getElementById('noteEditor');
        const textarea = document.getElementById('noteTextarea');
        
        editor.style.display = 'block';
        textarea.focus();
        textarea.value = '';
    }

    saveNote() {
        const textarea = document.getElementById('noteTextarea');
        const content = textarea.value.trim();
        
        if (content) {
            const note = {
                id: Date.now(),
                content: content,
                lessonId: lessonEngine?.currentModule || 'unknown',
                sectionId: lessonEngine?.lessonData?.sections[lessonEngine.currentSection]?.id || 'unknown',
                timestamp: new Date().toISOString(),
                lessonTitle: lessonEngine?.lessonData?.title || 'Unknown Lesson'
            };
            
            this.notes.unshift(note);
            this.saveNotes();
            this.renderNotes();
            this.cancelNote();
        }
    }

    cancelNote() {
        const editor = document.getElementById('noteEditor');
        const textarea = document.getElementById('noteTextarea');
        
        editor.style.display = 'none';
        textarea.value = '';
    }

    deleteNote(noteId) {
        if (confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(note => note.id !== noteId);
            this.saveNotes();
            this.renderNotes();
        }
    }

    renderNotes() {
        const notesList = document.getElementById('notesList');
        
        if (this.notes.length === 0) {
            notesList.innerHTML = `
                <div style="text-align: center; color: #6b7280; padding: 2rem;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">📝</div>
                    <div>No notes yet</div>
                    <div style="font-size: 0.875rem; margin-top: 0.5rem;">
                        Click "Add Note" to start taking notes
                    </div>
                </div>
            `;
            return;
        }

        notesList.innerHTML = this.notes.map(note => `
            <div class="note-item" data-note-id="${note.id}">
                <div class="note-content">${this.formatNoteContent(note.content)}</div>
                <div class="note-meta">
                    <div class="note-lesson">${note.lessonTitle}</div>
                    <div class="note-timestamp">${this.formatTimestamp(note.timestamp)}</div>
                </div>
                <div class="note-actions">
                    <button onclick="notesSystem.editNote(${note.id})" class="note-action-btn" title="Edit">✏️</button>
                    <button onclick="notesSystem.deleteNote(${note.id})" class="note-action-btn" title="Delete">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    formatNoteContent(content) {
        // Convert markdown-like formatting
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString();
    }

    updateNoteCount() {
        const countEl = document.getElementById('noteCount');
        if (countEl) {
            countEl.textContent = this.notes.length;
        }
    }

    // Bookmarking functionality
    toggleBookmarks() {
        const currentLesson = {
            id: lessonEngine?.currentModule || 'unknown',
            title: lessonEngine?.lessonData?.title || 'Unknown Lesson',
            sectionId: lessonEngine?.lessonData?.sections[lessonEngine.currentSection]?.id || 'unknown',
            sectionTitle: lessonEngine?.lessonData?.sections[lessonEngine.currentSection]?.title || 'Unknown Section',
            timestamp: new Date().toISOString()
        };

        const existingIndex = this.bookmarks.findIndex(
            bookmark => bookmark.id === currentLesson.id && bookmark.sectionId === currentLesson.sectionId
        );

        if (existingIndex >= 0) {
            // Remove bookmark
            this.bookmarks.splice(existingIndex, 1);
            this.showToast('Bookmark removed', 'info');
        } else {
            // Add bookmark
            this.bookmarks.unshift(currentLesson);
            this.showToast('Lesson bookmarked!', 'success');
        }

        this.saveBookmarks();
        this.updateBookmarkIcon();
    }

    updateBookmarkIcon() {
        const currentLesson = lessonEngine?.currentModule || 'unknown';
        const currentSection = lessonEngine?.lessonData?.sections[lessonEngine.currentSection]?.id || 'unknown';
        
        const isBookmarked = this.bookmarks.some(
            bookmark => bookmark.id === currentLesson && bookmark.sectionId === currentSection
        );

        const bookmarkBtn = document.querySelector('.tool-btn[onclick="toggleBookmarks()"]');
        if (bookmarkBtn) {
            bookmarkBtn.innerHTML = isBookmarked ? '🔖 Bookmarked' : '🔖 Bookmark';
        }
    }

    showToast(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#6366f1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }

    exportProgress() {
        const progress = {
            notes: this.notes,
            bookmarks: this.bookmarks,
            lessonProgress: lessonEngine?.userProgress || {},
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(progress, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `codemaster-progress-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showToast('Progress exported!', 'success');
    }
}

// Global functions and initialization
let notesSystem;

document.addEventListener('DOMContentLoaded', () => {
    notesSystem = new NotesSystem();
    
    // Update UI elements
    setTimeout(() => {
        notesSystem.updateNoteCount();
        notesSystem.updateBookmarkIcon();
    }, 500);
});

function toggleNotes() {
    notesSystem.toggleNotes();
}

function addNote() {
    notesSystem.addNote();
}

function saveNote() {
    notesSystem.saveNote();
}

function cancelNote() {
    notesSystem.cancelNote();
}

function toggleBookmarks() {
    notesSystem.toggleBookmarks();
}

function exportProgress() {
    notesSystem.exportProgress();
}
