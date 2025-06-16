import ReactDOM from 'react-dom';
import { render, screen, cleanup } from '@testing-library/react';
import Fileupload from '../vendor/Fileupload';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
    cleanup();
});

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn().mockReturnValue({
        pathname: '/file-upload',
        search: '',
        hash: '',
        state: null,
        key: '5nvxpbdafa',
    }),
}));

describe('App component', () => {
    it('Fileupload renders properly', () => {
        render(<Fileupload/>);
        expect(screen.getAllByText('Projects List')).toHaveLength(1);
    })
})