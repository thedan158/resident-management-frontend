import React, { useState, createRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAPIActionJSON } from '../../api/ApiActions';

const EMPTY_SPACE = '\u00A0';
const WRONG_INFO = 'Wrong username or password'
const ERR_EMAIL_INVALID = "Please enter correct email"

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch()


	const [apiErr, setApiErr] = useState(EMPTY_SPACE)
	const tfEmailRef = createRef();
	const tfPasswordRef = createRef();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	function togglePasswordVisible() {
		setIsPasswordVisible(!isPasswordVisible);
	}
	const validateEmail = (email) => {
		const regex = /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (!regex.test(email)) {
			setApiErr(ERR_EMAIL_INVALID)
			return false
		}
		setApiErr(EMPTY_SPACE)
		return true
	}
	const handleResponse = (response) => {
		if (!response.success) {
			setApiErr(response.message)
		} else
			navigate("/dashboard")
	}
	function onLogin() {
		setApiErr(EMPTY_SPACE)
		const email = tfEmailRef.current.value;
		const password = tfPasswordRef.current.value;
		const isEmailValid = validateEmail(email)
		if (isEmailValid) {
			dispatch(getAPIActionJSON('login', { username: email, password: password }, null, null, (e) => handleResponse(e)))
		}
	}

	return (
		<div className="body account login" id="accLog">

			<div className="home-row">

				<div className="acc-intro ac-signup">
					<div className="ai-img"><img src="images/chaiinfolio/account/account-reg.png" /></div>
					<div className="ai-txt">
						<div className="ai-title">New here?</div>
						<div className="ai-desc">Sign up & discover amazing services!</div>
						<a id="btn-accReg" onClick={() => { navigate('/register') }}><div className="ai-btn">SIGN UP</div></a>
					</div>
				</div>

				<div className="acc-form form-col" id="accL1">
					<div className="acc-row acc-title">
						<p className="ps-title">Wecome back!</p>
					</div>
					<div className="acc-row">
						<div className="form-row">
							<div className="fr-input fi-col6" id="regEmail">
								<div className="fi-label">Email</div>
								<input ref={tfEmailRef} className="fi-input" placeholder="Email" />
							</div>
						</div>
						<div className="form-row">
							<div className="fr-input fi-col6" id="regPw">
								<div className="fi-label">Password</div>
								<div className="fi-pw">
									<input type={isPasswordVisible ? 'text' : 'password'} ref={tfPasswordRef} className="fi-input" placeholder="Password" />
									<span className={`fi-viewpw ${isPasswordVisible ? 'fi-see' : 'fi-blind'}`} onClick={togglePasswordVisible}></span>
								</div>
							</div>
						</div>
					</div>
					{apiErr !== EMPTY_SPACE && <div className="acc-row fr-msg ">
						<div className="fr-err"><p>{apiErr}</p></div>
					</div>}
					<div className="acc-row">
						<div className="form-row fr-nav">
							<div className="fn-col">
								<a className="fr-btn fr-submit" id="btn-login" onClick={onLogin} >LOG IN</a>
							</div>
						</div>
					</div>

					<div className="acc-row">
						<a className="fr-link fr-submit" id="btn-forgetPW" onClick={() => navigate('/reset-pw')}><p>Forgot Email or Password?</p></a>
					</div>
				</div>

			</div>
		</div>
	);
}