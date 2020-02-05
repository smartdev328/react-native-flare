import * as React from 'react';

import SuccessAnimation from '../SuccessAnimation';
import handshake from '../../assets/lotties/handshake';

const Success = ({ style, nextPage }) => (
    <SuccessAnimation
        style={style}
        animation={handshake}
        onComplete={nextPage}
    />
);

export default Success;
