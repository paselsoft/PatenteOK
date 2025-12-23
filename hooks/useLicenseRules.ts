
import { useState, useEffect } from 'react';
import { LicenseRule, fetchLicenseRules } from '../services/licenseRules';

export const useLicenseRules = () => {
    const [rules, setRules] = useState<LicenseRule[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadRules = async () => {
            setIsLoading(true);
            const fetchedRules = await fetchLicenseRules();
            setRules(fetchedRules);
            setIsLoading(false);
        };

        loadRules();
    }, []);

    const getRuleForCategory = (category: string): LicenseRule | undefined => {
        return rules.find(r => r.category === category);
    };

    return {
        rules,
        isLoading,
        getRuleForCategory
    };
};
