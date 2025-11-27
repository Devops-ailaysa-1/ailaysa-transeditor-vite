import './PIBStyle.css';
import { useNavigate } from 'react-router-dom';

const EmptyStory = () => {
    const location = useNavigate();

    /**
     * This method used to navigate to add stories when click the add story button. 
     * 
     * @author Padmabharathi Subiramanian 
     * @since 25 Nov 2025
     */
    const addStory = () => {
        location('/add-stories' + '?page=1');
    }

    return (
        <div className='flex flex-col items-center gap-[32px]'>
            <div className='flex flex-col gap-[16px]'>
                <div className='flex flex-col items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="67" height="47" viewBox="0 0 67 47" fill="none">
                        <g clip-path="url(#clip0_4_737)">
                            <path d="M49.994 3.893C49.9365 2.84134 49.4781 1.8517 48.7133 1.12759C47.9485 0.403485 46.9352 -3.87171e-05 45.882 2.78624e-09H3.582C3.0496 0.0239152 2.53131 0.178793 2.07308 0.450909C1.61484 0.723024 1.2308 1.10398 0.955001 1.56C0.250533 2.6535 -0.0819646 3.94527 0.00700279 5.243L2.29 46.885H52.346L49.994 3.893Z" fill="url(#paint0_linear_4_737)"/>
                            <path d="M57.024 46.885H2.30298L10.42 17.785H41.783C41.783 17.785 42.211 16.251 42.721 14.423C43.1436 12.7077 44.1265 11.1825 45.5141 10.0891C46.9016 8.99574 48.6144 8.39672 50.381 8.38699H64.371C64.7677 8.39841 65.1561 8.50414 65.5038 8.69542C65.8516 8.8867 66.1489 9.15804 66.371 9.48699C66.6107 9.81857 66.7741 10.199 66.8497 10.6011C66.9252 11.0032 66.911 11.417 66.808 11.813C64.178 21.238 57.024 46.885 57.024 46.885Z" fill="url(#paint1_linear_4_737)"/>
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_4_737" x1="24.18" y1="-0.46885" x2="26.2393" y2="33.6002" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#45C5FF"/>
                                <stop offset="1" stop-color="#007ADF"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_4_737" x1="34.6002" y1="10.7739" x2="34.6002" y2="51.0813" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#85E9FF"/>
                                <stop offset="1" stop-color="#12B4FD"/>
                            </linearGradient>
                            <clipPath id="clip0_4_737">
                                <rect width="66.902" height="46.885" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div>
                    <span className="no-story-found-text">No stories available</span>
                </div>
            </div>
            <div>
                <button className="add-new-story-btn add-new-story-btn-text" onClick={addStory}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15.8334 10.8334H10.8334V15.8334H9.16669V10.8334H4.16669V9.16669H9.16669V4.16669H10.8334V9.16669H15.8334V10.8334Z" fill="white"/>
                    </svg>
                    {'Add new story'}
                </button>
            </div>
        </div>
    );
}
export default EmptyStory;
