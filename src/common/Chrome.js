import { useEffect } from 'react';
import Cosmos from './Cosmos';
import { initSmoothScroll } from './smoothScroll';
import './chrome.css';

export default function Chrome({ emergingStars = false }) {
    useEffect(() => initSmoothScroll(), []);
    return <Cosmos emerging={emergingStars} />;
}
