import ReactDOM from 'react-dom';
import { render, screen, cleanup } from '@testing-library/react';
import App from '../App';
import Login from '../vendor/Login';
import { BrowserRouter as Router} from 'react-router-dom';

afterEach(() => {
	cleanup();
});

it('App renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App/>, div);
});

it('Login renders properly', () => {
	render(<Router><Login /></Router>);
	expect(screen.getAllByText('Login')).toHaveLength(2);
})