import React, { useEffect, useState } from 'react';

const easeOutQuad = t => t * ( 2 - t );
const frameDuration = 1000 / 60;

const CountUpAnimation = ( { children, duration, counter } ) => {
	const countTo = parseFloat( children, 10 );
	const [ count, setCount ] = useState( 0 );

	useEffect( () => {
		let frame = 0;
		const totalFrames = Math.round( duration / frameDuration );
		const counter = setInterval( () => {
			frame++;
			const progress = easeOutQuad( frame / totalFrames );
			setCount( countTo * progress );

			if ( frame === totalFrames ) {
				clearInterval( counter );
			}
		}, frameDuration );
	}, [counter] );

	return count.toFixed(1);
};

export default CountUpAnimation;

// // Use the component to count to 500.00
// <CountUpAnimation>500</CountUpAnimation>

// // …optionally using the duration prop
// <CountUpAnimation duration={1000}>500</CountUpAnimation>