function smoothScrollTo(elementId) {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add highlight effect after a short delay to ensure scrolling starts
        setTimeout(() => {
            targetElement.classList.add('highlight');
            
            // Remove highlight after 2 seconds
            setTimeout(() => {
                targetElement.classList.remove('highlight');
            }, 1000);
        }, 100);
    } else {
        console.log(`Element with ID "${elementId}" not found`);
    }
}

function toggleMobileView() {
    const body = document.body;
    const button = document.getElementById('mobile-toggle-btn');

    if (body.classList.contains('mobile-view')) {
        // Switch back to desktop view
        body.classList.remove('mobile-view');
        button.textContent = '📱 Switch to Mobile View';

        // Hide all open mobile conversations
        document.querySelectorAll('.mobile-conversation-content.show').forEach(el => {
            el.classList.remove('show');
            el.previousElementSibling.textContent = el.previousElementSibling.textContent.replace('Hide', 'Show');
        });
        
        // Collapse all conversations in the blog column when switching to desktop view
        document.querySelectorAll('.blog .conversation-content').forEach(contentElement => {
            const conversationId = contentElement.id.replace('conversation-content-', '');
            const toggleButton = document.querySelector(`[onclick="toggleConversation('${conversationId}')"]`);
            
            if (contentElement && toggleButton) {
                contentElement.classList.remove('expanded');
                contentElement.classList.add('collapsed');
                toggleButton.classList.remove('expanded');
                toggleButton.textContent = '◊';
                toggleButton.title = 'Show conversation';
            }
        });
    } else {
        // Switch to mobile view
        body.classList.add('mobile-view');
        button.textContent = '💻 Switch to Desktop View';
        
        // Expand all conversations in the blog column when switching to mobile view
        document.querySelectorAll('.blog .conversation-content').forEach(contentElement => {
            const conversationId = contentElement.id.replace('conversation-content-', '');
            const toggleButton = document.querySelector(`[onclick="toggleConversation('${conversationId}')"]`);
            
            if (contentElement && toggleButton) {
                contentElement.classList.remove('collapsed');
                contentElement.classList.add('expanded');
                toggleButton.classList.add('expanded');
                toggleButton.textContent = '◊';
                toggleButton.title = 'Hide conversation';
            }
        });
    }
}

function toggleMobileConversation(index) {
    const content = document.getElementById(`mobile-conversation-${index}`);
    const button = content.previousElementSibling;

    if (content.classList.contains('show')) {
        content.classList.remove('show');
        button.textContent = button.textContent.replace('Hide', 'Show');
    } else {
        // Hide all other open conversations first
        document.querySelectorAll('.mobile-conversation-content.show').forEach(el => {
            el.classList.remove('show');
            el.previousElementSibling.textContent = el.previousElementSibling.textContent.replace('Hide', 'Show');
        });

        // Show this conversation
        content.classList.add('show');
        button.textContent = button.textContent.replace('Show', 'Hide');
    }
}

function scrollToPrompt(promptId) {
    const chatContainer = document.querySelector('.chat');
    const targetElement = document.getElementById('prompt' + promptId);

    // Calculate the position of the target element relative to the chat container
    const containerRect = chatContainer.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    const scrollTop = chatContainer.scrollTop + (targetRect.top - containerRect.top);

    // Smooth scroll within the chat container
    chatContainer.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
    });
    // Add highlight effect after a short delay to ensure scrolling starts
    setTimeout(() => {
        targetElement.classList.add('highlight');

        // Remove highlight after 1 second
        setTimeout(() => {
            targetElement.classList.remove('highlight');
        }, 1000);
    }, 100);
}

function toggleConversation(conversationId) {
    const contentElement = document.getElementById(`conversation-content-${conversationId}`);
    const toggleButton = document.querySelector(`[onclick="toggleConversation('${conversationId}')"]`);
    
    if (contentElement && toggleButton) {
        // Check if it's currently visible (has expanded class) or hidden (no class or collapsed class)
        const isCurrentlyVisible = contentElement.classList.contains('expanded');
        
        if (isCurrentlyVisible) {
            // Hide the conversation
            contentElement.classList.remove('expanded');
            contentElement.classList.add('collapsed');
            toggleButton.classList.remove('expanded');
            toggleButton.textContent = '◊';
            toggleButton.title = 'Show conversation';
        } else {
            // Show the conversation (this handles both initial state and collapsed state)
            contentElement.classList.remove('collapsed');
            contentElement.classList.add('expanded');
            toggleButton.classList.add('expanded');
            toggleButton.textContent = '◊';
            toggleButton.title = 'Hide conversation';
        }
    }
}
