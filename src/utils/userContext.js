// utils/userContext.js

import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	return (
		<UserContext.Provider value={{ user, updateUser: setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
