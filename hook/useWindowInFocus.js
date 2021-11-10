import React from 'react';

const useWindowInFocus = () => {
	const [focused, setFocused] = React.useState(true);
	React.useEffect(() => {
		const onFocus = () => setFocused(true);
		const onBlur = () => setFocused(false);

		window.addEventListener('focus', onFocus);
		window.addEventListener('blur', onBlur);

		return () => {
			window.removeEventListener('focus', onFocus);
			window.removeEventListener('blur', onBlur);
		};
	}, []);

	return focused;
};

export default useWindowInFocus;
