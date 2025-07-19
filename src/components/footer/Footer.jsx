export default function Footer() {
    return (
        <footer className="homepage-footer">
            <div className="footer-container">
                <div className="footer-column branding">
                    <h3 className="footer-logo">🌿 FarmEasy</h3>
                    <p>Revolutionizing agriculture through innovative technology, simple solutions, and robust systems.</p>
                </div>
                <div className="footer-column">
                    <h4>Features</h4>
                    <ul>
                        <li><span>Crop Management</span></li>
                        <li><span>Livestock</span></li>
                        <li><span>Finance</span></li>
                        <li><span>Inventory</span></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Company</h4>
                    <ul>
                        <li><span>About Us</span></li>
                        <li><span>Contact</span></li>
                        <li><span>Support</span></li>
                        <li><span>Privacy</span></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Account</h4>
                    <ul>
                        <li><span>Login</span></li>
                        <li><span>Sign Up</span></li>
                        <li><span>Demo</span></li>
                        <li><span>Pricing</span></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Connect</h4>
                    <ul>
                        <li><span>Facebook</span></li>
                        <li><span>Twitter</span></li>
                        <li><span>LinkedIn</span></li>
                        <li><span>Instagram</span></li>
                    </ul>
                </div>
            </div>
            <hr className="footer-divider" />
            <div className="footer-bottom">
                <p>© 2025 FarmEasy. All rights reserved. Built with 💚 for farmers worldwide.</p>
            </div>
        </footer>
    );
}