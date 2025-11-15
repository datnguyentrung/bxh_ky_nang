import './BxhRank.scss';

interface BxhRankProps {
    rank: number;
    isTopThree?: boolean;
}

export default function BxhRank({ rank, isTopThree = false }: BxhRankProps) {
    const getRankIcon = (rank: number): string => {
        switch (rank) {
            case 1:
                return '🥇';
            case 2:
                return '🥈';
            case 3:
                return '🥉';
            default:
                return '';
        }
    };

    const getRankClass = (rank: number): string => {
        switch (rank) {
            case 1:
                return 'bxh-rank--gold';
            case 2:
                return 'bxh-rank--silver';
            case 3:
                return 'bxh-rank--bronze';
            default:
                return 'bxh-rank--default';
        }
    };

    return (
        <div className={`bxh-rank ${getRankClass(rank)} ${isTopThree ? 'bxh-rank--top-three' : ''}`}>
            {isTopThree && (
                <div className="bxh-rank__icon">
                    {getRankIcon(rank)}
                </div>
            )}
            <div className="bxh-rank__number">
                #{rank}
            </div>
        </div>
    );
}