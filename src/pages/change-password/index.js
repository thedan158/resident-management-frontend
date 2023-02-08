import React, { createRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAPIActionJSON } from '../../api/ApiActions';
import PasswordRule from '../../components/molecules/password-rule';
import { checkSpecial, checkUpperCaseString, checkLowerCaseString, checkNumericString } from '../../middleware/validation';

const EMPTY_SPACE = '\u00A0';
const ERR_CONFIRM_PASSWORD_NOT_MATCH = "The passwords don't match";
const ERR_MISSING_FIELD = "This field is required"
const ERR_PASSWORD_INVALID = "Password does not meet requirements"

const ChangePassword = () => {
    const [passwordErr, setPasswordErr] = useState(EMPTY_SPACE)
    const tfPasswordRef = createRef();
    const tfCurrentRef = createRef()
    const tfConfirmPasswordRef = createRef();
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(EMPTY_SPACE);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [apiErr, setApiErr] = useState(EMPTY_SPACE)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isReseted, setIsReseted] = useState(false)
    const [rules, setRules] = useState({
        lengthRule: false,
        lowercaseRule: false,
        uppercaseRule: false,
        numberRule: false,
        specialRule: false,
    })
    const username = useSelector(state => state.user.username)
    const dispatch = useDispatch()
    function togglePasswordVisible() {
        setIsPasswordVisible(!isPasswordVisible);
    }
    function toggleConfirmPasswordVisible() {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }
    const renderRules = (text) => {
        setPasswordErr(EMPTY_SPACE)
        if (text === "") {
            setPasswordErr(ERR_MISSING_FIELD)
        }
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
    const validatePassword = () => {
        const keys = Object.values(rules)
        const inValid = keys.findIndex((key) => key !== true)
        if (inValid !== -1) {
            setPasswordErr(ERR_PASSWORD_INVALID)
            return false;
        }
        return true
    }
    const navigate = useNavigate()
    const handleResponse = (response) => {
        if (!response.success) {
            setApiErr(response.message)
        } else {
            setApiErr(EMPTY_SPACE)
            setIsReseted(true)
        }
    }
    const handleSubmit = () => {
        const currentPassword = tfCurrentRef.current.value
        const newPassword = tfPasswordRef.current.value;
        const confirmPassword = tfConfirmPasswordRef.current.value;
        const isPasswordValid = validatePassword()
        const isPasswordMatch = validatePasswordMatch(newPassword, confirmPassword)
        if (isPasswordValid && isPasswordMatch) {
            dispatch(getAPIActionJSON('changePassword',
                {
                    username: username,
                    oldPassword: currentPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                }, null, null, (e) => handleResponse(e)))
        }
    }
    return (
        <div className="body account login" id="pwReset">

            <div className="home-row">

                <div className="acc-intro ac-support">
                    <div className="ai-img"><img src="images/chaiinfolio/account/account-support.png" /></div>
                    <div className="ai-txt">
                        <div className="ai-title">Support</div>
                        <div className="ai-desc">If you need any help or have any questions, drop us an email, we’d love to hear from you!</div>
                        <a onClick={() => navigate('dashboard')} id="accContact"><div className="ai-btn">GO BACK</div></a>
                    </div>
                </div>
                {!isReseted ? (<div className="acc-form form-col" id="newPW">
                    <div className="acc-row acc-title">
                        <p className="ps-title">Change Password</p>
                    </div>
                    <div className="acc-row">
                        <div className="form-row">
                            <div className="fr-input fi-col6" id="regPw">
                                <div className="fi-label">Current Password</div>
                                <div className="fi-pw">
                                    <input type={isPasswordVisible ? 'text' : 'password'}
                                        ref={tfCurrentRef}
                                        className="fi-input"
                                        placeholder="Password"
                                        onChange={(e) => renderRules(e.target.value)} />
                                    <span className={`fi-viewpw ${isPasswordVisible ? 'fi-see' : 'fi-blind'}`} onClick={togglePasswordVisible}></span>
                                    <PasswordRule rules={rules} />

                                </div>
                                {passwordErr !== EMPTY_SPACE && <div class="fi-rmk fi-err">{passwordErr}</div>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="fr-input fi-col6" id="regPw">
                                <div className="fi-label">New Password</div>
                                <div className="fi-pw">
                                    <input type={isPasswordVisible ? 'text' : 'password'}
                                        ref={tfPasswordRef}
                                        className="fi-input"
                                        placeholder="Password"
                                        onChange={(e) => renderRules(e.target.value)} />
                                    <span className={`fi-viewpw ${isPasswordVisible ? 'fi-see' : 'fi-blind'}`} onClick={togglePasswordVisible}></span>
                                    <PasswordRule rules={rules} />

                                </div>
                                {passwordErr !== EMPTY_SPACE && <div class="fi-rmk fi-err">{passwordErr}</div>}
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

                    {apiErr !== EMPTY_SPACE && <div className="acc-row fr-msg">
                        <div className="fr-err"><p>{apiErr}</p></div>
                    </div>}

                    <div className="acc-row">
                        <div className="form-row fr-nav">
                            <div className="fn-col">
                                <a onClick={handleSubmit} className="fr-btn fr-submit" id="btn-logMsg" href="#logMsg">RESET PASSWORD</a>
                            </div>
                        </div>
                    </div>
                </div>) : (<div className="acc-form form-col" id="logMsg">
                    <div className="acc-row acc-title">
                        <p className="ps-title">Your password is reset</p>
                        <div className="ps-desc">Please log in again using your new password.</div>
                    </div>

                    <div className="acc-row">
                        <div className="form-row fr-nav">
                            <div className="fn-col">
                                <a onClick={() => navigate('/')} className="fr-btn fr-submit" id="btn-accLog" href="#accLog">LOGIN</a>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default ChangePassword