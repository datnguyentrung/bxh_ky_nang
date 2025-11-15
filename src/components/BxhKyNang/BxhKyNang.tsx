import { useState, useEffect } from 'react';
import type Bxh from '../../types/bxh';
import BxhList from './components/BxhList/BxhList';
import { getPlayerStats } from './utils/sortUtils';
import bxhCs1Data from '../../json/BxhCs1';
import './BxhKyNang.scss';

interface BxhKyNangProps {
    data?: Bxh[];
    title?: string;
}

export default function BxhKyNang({
    data = bxhCs1Data,
    title = "Bảng Xếp Hạng Kỹ Năng Taekwondo"
}: BxhKyNangProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [players, setPlayers] = useState<Bxh[]>([]);

    useEffect(() => {
        // Simulate loading time for better UX
        const loadData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                setPlayers(data);
                setLoading(false);
            } catch {
                setError('Không thể tải dữ liệu bảng xếp hạng');
                setLoading(false);
            }
        };

        loadData();
    }, [data]);

    const stats = getPlayerStats(players);

    if (loading) {
        return (
            <div className="bxh-kynang">
                <div className="bxh-kynang__header">
                    <h2 className="bxh-kynang__title">{title}</h2>
                </div>
                <div className="bxh-kynang__loading">
                    <div className="bxh-kynang__loading-spinner"></div>
                    <p className="bxh-kynang__loading-text">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bxh-kynang">
                <div className="bxh-kynang__header">
                    <h2 className="bxh-kynang__title">{title}</h2>
                </div>
                <div className="bxh-kynang__error">
                    <div className="bxh-kynang__error-icon">⚠️</div>
                    <h3 className="bxh-kynang__error-title">Lỗi tải dữ liệu</h3>
                    <p className="bxh-kynang__error-text">{error}</p>
                    <button
                        className="bxh-kynang__error-retry"
                        onClick={() => window.location.reload()}
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bxh-kynang">
            <div className="bxh-kynang__header">
                <div className="bxh-kynang__title-section">
                    <h2 className="bxh-kynang__title">{title}</h2>
                    <p className="bxh-kynang__subtitle">
                        Kết quả luyện tập và thi đấu của các vận động viên
                    </p>
                </div>

                <div className="bxh-kynang__stats-grid">
                    <div className="bxh-kynang__stat-card">
                        <span className="bxh-kynang__stat-value">{stats.total}</span>
                        <span className="bxh-kynang__stat-label">Vận động viên</span>
                    </div>
                    <div className="bxh-kynang__stat-card">
                        <span className="bxh-kynang__stat-value">{stats.maxCount.toLocaleString()}</span>
                        <span className="bxh-kynang__stat-label">Số lần cao nhất</span>
                    </div>
                    <div className="bxh-kynang__stat-card">
                        <span className="bxh-kynang__stat-value">{stats.avgLevel}</span>
                        <span className="bxh-kynang__stat-label">Cấp độ trung bình</span>
                    </div>
                    <div className="bxh-kynang__stat-card">
                        <span className="bxh-kynang__stat-value">{stats.maxTime}m</span>
                        <span className="bxh-kynang__stat-label">Thời gian cao nhất</span>
                    </div>
                </div>
            </div>

            <div className="bxh-kynang__content">
                <BxhList players={players} />
            </div>

            <div className="bxh-kynang__footer">
                <p className="bxh-kynang__footer-text">
                    Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
                </p>
            </div>
        </div>
    );
}