import type { Bxh } from '../../../types/bxh';
import './BxhList.scss';

type Props = {
    players: Bxh[];
    hasFilterName?: boolean;
};

export default function BxhList({ players, hasFilterName }: Props) {
    console.log('BxhList players:', players);

    function renderPlayerRow(player: Bxh, index: number) {
        return (
            <div key={index} className="bxh-player-row">
                <div className="bxh-player-rank">{hasFilterName && player.rank ? player.rank : index + 1}</div>
                <div className='bxh-player-branch'>{player.branch}</div>
                <div className="bxh-player-name">{player.studentName}</div>
                <div className="bxh-player-count">{player.amount} lượt rút gối</div>
                <div className="bxh-player-time">{player.duration} giây</div>
                <div className={`bxh-player-level${player.accept ? '--accepted' : '--not-accepted'}`}>
                    {player.accept ? `Level ${player.level}` : 'Chưa đạt điều kiện'}
                </div>
            </div>
        );
    }

    return (
        <div className="bxh-list">
            {players
                .sort((a, b) => {
                    // 1. Accept: true trước, false sau
                    if (a.accept !== b.accept) {
                        return a.accept ? -1 : 1;
                    }

                    // 2. Level: lớn đến bé
                    if (a.level !== b.level) {
                        return b.level - a.level;
                    }

                    // 3. Duration: lớn đến bé
                    if (a.duration !== b.duration) {
                        return b.duration - a.duration;
                    }

                    // 4. Amount: lớn đến bé
                    if (a.amount !== b.amount) {
                        return b.amount - a.amount;
                    }

                    // 5. Date: bé đến lớn (ngày cũ trước)
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                })
                .map(renderPlayerRow)}
        </div>
    );
}