import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const Progress = ({ location: { pathname } }) => {
    const isFirstStep = pathname === '/';
    const isSecondStep = pathname === '/second';
    const isFinalStep = pathname === '/final';

    return (
        <>
            <div className='steps'>
                <div className={`${isFirstStep ? 'step active' : 'step'}`}>
                    <div>1</div>
                    <div>
                        {isSecondStep || isFinalStep ? (
                            <Link to='/'>Step 1</Link>
                        ) : (
                            'Step 1'
                        )}
                    </div>
                </div>
                <div className={`${isSecondStep ? 'step active' : 'step'}`}>
                    <div>2</div>
                    <div>
                        {isFinalStep ? (
                            <Link to='/second'>Step 2</Link>
                        ) : (
                            'Step 2'
                        )}
                    </div>
                </div>
                <div className={`${isFinalStep ? 'step active' : 'step'}`}>
                    <div>3</div>
                    <div>Step 3</div>
                </div>
            </div>
        </>
    );
};

export default withRouter(Progress);
