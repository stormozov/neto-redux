import { Provider } from "react-redux";
import { ReduxCrudDemoPage } from "./pages";
import { store } from "./store";

/**
 * Основной компонент приложения, точка входа
 */
function App() {
	return (
		<Provider store={store}>
			<div className="app">
				<ReduxCrudDemoPage />
			</div>
		</Provider>
	);
}

export default App;
