import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <p>&copy; {new Date().getFullYear()} Pibtv. All rights reserved.</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center' as const,
        padding: '1rem 0',
        left: 0,
        bottom: 0,
        width: '100%',
    },
    container: {
        maxWidth: '100px',
        margin: '0 auto',
        padding: '0 1rem',
    },
};

export default Footer;