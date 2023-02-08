
import React, { useState, createRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAPIActionJSON } from '../../../api/ApiActions';
import { checkLowerCaseString, checkNumericString, checkSpecial, checkUpperCaseString } from '../../../middleware/validation';
import PasswordRule from '../../molecules/password-rule';

const EMPTY_SPACE = '\u00A0';
const ERR_CONFIRM_PASSWORD_NOT_MATCH = "The passwords don't match";
const ERR_MISSING_FIELD = "This field is required"
const ERR_EMAIL_INVALID = "Please enter correct email"
const ERR_EMAIL_EXISTED = "Email already registered"
const ERR_PASSWORD_INVALID = "Password does not meet requirements"


export default function Register() {
	const tfEmailRef = createRef();
	const tfPasswordRef = createRef();
	const tfConfirmPasswordRef = createRef();
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
	const [confirmPasswordErr, setConfirmPasswordErr] = useState(EMPTY_SPACE);
	const [apiErr, setApiErr] = useState(EMPTY_SPACE);
	const [rules, setRules] = useState({
		lengthRule: false,
		lowercaseRule: false,
		uppercaseRule: false,
		numberRule: false,
		specialRule: false,
	})

	function togglePasswordVisible() {
		setIsPasswordVisible(!isPasswordVisible);
	}
	function toggleConfirmPasswordVisible() {
		setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
	}
	const renderRules = (text) => {
		let newRules = {
			lengthRule: false,
			lowercaseRule: false,
			uppercaseRule: false,
			numberRule: false,
			specialRule: false,
		}
		if (text.length >= 8) {
			newRules.lengthRule = true
		}
		newRules.specialRule = checkSpecial(text)
		newRules.uppercaseRule = checkUpperCaseString(text)
		newRules.lowercaseRule = checkLowerCaseString(text)
		newRules.numberRule = checkNumericString(text)
		setRules(newRules)

	}
	function validatePasswordMatch(password, confirmPassword) {
		if (confirmPassword === "") {
			setConfirmPasswordErr(ERR_MISSING_FIELD)
			return false
		}
		if (password !== confirmPassword) {
			setConfirmPasswordErr(ERR_CONFIRM_PASSWORD_NOT_MATCH);
			return false
		}
		setConfirmPasswordErr(EMPTY_SPACE)
		return true;
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
	const validatePassword = () => {
		const keys = Object.values(rules)
		const inValid = keys.findIndex((key) => key !== true)
		if (inValid !== -1) {
			setApiErr(ERR_PASSWORD_INVALID)
			return false;
		}
		return true
	}
	const handleResponse = (response) => {
		if (!response.success) {
			setApiErr(response.message)
		} else
			navigate("/dashboard")
	}
	function onRegister() {
		setApiErr(EMPTY_SPACE)
		const email = tfEmailRef.current.value;
		const password = tfPasswordRef.current.value;
		const isPasswordMatch = validatePasswordMatch(password, tfConfirmPasswordRef.current.value);
		const isEmailValid = validateEmail(email)
		const isPasswordValid = validatePassword();

		if (isPasswordMatch && isEmailValid && isPasswordValid) {
			dispatch(getAPIActionJSON('register', { username: email, password: password }, null, null, (e) => handleResponse(e)))
		}
	}

	return (
		<div className="acc-form form-col" id="accR1">
			<div className="acc-row acc-title">
				<p className="ps-title">Create Account</p>
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
							<input type={isPasswordVisible ? 'text' : 'password'}
								ref={tfPasswordRef}
								className="fi-input"
								placeholder="Password"
								onChange={(e) => renderRules(e.target.value)} />
							<span className={`fi-viewpw ${isPasswordVisible ? 'fi-see' : 'fi-blind'}`} onClick={togglePasswordVisible}></span>
							<PasswordRule rules={rules} />

						</div>
					</div>
				</div>
				<div className="form-row">
					<div className="fr-input fi-col6" id="regPwConf">
						<div className="fi-label">Confirm Password</div>
						<div className="fi-pw">
							<input type={isConfirmPasswordVisible ? 'text' : 'password'} ref={tfConfirmPasswordRef} className="fi-input" placeholder="Re-enter password" />
							<span className={`fi-viewpw ${isConfirmPasswordVisible ? 'fi-see' : 'fi-blind'}`} onClick={toggleConfirmPasswordVisible}></span>
						</div>
						{confirmPasswordErr !== EMPTY_SPACE && <div class="fi-rmk fi-err">{confirmPasswordErr}</div>}
					</div>
				</div>
			</div>

			{apiErr !== EMPTY_SPACE && <div className="acc-row fr-msg ">
				<div className="fr-err"><p>{apiErr}</p></div>
			</div>}

			<div className="acc-row">
				<div className="form-row fr-nav">
					<div className="fn-col">
						<a className="fr-btn fr-submit" id="btn-accR2" onClick={onRegister}>NEXT</a>
					</div>
				</div>
			</div>
		</div>
	);
}