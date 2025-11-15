import './Navbar.scss';

interface NavbarProps {
    title?: string;
}

export default function Navbar({ title = "Bảng Xếp Hạng Kỹ Năng Đội 3" }: NavbarProps) {
    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__logo">
                    <div className="navbar__logo-icon">
                        🥋
                    </div>
                    <span className="navbar__logo-text">Taekwondo</span>
                </div>

                <h1 className="navbar__title">
                    {title}
                </h1>

                <div className="navbar__actions">
                    <button className="navbar__menu-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}