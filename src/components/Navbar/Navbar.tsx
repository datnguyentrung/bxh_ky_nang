import './Navbar.scss';
import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

interface NavbarProps {
    title?: string;
}

export default function Navbar({ title = "Hệ Thống Taekwondo Văn Quán" }: NavbarProps) {
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isRankingActive = location.pathname === '/bang-a' || location.pathname === '/bang-b';

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__logo">
                    <div className="navbar__logo-icon">
                        <img src="/taekwondo.jpg" alt="Taekwondo Logo" />
                    </div>
                    <span className="navbar__logo-text">Taekwondo</span>
                </div>

                <h1 className="navbar__title">
                    {title}
                </h1>

                <div className="navbar__actions">
                    <div className="navbar__nav">
                        <div
                            className="navbar__nav-dropdown"
                            ref={dropdownRef}
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <button
                                className={`navbar__nav-link navbar__nav-link--dropdown ${isRankingActive ? 'navbar__nav-link--active' : ''}`}
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <span>📊</span> Bảng xếp hạng
                                <span className={`navbar__dropdown-arrow ${showDropdown ? 'navbar__dropdown-arrow--open' : ''}`}>▼</span>
                            </button>

                            {showDropdown && (
                                <div className="navbar__dropdown-menu">
                                    <Link
                                        to="/bang-a"
                                        className={`navbar__dropdown-item ${location.pathname === '/bang-a' ? 'navbar__dropdown-item--active' : ''}`}
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        🥋 Bảng A - Đai Trắng Vàng (2011+)
                                    </Link>
                                    <Link
                                        to="/bang-b"
                                        className={`navbar__dropdown-item ${location.pathname === '/bang-b' ? 'navbar__dropdown-item--active' : ''}`}
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        🥋 Bảng B - Đai Xanh Đỏ & Đai Trắng Vàng (&lt;2011)
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            to="/skill-level-reference"
                            className={`navbar__nav-link ${location.pathname === '/skill-level-reference' ? 'navbar__nav-link--active' : ''}`}
                        >
                            <span>📋</span> Quy đổi trình độ
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}