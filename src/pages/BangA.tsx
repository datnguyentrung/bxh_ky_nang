import React from 'react';
import Filter from '../components/Filter/Filter';
import BxhTableA from '../components/BxhTableA/BxhTableA';

export default function BangA() {
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
            <BxhTableA filterName={filterName} branch={branch} />
        </>
    );
}
