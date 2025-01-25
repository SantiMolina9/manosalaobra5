import './index.scss'

function Footer() {
    return (
        <footer className = 'footer'>
            <div className = 'footer-content'>
                <p className = 'footer-text'>
                    @{new Date().getFullYear()} Project App. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer;