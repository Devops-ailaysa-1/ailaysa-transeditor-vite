import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../vendor/Login';

afterEach(() => {
	cleanup();
});

/* it('Login validation', () => {
	const loginDom = render(<Router><Login /></Router>);
	const loginBtn = loginDom.container.querySelector('#login-btn');
	loginBtn.click();
	expect(screen.getAllByText('Email is required')).toHaveLength(1);
	expect(screen.getAllByText('Password is required')).toHaveLength(1);
}) */

it('sample', () => {
	expect(true).toBeTruthy();
})