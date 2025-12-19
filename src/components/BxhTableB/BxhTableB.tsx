import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Bxh } from '../../types/bxh';
import { getPlayerStats } from '../../utils/sortUtils';
import './BxhTableB.scss';
import { loadBxh2Data } from '../../utils/bxh';
import BxhList from '../BxhKyNang/BxhList/BxhList';

interface BxhTableBProps {
    filterName: string;
    branch: string[];
}

export default function BxhTableB({ filterName, branch }: BxhTableBProps) {
    const navigate = useNavigate();
    const componentRef = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [players, setPlayers] = useState<Bxh[]>([]);

    useEffect(() => {
        const loadAllData = async () => {
            try {
                const bxh2Data = await loadBxh2Data();

                // Data trong CSV đã được lọc sẵn cho bảng B
                setPlayers(bxh2Data);

                await new Promise(resolve => setTimeout(resolve, 500));
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi load dữ liệu:', error);
                setError('Không thể tải dữ liệu bảng xếp hạng B');
                setLoading(false);
            }
        };

        loadAllData();
    }, []);

    // Auto scroll to component start in mobile after loading
    useEffect(() => {
        if (!loading && componentRef.current) {
            const isMobile = window.innerWidth <= 639;
            if (isMobile) {
                const timer = setTimeout(() => {
                    if (componentRef.current) {
                        const navbarHeight = 10;
                        const elementTop = componentRef.current.offsetTop;
                        const offsetPosition = elementTop - navbarHeight;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 300);

                return () => clearTimeout(timer);
            }
        }
    }, [loading]);

    const stats = getPlayerStats(players);

    if (loading) {
        return (
            <div className="bxh-table-b">
                <div className="bxh-table-b__header">
                    <h2 className="bxh-table-b__title">Bảng B - Đai Xanh Đỏ & Đai Trắng Vàng (Sinh trước 2011)</h2>
                </div>
                <div className="bxh-table-b__loading">
                    <div className="bxh-table-b__loading-spinner"></div>
                    <p className="bxh-table-b__loading-text">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bxh-table-b">
                <div className="bxh-table-b__header">
                    <h2 className="bxh-table-b__title">Bảng B - Đai Xanh Đỏ & Đai Trắng Vàng (Sinh trước 2011)</h2>
                </div>
                <div className="bxh-table-b__error">
                    <div className="bxh-table-b__error-icon">⚠️</div>
                    <h3 className="bxh-table-b__error-title">Lỗi tải dữ liệu</h3>
                    <p className="bxh-table-b__error-text">{error}</p>
                    <button
                        className="bxh-table-b__error-retry"
                        onClick={() => window.location.reload()}
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bxh-table-b" ref={componentRef}>
            <div className="bxh-table-b__header">
                <div className="bxh-table-b__title-section">
                    <h2 className="bxh-table-b__title">Bảng B - Đai Xanh Đỏ & Đai Trắng Vàng (Sinh trước 2011)</h2>
                    <button
                        className="bxh-table-b__reference-btn"
                        onClick={() => navigate('/skill-level-reference')}
                    >
                        <span className="bxh-table-b__reference-btn-icon">📋</span>
                        <span>Bảng quy đổi trình độ</span>
                        <span className="bxh-table-b__reference-btn-arrow">→</span>
                    </button>
                    <p className="bxh-table-b__subtitle">
                        Kết quả luyện tập và thi đấu của các vận động viên đai Xanh Đỏ và đai Trắng Vàng sinh trước 2011
                    </p>
                </div>

                <div className="bxh-table-b__stats-grid">
                    <div className="bxh-table-b__stat-card">
                        <span className="bxh-table-b__stat-value">{stats.total}</span>
                        <span className="bxh-table-b__stat-label">Lượt tham gia</span>
                    </div>
                    <div className="bxh-table-b__stat-card">
                        <span className="bxh-table-b__stat-value">{stats.maxAmount}</span>
                        <span className="bxh-table-b__stat-label">Số lần cao nhất</span>
                    </div>
                    <div className="bxh-table-b__stat-card">
                        <span className="bxh-table-b__stat-value">{stats.avgLevel}</span>
                        <span className="bxh-table-b__stat-label">Cấp độ trung bình</span>
                    </div>
                    <div className="bxh-table-b__stat-card">
                        <span className="bxh-table-b__stat-value">{stats.maxDuration} giây</span>
                        <span className="bxh-table-b__stat-label">Thời gian cao nhất</span>
                    </div>
                </div>
            </div>

            <div className="bxh-table-b__content">
                <BxhList
                    players={players
                        .filter(player => branch.length > 0 ? branch.includes(player.branch.toString()) : true)
                        .map((player, index) => ({ ...player, rank: index + 1 }))
                        .filter(player => filterName ? player.studentName.toLowerCase().includes(filterName.toLowerCase()) : true)
                    }
                    hasFilterName={!!filterName}
                />
            </div>

            <div className="bxh-table-b__footer">
                <p className="bxh-table-b__footer-text">
                    Cập nhật lần cuối: 19/12/2025
                </p>
            </div>
        </div>
    );
}
