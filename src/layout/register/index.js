import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterLayout({children}) {
    const navigate = useNavigate();

	function onClickLogin() {
		navigate('/login');
	}

    return (
        <div className="body account signup" id="accReg">
				
			<div className="home-row">
			
				<div className="acc-intro ac-login">
					<div className="ai-img"><img src="images/chaiinfolio/account/account-login.png" /></div>
					<div className="ai-txt">
						<div className="ai-title">Already<br />a member?</div>
						<a onClick={onClickLogin} id="btn-accLog"><div className="ai-btn">LOG IN</div></a>
					</div>
				</div>

                {children}

			</div>
		</div>
    );
}