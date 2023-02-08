import React from 'react'

const PasswordRule = (props) => {
    const {
        lengthRule,
        lowercaseRule,
        uppercaseRule,
        numberRule,
        specialRule
    } = props.rules
    return (
        <div className="fi-rmk fp-rules">
            <div className={lengthRule ? "fp-rule fp-ok" : "fp-rule fp-miss"}>8 characters minimum</div>
            <div className={lowercaseRule ? "fp-rule fp-ok" : "fp-rule fp-miss"}>One lowercase character</div>
            <div className={uppercaseRule ? "fp-rule fp-ok" : "fp-rule fp-miss"}>One uppercase/capital character</div>
            <div className={numberRule ? "fp-rule fp-ok" : "fp-rule fp-miss"}>One number</div>
            <div className={specialRule ? "fp-rule fp-ok" : "fp-rule fp-miss"}>One special character</div>
        </div>
    )
}

export default PasswordRule