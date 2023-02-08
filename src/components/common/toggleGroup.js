import React from "react";

export default function ToggleGroup({
                                        onChange = () => {
                                        }, values = [], selectedValue
                                    }) {
    function onClick(value) {
        onChange(value);
    }

    return (
        <div className="form-row fr-option">
            {
                values.map(item => {
                    const {
                        label, value, enabled = true
                    } = item;
                    return (
                        value === "nonUS" ? <a href="#puNonUS">
                                <div className="fr-btn"
                                     id="pfileIndv"
                                     onClick={() => {
                                         onClick(value)
                                     }}>{label}</div>
                            </a>
                            : enabled ?
                                <div className={`fr-btn ${selectedValue !== "" && selectedValue === value ? 'active' : ''}`}
                                     id="pfileIndv"
                                     onClick={() => {
                                         onClick(value)
                                     }}>{label}</div>
                                : <div className="fr-btn fo-bub inactive" id="nonAccdInvest">Non-Accredited Investor</div>
                    )
                })
            }
        </div>
    );
}