import { useState, useMemo } from 'react';
import type Bxh from '../../../../types/bxh';
import BxhCard from '../BxhCard/BxhCard';
import { sortPlayersByRank } from '../../utils/sortUtils';
import './BxhList.scss';

type SortOption = 'rank' | 'count' | 'time' | 'level' | 'name';
type SortDirection = 'asc' | 'desc';

interface BxhListProps {
    players: Bxh[];
    showTopOnly?: number;
}

export default function BxhList({ players, showTopOnly }: BxhListProps) {
    const [sortBy, setSortBy] = useState<SortOption>('rank');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAndSortedPlayers = useMemo(() => {
        let filtered = players;

        // Filter by search term
        if (searchTerm.trim()) {
            filtered = players.filter(player =>
                player.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort players - default by rank
        const sorted = sortPlayersByRank(filtered, sortBy, sortDirection);

        // Limit results if showTopOnly is specified
        return showTopOnly ? sorted.slice(0, showTopOnly) : sorted;
    }, [players, sortBy, sortDirection, searchTerm, showTopOnly]);

    const handleSort = (option: SortOption) => {
        if (sortBy === option) {
            setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
        } else {
            setSortBy(option);
            setSortDirection(option === 'name' || option === 'rank' ? 'asc' : 'desc');
        }
    };

    const getSortIcon = (option: SortOption) => {
        if (sortBy !== option) return '↕️';
        return sortDirection === 'desc' ? '⬇️' : '⬆️';
    };

    const getSortButtonClass = (option: SortOption) => {
        return `bxh-list__sort-btn ${sortBy === option ? 'bxh-list__sort-btn--active' : ''
            }`;
    };

    return (
        <div className="bxh-list">
            <div className="bxh-list__hero">
                <div className="bxh-list__hero-bg">
                    <img src="/taekwondo.jpg" alt="Taekwondo" className="bxh-list__hero-image" />
                    <div className="bxh-list__hero-overlay"></div>
                </div>
                <div className="bxh-list__hero-content">
                    <h3 className="bxh-list__hero-title">Danh Sách Xếp Hạng</h3>
                    <p className="bxh-list__hero-subtitle">Các vận động viên xuất sắc nhất</p>
                </div>
            </div>

            <div className="bxh-list__controls">
                <div className="bxh-list__search">
                    <input
                        type="text"
                        placeholder="Tìm kiếm vận động viên..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bxh-list__search-input"
                    />
                    <span className="bxh-list__search-icon">🔍</span>
                </div>

                <div className="bxh-list__sort">
                    <span className="bxh-list__sort-label">Sắp xếp theo:</span>
                    <div className="bxh-list__sort-buttons">
                        <button
                            onClick={() => handleSort('rank')}
                            className={getSortButtonClass('rank')}
                            title="Sắp xếp theo thứ hạng"
                        >
                            Thứ hạng {getSortIcon('rank')}
                        </button>
                        <button
                            onClick={() => handleSort('count')}
                            className={getSortButtonClass('count')}
                            title="Sắp xếp theo số lần"
                        >
                            Số lần {getSortIcon('count')}
                        </button>
                        <button
                            onClick={() => handleSort('time')}
                            className={getSortButtonClass('time')}
                            title="Sắp xếp theo thời gian"
                        >
                            Thời gian {getSortIcon('time')}
                        </button>
                        <button
                            onClick={() => handleSort('level')}
                            className={getSortButtonClass('level')}
                            title="Sắp xếp theo cấp độ"
                        >
                            Cấp độ {getSortIcon('level')}
                        </button>
                        <button
                            onClick={() => handleSort('name')}
                            className={getSortButtonClass('name')}
                            title="Sắp xếp theo tên"
                        >
                            Tên {getSortIcon('name')}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bxh-list__stats">
                <span className="bxh-list__count">
                    Hiển thị {filteredAndSortedPlayers.length} / {players.length} vận động viên
                </span>
            </div>

            <div className="bxh-list__items">
                {filteredAndSortedPlayers.length > 0 ? (
                    filteredAndSortedPlayers.map((player) => (
                        <BxhCard
                            key={`${player.name}-${player.rank}-${player.time}`}
                            player={player}
                            isTopThree={player.rank <= 3}
                        />
                    ))
                ) : (
                    <div className="bxh-list__empty">
                        <div className="bxh-list__empty-icon">🤷‍♂️</div>
                        <h3 className="bxh-list__empty-title">Không tìm thấy kết quả</h3>
                        <p className="bxh-list__empty-text">
                            Không có vận động viên nào phù hợp với từ khóa "{searchTerm}"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}