import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Bxh } from '../../types/bxh';
import { getPlayerStats } from '../../utils/sortUtils';
import './BxhTableA.scss';
import { loadBxhData } from '../../utils/bxh';
import BxhList from '../BxhKyNang/BxhList/BxhList';

interface BxhTableAProps {
    filterName: string;
    branch: string[];
}

export default function BxhTableA({ filterName, branch }: BxhTableAProps) {
    const navigate = useNavigate();
    const componentRef = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [players, setPlayers] = useState<Bxh[]>([]);

    useEffect(() => {
        const loadAllData = async () => {
            try {
                const bxhData = await loadBxhData();

                // Data trong CSV đã được lọc sẵn cho bảng A
                setPlayers(bxhData);

                await new Promise(resolve => setTimeout(resolve, 500));
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi load dữ liệu:', error);
                setError('Không thể tải dữ liệu bảng xếp hạng A');
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
            <div className="bxh-table-a">
                <div className="bxh-table-a__header">
                    <h2 className="bxh-table-a__title">Bảng A - Đai Trắng Vàng (Sinh năm 2011 trở về sau)</h2>
                </div>
                <div className="bxh-table-a__loading">
                    <div className="bxh-table-a__loading-spinner"></div>
                    <p className="bxh-table-a__loading-text">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bxh-table-a">
                <div className="bxh-table-a__header">
                    <h2 className="bxh-table-a__title">Bảng A - Đai Trắng Vàng (Sinh năm 2011 trở về sau)</h2>
                </div>
                <div className="bxh-table-a__error">
                    <div className="bxh-table-a__error-icon">⚠️</div>
                    <h3 className="bxh-table-a__error-title">Lỗi tải dữ liệu</h3>
                    <p className="bxh-table-a__error-text">{error}</p>
                    <button
                        className="bxh-table-a__error-retry"
                        onClick={() => window.location.reload()}
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bxh-table-a" ref={componentRef}>
            <div className="bxh-table-a__header">
                <div className="bxh-table-a__title-section">
                    <h2 className="bxh-table-a__title">Bảng A - Đai Trắng Vàng (Sinh năm 2011 trở về sau)</h2>
                    <button
                        className="bxh-table-a__reference-btn"
                        onClick={() => navigate('/skill-level-reference')}
                    >
                        <span className="bxh-table-a__reference-btn-icon">📋</span>
                        <span>Bảng quy đổi trình độ</span>
                        <span className="bxh-table-a__reference-btn-arrow">→</span>
                    </button>
                    <p className="bxh-table-a__subtitle">
                        Kết quả luyện tập và thi đấu của các vận động viên đai Trắng Vàng sinh từ 2011
                    </p>
                </div>

                <div className="bxh-table-a__stats-grid">
                    <div className="bxh-table-a__stat-card">
                        <span className="bxh-table-a__stat-value">{stats.total}</span>
                        <span className="bxh-table-a__stat-label">Lượt tham gia</span>
                    </div>
                    <div className="bxh-table-a__stat-card">
                        <span className="bxh-table-a__stat-value">{stats.maxAmount}</span>
                        <span className="bxh-table-a__stat-label">Số lần cao nhất</span>
                    </div>
                    <div className="bxh-table-a__stat-card">
                        <span className="bxh-table-a__stat-value">{stats.avgLevel}</span>
                        <span className="bxh-table-a__stat-label">Cấp độ trung bình</span>
                    </div>
                    <div className="bxh-table-a__stat-card">
                        <span className="bxh-table-a__stat-value">{stats.maxDuration} giây</span>
                        <span className="bxh-table-a__stat-label">Thời gian cao nhất</span>
                    </div>
                </div>
            </div>

            <div className="bxh-table-a__content">
                <BxhList
                    players={players
                        .filter(player => branch.length > 0 ? branch.includes(player.branch.toString()) : true)
                        .map((player, index) => ({ ...player, rank: index + 1 }))
                        .filter(player => filterName ? player.studentName.toLowerCase().includes(filterName.toLowerCase()) : true)
                    }
                    hasFilterName={!!filterName}
                />
            </div>

            <div className="bxh-table-a__footer">
                <p className="bxh-table-a__footer-text">
                    Cập nhật lần cuối: 19/12/2025
                </p>
            </div>
        </div>
    );
}
