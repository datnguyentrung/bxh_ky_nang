import type Bxh from '../../../types/bxh';

type SortOption = 'rank' | 'count' | 'time' | 'level' | 'name';
type SortDirection = 'asc' | 'desc';

export function sortPlayersByRank(
    players: Bxh[],
    sortBy: SortOption = 'rank',
    direction: SortDirection = 'asc'
): Bxh[] {
    return [...players].sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
            case 'rank':
                comparison = a.rank - b.rank;
                break;

            case 'count':
                comparison = a.count - b.count;
                // If count is the same, sort by rank
                if (comparison === 0) {
                    comparison = a.rank - b.rank;
                }
                break;

            case 'time':
                comparison = a.time - b.time;
                // If time is the same, sort by rank
                if (comparison === 0) {
                    comparison = a.rank - b.rank;
                }
                break;

            case 'level':
                comparison = a.level - b.level;
                // If level is the same, sort by rank
                if (comparison === 0) {
                    comparison = a.rank - b.rank;
                }
                break;

            case 'name':
                comparison = a.name.localeCompare(b.name, 'vi', {
                    sensitivity: 'base',
                    ignorePunctuation: true
                });
                // If name is the same, sort by rank
                if (comparison === 0) {
                    comparison = a.rank - b.rank;
                }
                break;

            default:
                comparison = a.rank - b.rank;
        }

        return direction === 'desc' ? -comparison : comparison;
    });
}

export function getPlayerRank(targetPlayer: Bxh): number {
    return targetPlayer.rank;
}

export function getTopPlayers(players: Bxh[], count: number = 3): Bxh[] {
    return sortPlayersByRank(players, 'rank', 'asc').slice(0, count);
}

export function getPlayerStats(players: Bxh[]) {
    if (players.length === 0) {
        return {
            total: 0,
            avgCount: 0,
            avgTime: 0,
            avgLevel: 0,
            maxCount: 0,
            maxTime: 0,
            maxLevel: 0
        };
    }

    const totalCount = players.reduce((sum, player) => sum + player.count, 0);
    const totalTime = players.reduce((sum, player) => sum + player.time, 0);
    const totalLevel = players.reduce((sum, player) => sum + player.level, 0);

    return {
        total: players.length,
        avgCount: Math.round(totalCount / players.length),
        avgTime: Math.round(totalTime / players.length),
        avgLevel: Math.round(totalLevel / players.length * 10) / 10,
        maxCount: Math.max(...players.map(p => p.count)),
        maxTime: Math.max(...players.map(p => p.time)),
        maxLevel: Math.max(...players.map(p => p.level))
    };
}