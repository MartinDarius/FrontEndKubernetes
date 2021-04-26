import React from 'react';

import kubernetesLogo from '../../../assets/images/kubernetes.png';
import './Logo.css';

const logo = (props) => (
    <div className="Logo">
        <img src={kubernetesLogo} alt="Kubernetes" />
    </div>
);

export default logo;