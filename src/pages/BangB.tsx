import React from 'react';
import Filter from '../components/Filter/Filter';
import BxhTableB from '../components/BxhTableB/BxhTableB';

export default function BangB() {
    const [filterName, setFilterName] = React.useState<string>('');
    const [branch, setBranch] = React.useState<string[]>([]);

    return (
        <>
            <Filter
                filterName={filterName}
                setFilterName={setFilterName}
                branch={branch}
                setBranch={setBranch}
            />
            <BxhTableB filterName={filterName} branch={branch} />
        </>
    );
}
